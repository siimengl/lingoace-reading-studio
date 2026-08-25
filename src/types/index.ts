export type Track = 'Heritage — Enrichment' | 'Heritage — Advanced';
export type ProficiencyLevel = '' | 'Emerging' | 'Developing' | 'Strong' | 'Advanced';

export interface LearnerProfile {
  age: number;
  track: Track;
  homeLanguage: string;
  listeningLevel: ProficiencyLevel;
  speakingLevel: ProficiencyLevel;
  readingLevel: ProficiencyLevel;
  writingLevel: ProficiencyLevel;
  interests: string;
}

export interface InstructionalBrief {
  learningObjective: string;
  targetCharacters: string;
  targetVocabulary: string;
  readingSkill: string;
  theme: string;
  desiredLength: string;
  questionTypes: string;
}

export interface ContentConstraints {
  approvedVocabulary: string;
  approvedCharacterSet: string;
  referenceMaterials: string;
  culturalGuidance: string;
  requiredSections: string;
}

export interface CoursePackage {
  readingPassage: string;
  vocabulary: VocabularyItem[];
  comprehensionQuestions: Question[];
  practiceActivity: string;
  teacherNotes: string;
}

export interface VocabularyItem {
  word: string;
  pinyin: string;
  definition: string;
}

export interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string;
}

export interface QAResult {
  passageTargetVocabularyCoverage: number;
  passageTargetCharacterCoverage: number;
  lengthConstraintMet: boolean;
  advancedTerms: string[];
  requiredSectionsComplete: boolean;
  schemaValid: boolean;
}

export interface AIReviewResult {
  readingLevelFit: string;
  instructionalAlignment: string;
  questionQuality: string;
  ageAppropriateness: string;
  culturalNaturalness: string;
  issues: string[];
}

export type ReviewDecision = 'Approve' | 'Approve with Edits' | 'Revise' | 'Pilot' | 'Reject';

export interface Version {
  versionNumber: number;
  label: string;
  hardRuleFlags: number;
  decision: ReviewDecision | null;
  reviewerNotes: string;
  teacherFeedback?: TeacherFeedback;
  changes?: VersionChange[];
  coursePackage?: CoursePackage;
}

export interface TeacherFeedback {
  engagement: string;
  difficulty: string;
  issues: string[];
}

export interface VersionChange {
  field: string;
  before: string;
  after: string;
  reason: string;
}
