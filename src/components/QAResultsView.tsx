'use client';

import { QAResult, AIReviewResult } from '@/types';

interface QAResultsViewProps {
  qaResult: QAResult;
  aiReview: AIReviewResult;
}

export default function QAResultsView({ qaResult, aiReview }: QAResultsViewProps) {
  const getStatusBadge = (pass: boolean) => {
    return pass ? (
      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">Pass</span>
    ) : (
      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">Review</span>
    );
  };

  const getRatingBadge = (rating: string) => {
    if (rating === 'Not evaluated' || rating === 'Editor review' || rating === 'No rule-based flag') {
      return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">{rating}</span>;
    }
    if (rating === 'Strong' || rating === 'Appropriate') {
      return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">{rating}</span>;
    }
    if (rating === 'Adequate') {
      return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">{rating}</span>;
    }
    return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">{rating}</span>;
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Quality Gate</h3>

        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-gray-900 mb-3">Deterministic QA</div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <span className="text-xs text-gray-700">Passage Target Vocabulary Coverage</span>
                <span className="text-sm font-semibold text-gray-900">{qaResult.passageTargetVocabularyCoverage}%</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <span className="text-xs text-gray-700">Passage Target Character Coverage</span>
                <span className="text-sm font-semibold text-gray-900">{qaResult.passageTargetCharacterCoverage}%</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <span className="text-xs text-gray-700">Length Constraint</span>
                {getStatusBadge(qaResult.lengthConstraintMet)}
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <span className="text-xs text-gray-700">Required Sections</span>
                {getStatusBadge(qaResult.requiredSectionsComplete)}
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <span className="text-xs text-gray-700">Schema Validity</span>
                {getStatusBadge(qaResult.schemaValid)}
              </div>
              {qaResult.advancedTerms.length > 0 && (
                <div className="py-2 px-3 bg-amber-50 rounded border border-amber-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-amber-900">Advanced Terms Detected</span>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                      {qaResult.advancedTerms.length}
                    </span>
                  </div>
                  <div className="text-xs text-amber-800 space-y-0.5">
                    {qaResult.advancedTerms.map((term, idx) => (
                      <div key={idx}>• {term}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-xs font-semibold text-gray-900 mb-1">Rule Screening & Editor Review</div>
            <p className="text-[11px] text-gray-500 mb-3">Known-term flags are rule-based; lesson quality and cultural fit require an editor.</p>
            {aiReview.readingLevelFit === 'Not evaluated' ? (
              <div className="py-2.5 px-3 bg-gray-50 rounded border border-gray-200 text-xs text-gray-600">
                Screening unavailable — complete required content and resolve structural errors first.
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-700">Reading Level Fit</span>
                  {getRatingBadge(aiReview.readingLevelFit)}
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-700">Instructional Alignment</span>
                  {getRatingBadge(aiReview.instructionalAlignment)}
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-700">Question Quality</span>
                  {getRatingBadge(aiReview.questionQuality)}
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-700">Age Appropriateness</span>
                  {getRatingBadge(aiReview.ageAppropriateness)}
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-700">Cultural Naturalness</span>
                  {getRatingBadge(aiReview.culturalNaturalness)}
                </div>
              </div>
            )}
            {aiReview.issues.length > 0 && (
              <div className="mt-3 py-2.5 px-3 bg-amber-50 border border-amber-200 rounded">
                <div className="text-xs font-medium text-amber-900 mb-1.5">Issues Detected</div>
                {aiReview.issues.map((issue, idx) => (
                  <div key={idx} className="text-xs text-amber-800 mb-1">• {issue}</div>
                ))}
                {aiReview.readingLevelFit !== 'Not evaluated' && (
                  <div className="text-xs text-amber-900 mt-2.5 font-medium">
                    Suggested action: Replace or route to curriculum review.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="py-2.5 px-3 bg-blue-50 border border-blue-200 rounded">
              <div className="text-xs font-semibold text-gray-900 mb-1.5">Expert Judgment Required</div>
              <div className="text-xs text-gray-700 leading-relaxed">
                Rules flag possible issues; a curriculum editor makes the final qualitative judgment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
