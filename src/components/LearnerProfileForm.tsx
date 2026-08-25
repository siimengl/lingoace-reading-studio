'use client';

import { LearnerProfile, ProficiencyLevel, Track } from '@/types';

interface LearnerProfileFormProps {
  profile: LearnerProfile;
  onChange: (profile: LearnerProfile) => void;
}

export default function LearnerProfileForm({ profile, onChange }: LearnerProfileFormProps) {
  const updateField = <K extends keyof LearnerProfile>(field: K, value: LearnerProfile[K]) => {
    onChange({ ...profile, [field]: value });
  };

  const proficiencyLevels: ProficiencyLevel[] = ['', 'Emerging', 'Developing', 'Strong', 'Advanced'];
  const tracks: Track[] = ['Heritage — Enrichment', 'Heritage — Advanced'];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Learner Profile</h3>
        {profile.readingLevel && (
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Track</span>
              <span className="font-medium text-gray-900">{profile.track}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Age</span>
              <span className="font-medium text-gray-900">{profile.age}</span>
            </div>
            <div className="h-3 w-px bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Listening</span>
                <span className="font-medium text-blue-600">{profile.listeningLevel || '—'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Speaking</span>
                <span className="font-medium text-blue-600">{profile.speakingLevel || '—'}</span>
              </div>
              <div className="h-3 w-px bg-gray-300"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Reading</span>
                <span className="font-medium text-amber-600">{profile.readingLevel || '—'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Writing</span>
                <span className="font-medium text-amber-600">{profile.writingLevel || '—'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Age</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Track</label>
          <select
            value={profile.track}
            onChange={(e) => updateField('track', e.target.value as Track)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {tracks.map(track => (
              <option key={track} value={track}>{track}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Home Language</label>
          <input
            type="text"
            value={profile.homeLanguage}
            onChange={(e) => updateField('homeLanguage', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Interests</label>
          <input
            type="text"
            value={profile.interests}
            onChange={(e) => updateField('interests', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Proficiency Levels</label>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Listening</label>
            <select
              value={profile.listeningLevel}
              onChange={(e) => updateField('listeningLevel', e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level || '—'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Speaking</label>
            <select
              value={profile.speakingLevel}
              onChange={(e) => updateField('speakingLevel', e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level || '—'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Reading</label>
            <select
              value={profile.readingLevel}
              onChange={(e) => updateField('readingLevel', e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level || '—'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">Writing</label>
            <select
              value={profile.writingLevel}
              onChange={(e) => updateField('writingLevel', e.target.value as ProficiencyLevel)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level} value={level}>{level || '—'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
