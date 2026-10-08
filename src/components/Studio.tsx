'use client';

import { useState } from 'react';
import {
  LearnerProfile,
  InstructionalBrief,
  ContentConstraints,
  CoursePackage,
  ReviewDecision,
} from '@/types';
import {
  defaultLearnerProfile,
  defaultInstructionalBrief,
  defaultContentConstraints,
  seededCoursePackage,
  seededVersions,
} from '@/data/seededData';
import { computeQA, computeAIReview } from '@/utils/qa';
import LearnerProfileForm from '@/components/LearnerProfileForm';
import InstructionalBriefForm from '@/components/InstructionalBriefForm';
import ContentConstraintsForm from '@/components/ContentConstraintsForm';
import CoursePackageView from '@/components/CoursePackageView';
import QAResultsView from '@/components/QAResultsView';
import VersionHistoryView from '@/components/VersionHistoryView';
import ModelBenchmark from '@/components/ModelBenchmark';

type View = 'brief' | 'draft' | 'pilot';
type DraftTab = 'passage' | 'vocabulary' | 'questions' | 'practice' | 'notes';

export default function Studio() {
  const [currentView, setCurrentView] = useState<View>('brief');
  const [draftTab, setDraftTab] = useState<DraftTab>('passage');
  const [showBenchmark, setShowBenchmark] = useState(false);

  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(defaultLearnerProfile);
  const [instructionalBrief, setInstructionalBrief] = useState<InstructionalBrief>(defaultInstructionalBrief);
  const [contentConstraints, setContentConstraints] = useState<ContentConstraints>(defaultContentConstraints);
  const [coursePackage, setCoursePackage] = useState<CoursePackage>(seededCoursePackage);
  const [versions, setVersions] = useState(seededVersions);
  const [reviewDecision, setReviewDecision] = useState<ReviewDecision | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSource, setGenerationSource] = useState<'seeded' | 'live' | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const canGenerate = learnerProfile.readingLevel !== '';
  const qaResult = computeQA(instructionalBrief, coursePackage);
  const aiReview = computeAIReview(learnerProfile, coursePackage, qaResult);

  const handleExploreIllustrative = () => {
    // Load fresh clone of seeded data
    setCoursePackage({
      readingPassage: seededCoursePackage.readingPassage,
      vocabulary: seededCoursePackage.vocabulary.map(v => ({ ...v })),
      comprehensionQuestions: seededCoursePackage.comprehensionQuestions.map(q => ({ ...q })),
      practiceActivity: seededCoursePackage.practiceActivity,
      teacherNotes: seededCoursePackage.teacherNotes,
    });
    setGenerationSource('seeded');

    // Restore defaults
    setLearnerProfile({ ...defaultLearnerProfile });
    setInstructionalBrief({ ...defaultInstructionalBrief });
    setContentConstraints({ ...defaultContentConstraints });

    // Reset draft tab to Reading Passage
    setDraftTab('passage');
    // Clear reviewer state
    setReviewDecision(null);
    setReviewerNotes('');
    // Clear any errors
    setGenerationError(null);
    // Navigate to Draft view
    setCurrentView('draft');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setElapsedSeconds(0);

    // Start elapsed timer
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // 15-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: learnerProfile,
          brief: instructionalBrief,
          constraints: contentConstraints,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await response.json();

      // Replace course package with live generation
      setCoursePackage(data.coursePackage);
      setGenerationSource('live');

      // Reset draft tab to Reading Passage
      setDraftTab('passage');
      // Reset reviewer state
      setReviewDecision(null);
      setReviewerNotes('');
      // Navigate to Draft view
      setCurrentView('draft');
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        setGenerationError('Generation timed out after 15 seconds.');
      } else {
        console.error('Generation error:', error);
        setGenerationError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    } finally {
      clearInterval(timerInterval);
      setIsGenerating(false);
      setElapsedSeconds(0);
    }
  };

  const handleCreateRevision = () => {
    // Snapshot CURRENT edited Course Package + reviewer decision + notes into new reviewed-version state
    const newVersion = {
      versionNumber: versions.length + 1,
      label: `V${versions.length + 1} — Expert Reviewed`,
      hardRuleFlags: qaResult.advancedTerms.length,
      decision: reviewDecision,
      reviewerNotes: reviewerNotes,
      coursePackage: {
        readingPassage: coursePackage.readingPassage,
        vocabulary: coursePackage.vocabulary.map(v => ({ ...v })),
        comprehensionQuestions: coursePackage.comprehensionQuestions.map(q => ({ ...q })),
        practiceActivity: coursePackage.practiceActivity,
        teacherNotes: coursePackage.teacherNotes,
      },
    };
    setVersions([...versions, newVersion]);
    setReviewerNotes('');
    // Navigate to Pilot & Version
    setCurrentView('pilot');
  };

  const reviewDecisions: ReviewDecision[] = ['Approve', 'Approve with Edits', 'Revise', 'Pilot', 'Reject'];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold text-gray-900">AI Chinese Reading Production Studio</h1>
              <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">Interactive Sample</span>
              <span className="text-xs text-gray-400">Sample Data</span>
            </div>
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className="text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-gray-300 rounded hover:border-gray-400 transition-colors"
            >
              Sample Output Comparison
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">Interactive sample built from fictional curriculum material. No company records or real student data.</p>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          <div className={showBenchmark ? 'flex-1' : 'w-full'}>
            <nav className="flex gap-0 mb-6 border-b border-gray-200">
              <button
                onClick={() => setCurrentView('brief')}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  currentView === 'brief'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-gray-400 mr-1.5">01</span>Brief & Guardrails
              </button>
              <button
                onClick={() => setCurrentView('draft')}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  currentView === 'draft'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-gray-400 mr-1.5">02</span>Draft & Quality Gate
              </button>
              <button
                onClick={() => setCurrentView('pilot')}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  currentView === 'pilot'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-gray-400 mr-1.5">03</span>Pilot & Version
              </button>
            </nav>

            {currentView === 'brief' && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <LearnerProfileForm profile={learnerProfile} onChange={setLearnerProfile} />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <InstructionalBriefForm brief={instructionalBrief} onChange={setInstructionalBrief} />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <ContentConstraintsForm constraints={contentConstraints} onChange={setContentConstraints} />
                </div>
                {!canGenerate && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-900">
                    <span className="font-medium">Reading proficiency required</span> before content generation.
                  </div>
                )}
                {generationError && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5">
                    <div className="text-xs font-medium text-amber-900 mb-2">Live generation unavailable</div>
                    <div className="text-xs text-amber-800 mb-3">The live model endpoint is temporarily unavailable. You can continue with the complete illustrative workflow.</div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleExploreIllustrative}
                        className="px-3 py-1.5 text-xs font-medium bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                      >
                        View Illustrative Course
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={!canGenerate || isGenerating}
                        className="px-3 py-1.5 text-xs font-medium bg-white border border-amber-300 text-amber-900 rounded hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                {isGenerating && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5">
                    <div className="text-xs font-medium text-blue-900 mb-1">Generating course package…</div>
                    <div className="text-xs text-blue-700">
                      {elapsedSeconds < 8
                        ? `This usually takes up to 15 seconds.`
                        : `Finalizing structured course content. Up to 15 seconds.`}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">Elapsed: {elapsedSeconds}s</div>
                  </div>
                )}
                <div className="space-y-3">
                  <button
                    onClick={handleExploreIllustrative}
                    className="w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span>Explore Illustrative Course</span>
                      <span className="text-xs font-normal text-blue-100">Instant · prebuilt portfolio sample</span>
                    </div>
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      canGenerate && !isGenerating
                        ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{isGenerating ? 'Generating…' : 'Experimental Live Generation'}</span>
                      <span className={`text-xs font-normal ${canGenerate && !isGenerating ? 'text-gray-500' : 'text-gray-400'}`}>
                        Optional model endpoint · may be unavailable
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentView === 'draft' && (
              <div className="lg:grid lg:grid-cols-[1fr_450px] lg:gap-6 space-y-6 lg:space-y-0">
                <div className="space-y-6">
                  {generationSource === 'live' && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded text-xs">
                      <span className="text-blue-900 font-medium">Live AI generation</span>
                    </div>
                  )}
                  {generationSource === 'seeded' && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs">
                      <span className="text-gray-900 font-medium">Illustrative demo content</span>
                    </div>
                  )}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200 px-1 bg-gray-50">
                      <nav className="flex gap-0">
                        {[
                          { key: 'passage', label: 'Reading Passage' },
                          { key: 'vocabulary', label: 'Vocabulary' },
                          { key: 'questions', label: 'Questions' },
                          { key: 'practice', label: 'Practice' },
                          { key: 'notes', label: 'Notes' },
                        ].map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setDraftTab(tab.key as DraftTab)}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                              draftTab === tab.key
                                ? 'border-blue-600 text-gray-900 bg-white'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div className="p-5">
                      <CoursePackageView coursePackage={coursePackage} onChange={setCoursePackage} activeTab={draftTab} />
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <QAResultsView qaResult={qaResult} aiReview={aiReview} />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Expert Review</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Decision</label>
                        <select
                          value={reviewDecision || ''}
                          onChange={(e) => setReviewDecision(e.target.value as ReviewDecision)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select decision</option>
                          {reviewDecisions.map((decision) => (
                            <option key={decision} value={decision}>
                              {decision}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Reviewer Notes</label>
                        <textarea
                          value={reviewerNotes}
                          onChange={(e) => setReviewerNotes(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Add review rationale..."
                        />
                      </div>
                      <button
                        onClick={handleCreateRevision}
                        disabled={!reviewDecision}
                        className={`w-full px-4 py-2 text-sm font-medium rounded transition-colors ${
                          reviewDecision
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Save Review & Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'pilot' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-6">Version Lifecycle & Pilot Feedback</h2>
                <VersionHistoryView versions={versions} />
              </div>
            )}
          </div>

          {showBenchmark && (
            <div className="w-96 bg-white border border-gray-200 rounded-lg p-5">
              <ModelBenchmark brief={instructionalBrief} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
