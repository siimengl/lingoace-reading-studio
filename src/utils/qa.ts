import { InstructionalBrief, CoursePackage, QAResult, AIReviewResult, LearnerProfile } from '@/types';

export function computeQA(
  brief: InstructionalBrief,
  coursePackage: CoursePackage
): QAResult {
  const passageText = coursePackage.readingPassage;

  // Passage Target Vocabulary Coverage - evaluates Reading Passage only
  const targetVocabList = brief.targetVocabulary.split(',').map(v => v.trim());
  let vocabMatches = 0;
  targetVocabList.forEach(vocab => {
    if (passageText.includes(vocab)) {
      vocabMatches++;
    }
  });
  const passageTargetVocabularyCoverage = targetVocabList.length > 0
    ? Math.round((vocabMatches / targetVocabList.length) * 100)
    : 0;

  // Passage Target Character Coverage - evaluates Reading Passage only
  const targetChars = brief.targetCharacters.split(' ').filter(c => c.trim());
  let charMatches = 0;
  targetChars.forEach(char => {
    if (passageText.includes(char)) {
      charMatches++;
    }
  });
  const passageTargetCharacterCoverage = targetChars.length > 0
    ? Math.round((charMatches / targetChars.length) * 100)
    : 0;

  // Length Constraint - evaluates Reading Passage only
  const passageLength = passageText.replace(/\s+/g, '').length;
  const lengthMatch = brief.desiredLength.match(/(\d+)-(\d+)/);
  let lengthConstraintMet = false;
  if (lengthMatch) {
    const min = parseInt(lengthMatch[1]);
    const max = parseInt(lengthMatch[2]);
    lengthConstraintMet = passageLength >= min && passageLength <= max;
  }

  // Advanced/unsupported-term detection - scans learner-facing content only
  // Reading Passage + Comprehension Questions + Practice Activity (excludes Teacher Notes)
  const advancedTerms: string[] = [];
  const knownAdvancedTerms = ['迫不及待', '望远镜', '北斗七星'];
  const learnerFacingContent =
    passageText +
    coursePackage.comprehensionQuestions.map(q => q.question + (q.options?.join('') || '') + q.answer).join('') +
    coursePackage.practiceActivity;

  knownAdvancedTerms.forEach(term => {
    if (learnerFacingContent.includes(term)) {
      advancedTerms.push(term);
    }
  });

  // Required Sections - all required Course Package sections must contain content
  const requiredSectionsComplete =
    coursePackage.readingPassage.trim().length > 0 &&
    coursePackage.vocabulary.length > 0 &&
    coursePackage.comprehensionQuestions.length > 0 &&
    coursePackage.practiceActivity.trim().length > 0 &&
    coursePackage.teacherNotes.trim().length > 0;

  // Schema Validity - structural validity only
  const questionsValid = coursePackage.comprehensionQuestions.every(q =>
    q.question && q.answer && q.id > 0
  );
  const vocabularyValid = coursePackage.vocabulary.every(v =>
    v.word.trim().length > 0 && v.pinyin.trim().length > 0 && v.definition.trim().length > 0
  );
  const schemaValid = questionsValid && vocabularyValid;

  return {
    passageTargetVocabularyCoverage,
    passageTargetCharacterCoverage,
    lengthConstraintMet,
    advancedTerms,
    requiredSectionsComplete,
    schemaValid,
  };
}

export function computeAIReview(
  profile: LearnerProfile,
  coursePackage: CoursePackage,
  qaResult: QAResult
): AIReviewResult {
  // Gate AI pre-review if structural validation fails
  if (!qaResult.schemaValid || !qaResult.requiredSectionsComplete) {
    return {
      readingLevelFit: 'Not evaluated',
      instructionalAlignment: 'Not evaluated',
      questionQuality: 'Not evaluated',
      ageAppropriateness: 'Not evaluated',
      culturalNaturalness: 'Not evaluated',
      issues: ['Pre-review unavailable — complete required content and resolve structural errors first.'],
    };
  }

  const issues: string[] = [];

  // Check for "迫不及待" specifically
  if (coursePackage.readingPassage.includes('迫不及待')) {
    issues.push('"迫不及待" may exceed the selected reading profile.');
  }

  return {
    readingLevelFit: profile.readingLevel === 'Emerging' && issues.length > 0
      ? 'Requires adjustment'
      : 'Appropriate',
    instructionalAlignment: 'Aligned',
    questionQuality: 'Good',
    ageAppropriateness: 'Appropriate',
    culturalNaturalness: 'Natural',
    issues,
  };
}
