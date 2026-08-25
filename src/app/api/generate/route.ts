import { NextRequest, NextResponse } from 'next/server';
import { LearnerProfile, InstructionalBrief, ContentConstraints, CoursePackage } from '@/types';

const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL;
const ANTHROPIC_AUTH_TOKEN = process.env.ANTHROPIC_AUTH_TOKEN;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

function extractJSON(text: string): string | null {
  const firstBrace = text.indexOf('{');
  if (firstBrace === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = firstBrace; i < text.length; i++) {
    const char = text[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\' && inString) {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        return text.substring(firstBrace, i + 1);
      }
    }
  }

  return null;
}

function buildSystemPrompt(): string {
  return `You are a Chinese reading curriculum generator for overseas Chinese-heritage learners.

Generate age-appropriate Chinese reading course packages following the provided learner profile and instructional brief. Respect oral vs literacy proficiency distinctions. This is portfolio/prototype content — do NOT claim proprietary LingoAce curriculum. Human experts retain final pedagogical approval.

Output ONLY a single JSON object matching this structure (no prose, no markdown, no code fences):

{
  "readingPassage": "150-200 Chinese characters",
  "vocabulary": [{"word": "词", "pinyin": "cí", "definition": "word"}, ...6 items total],
  "comprehensionQuestions": [{"id": 1, "question": "问题?", "options": ["A", "B", "C", "D"], "answer": "A"}, ...4 questions total],
  "practiceActivity": "concise activity instructions",
  "teacherNotes": "concise teaching points"
}`;
}

function buildUserPrompt(
  profile: LearnerProfile,
  brief: InstructionalBrief
): string {
  return `Learner: ${profile.age}yo, ${profile.track}, reading level ${profile.readingLevel}
Learning objective: ${brief.learningObjective}
Target vocabulary: ${brief.targetVocabulary}
Theme: ${brief.theme}

Generate JSON only (no prose, no fences). Reading passage: 150-200 Chinese characters. Vocabulary: exactly 6 items. Questions: exactly 4.`;
}

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_BASE_URL || !ANTHROPIC_AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'API configuration incomplete' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { profile, brief, constraints } = body as {
      profile: LearnerProfile;
      brief: InstructionalBrief;
      constraints: ContentConstraints;
    };

    // Validate required fields
    if (!profile?.readingLevel || !brief?.learningObjective || !constraints?.requiredSections) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(profile, brief);

    // Build endpoint URL safely - ensure no duplicate /v1/messages
    const baseUrl = ANTHROPIC_BASE_URL.replace(/\/+$/, '');
    const endpoint = baseUrl.endsWith('/v1/messages')
      ? baseUrl
      : `${baseUrl}/v1/messages`;

    // Server-side 13-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 13000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANTHROPIC_AUTH_TOKEN}`,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        output_config: {
          effort: 'medium',
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'Generation failed. Please try again.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract text content from response
    if (!data.content || !data.content[0] || data.content[0].type !== 'text') {
      return NextResponse.json(
        { error: 'Invalid response format from API' },
        { status: 500 }
      );
    }

    let textContent = data.content[0].text;

    // Safe JSON parsing with fallback for code fences or prose wrapping
    let coursePackage: CoursePackage;
    try {
      // Try direct parse first
      coursePackage = JSON.parse(textContent);
    } catch {
      // Strip markdown code fences if present
      const fenceMatch = textContent.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
      if (fenceMatch) {
        textContent = fenceMatch[1];
      }

      // Extract first complete top-level JSON object using balanced-brace scan
      const extractedJSON = extractJSON(textContent);
      if (!extractedJSON) {
        return NextResponse.json(
          { error: 'No valid JSON object found in response' },
          { status: 500 }
        );
      }

      try {
        coursePackage = JSON.parse(extractedJSON);
      } catch {
        return NextResponse.json(
          { error: 'Failed to parse JSON from response' },
          { status: 500 }
        );
      }
    }

    // Validate required CoursePackage structure
    if (!coursePackage.readingPassage ||
        !Array.isArray(coursePackage.vocabulary) ||
        !Array.isArray(coursePackage.comprehensionQuestions) ||
        !coursePackage.practiceActivity ||
        !coursePackage.teacherNotes) {
      return NextResponse.json(
        { error: 'Generated content is incomplete' },
        { status: 500 }
      );
    }

    return NextResponse.json({ coursePackage });

  } catch (error) {
    console.error('Generation error:', error);

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Generation timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred during generation' },
      { status: 500 }
    );
  }
}
