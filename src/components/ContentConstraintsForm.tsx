'use client';

import { ContentConstraints } from '@/types';

interface ContentConstraintsFormProps {
  constraints: ContentConstraints;
  onChange: (constraints: ContentConstraints) => void;
}

export default function ContentConstraintsForm({ constraints, onChange }: ContentConstraintsFormProps) {
  const updateField = <K extends keyof ContentConstraints>(field: K, value: ContentConstraints[K]) => {
    onChange({ ...constraints, [field]: value });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Content Guardrails</h3>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Approved Vocabulary</label>
        <input
          type="text"
          value={constraints.approvedVocabulary}
          onChange={(e) => updateField('approvedVocabulary', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Approved Character Set</label>
        <input
          type="text"
          value={constraints.approvedCharacterSet}
          onChange={(e) => updateField('approvedCharacterSet', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Reference Materials</label>
        <input
          type="text"
          value={constraints.referenceMaterials}
          onChange={(e) => updateField('referenceMaterials', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Cultural Guidance</label>
        <input
          type="text"
          value={constraints.culturalGuidance}
          onChange={(e) => updateField('culturalGuidance', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Required Sections</label>
        <input
          type="text"
          value={constraints.requiredSections}
          onChange={(e) => updateField('requiredSections', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
