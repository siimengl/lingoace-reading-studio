'use client';

import { CoursePackage } from '@/types';

interface CoursePackageViewProps {
  coursePackage: CoursePackage;
  onChange: (coursePackage: CoursePackage) => void;
  activeTab: 'passage' | 'vocabulary' | 'questions' | 'practice' | 'notes';
}

export default function CoursePackageView({ coursePackage, onChange, activeTab }: CoursePackageViewProps) {
  return (
    <div className="space-y-4">
      {activeTab === 'passage' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Reading Passage</label>
          <textarea
            value={coursePackage.readingPassage}
            onChange={(e) => onChange({ ...coursePackage, readingPassage: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={14}
          />
        </div>
      )}

      {activeTab === 'vocabulary' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Vocabulary</label>
          <div className="space-y-2.5">
            <div className="grid grid-cols-[1fr_1.5fr_2fr] gap-3 text-xs font-medium text-gray-500 px-1">
              <div>Chinese</div>
              <div>Pinyin</div>
              <div>English</div>
            </div>
            {coursePackage.vocabulary.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1.5fr_2fr] gap-3 text-sm">
                <input
                  type="text"
                  value={item.word}
                  onChange={(e) => {
                    const updated = [...coursePackage.vocabulary];
                    updated[idx] = { ...updated[idx], word: e.target.value };
                    onChange({ ...coursePackage, vocabulary: updated });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Chinese"
                />
                <input
                  type="text"
                  value={item.pinyin}
                  onChange={(e) => {
                    const updated = [...coursePackage.vocabulary];
                    updated[idx] = { ...updated[idx], pinyin: e.target.value };
                    onChange({ ...coursePackage, vocabulary: updated });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Pinyin"
                />
                <input
                  type="text"
                  value={item.definition}
                  onChange={(e) => {
                    const updated = [...coursePackage.vocabulary];
                    updated[idx] = { ...updated[idx], definition: e.target.value };
                    onChange({ ...coursePackage, vocabulary: updated });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="English"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Comprehension Questions</label>
          <div className="space-y-3.5">
            {coursePackage.comprehensionQuestions.map((q, qIdx) => (
              <div key={q.id} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Question {q.id}</label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...coursePackage.comprehensionQuestions];
                      updated[qIdx] = { ...updated[qIdx], question: e.target.value };
                      onChange({ ...coursePackage, comprehensionQuestions: updated });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Question text"
                  />
                </div>
                {q.options && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Options</label>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...coursePackage.comprehensionQuestions];
                            const updatedOptions = [...(updated[qIdx].options || [])];
                            updatedOptions[optIdx] = e.target.value;
                            updated[qIdx] = { ...updated[qIdx], options: updatedOptions };
                            onChange({ ...coursePackage, comprehensionQuestions: updated });
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Option ${optIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Answer</label>
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => {
                      const updated = [...coursePackage.comprehensionQuestions];
                      updated[qIdx] = { ...updated[qIdx], answer: e.target.value };
                      onChange({ ...coursePackage, comprehensionQuestions: updated });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Correct answer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Practice Activity</label>
          <textarea
            value={coursePackage.practiceActivity}
            onChange={(e) => onChange({ ...coursePackage, practiceActivity: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={8}
          />
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Teacher Notes</label>
          <textarea
            value={coursePackage.teacherNotes}
            onChange={(e) => onChange({ ...coursePackage, teacherNotes: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={8}
          />
        </div>
      )}
    </div>
  );
}
