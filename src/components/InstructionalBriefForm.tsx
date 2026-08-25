'use client';

import { InstructionalBrief } from '@/types';

interface InstructionalBriefFormProps {
  brief: InstructionalBrief;
  onChange: (brief: InstructionalBrief) => void;
}

export default function InstructionalBriefForm({ brief, onChange }: InstructionalBriefFormProps) {
  const updateField = <K extends keyof InstructionalBrief>(field: K, value: InstructionalBrief[K]) => {
    onChange({ ...brief, [field]: value });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Instructional Brief</h3>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Learning Objective</label>
        <input
          type="text"
          value={brief.learningObjective}
          onChange={(e) => updateField('learningObjective', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Characters</label>
          <input
            type="text"
            value={brief.targetCharacters}
            onChange={(e) => updateField('targetCharacters', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Vocabulary</label>
          <input
            type="text"
            value={brief.targetVocabulary}
            onChange={(e) => updateField('targetVocabulary', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Reading Skill</label>
          <input
            type="text"
            value={brief.readingSkill}
            onChange={(e) => updateField('readingSkill', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Theme</label>
          <input
            type="text"
            value={brief.theme}
            onChange={(e) => updateField('theme', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Desired Length</label>
          <input
            type="text"
            value={brief.desiredLength}
            onChange={(e) => updateField('desiredLength', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Question Types</label>
          <input
            type="text"
            value={brief.questionTypes}
            onChange={(e) => updateField('questionTypes', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
