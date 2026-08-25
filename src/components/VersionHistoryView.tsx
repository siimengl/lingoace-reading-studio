'use client';

import { Version } from '@/types';

interface VersionHistoryViewProps {
  versions: Version[];
}

export default function VersionHistoryView({ versions }: VersionHistoryViewProps) {
  const getDecisionBadge = (decision: string | null) => {
    if (!decision) return null;

    const colors: Record<string, string> = {
      'Approve': 'bg-green-100 text-green-800',
      'Approve with Edits': 'bg-blue-100 text-blue-800',
      'Pilot': 'bg-purple-100 text-purple-800',
      'Revise': 'bg-amber-100 text-amber-800',
      'Reject': 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${colors[decision] || 'bg-gray-100 text-gray-800'}`}>
        {decision}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {versions.map((version, idx) => (
        <div key={version.versionNumber} className="relative">
          {idx < versions.length - 1 && (
            <div className="absolute left-[15px] top-[32px] bottom-[-20px] w-0.5 bg-gray-200"></div>
          )}

          <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-start gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
                {version.versionNumber}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">{version.label}</h3>
                  {version.decision && getDecisionBadge(version.decision)}
                  {version.hardRuleFlags > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                      {version.hardRuleFlags} flag{version.hardRuleFlags > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                {version.reviewerNotes && (
                  <div className="text-xs text-gray-600 mt-1">{version.reviewerNotes}</div>
                )}
              </div>
            </div>

            {version.coursePackage && (
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1.5">Reading Passage</div>
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 font-mono leading-relaxed max-h-32 overflow-y-auto">
                    {version.coursePackage.readingPassage}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1.5">Vocabulary</div>
                    <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 max-h-24 overflow-y-auto">
                      {version.coursePackage.vocabulary.map((v, i) => (
                        <div key={i} className="mb-1">
                          <span className="font-medium">{v.word}</span> ({v.pinyin}) — {v.definition}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1.5">Questions</div>
                    <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 max-h-24 overflow-y-auto">
                      {version.coursePackage.comprehensionQuestions.map((q, i) => (
                        <div key={i} className="mb-1.5">
                          <div className="font-medium">{q.question}</div>
                          <div className="text-[11px] text-gray-500">Answer: {q.answer}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {version.teacherFeedback && (
              <div className="border-t border-gray-200 bg-purple-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                    Illustrative Pilot Feedback
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-gray-700 w-24">Engagement:</div>
                    <div className="text-xs text-gray-600">{version.teacherFeedback.engagement}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-gray-700 w-24">Difficulty:</div>
                    <div className="text-xs text-gray-600">{version.teacherFeedback.difficulty}</div>
                  </div>
                  {version.teacherFeedback.issues.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Issues:</div>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        {version.teacherFeedback.issues.map((issue, idx) => (
                          <div key={idx}>• {issue}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {version.changes && version.changes.length > 0 && (
              <div className="border-t border-gray-200 bg-blue-50 p-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Changes from Previous Version</div>
                <div className="space-y-2">
                  {version.changes.map((change, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs font-medium text-gray-700">{change.field}</div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-xs">
                        <span className="text-gray-500">V{version.versionNumber - 1}:</span>
                        <span className="text-red-700 line-through">{change.before}</span>
                        <span className="text-gray-500">V{version.versionNumber}:</span>
                        <span className="text-green-700 font-medium">{change.after}</span>
                      </div>
                      <div className="text-xs text-gray-600 italic">{change.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
