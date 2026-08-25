import { LearnerProfile, InstructionalBrief, ContentConstraints, CoursePackage, Version } from '@/types';

export const defaultLearnerProfile: LearnerProfile = {
  age: 8,
  track: 'Heritage — Enrichment',
  homeLanguage: 'Mandarin + English',
  listeningLevel: 'Strong',
  speakingLevel: 'Strong',
  readingLevel: 'Emerging',
  writingLevel: 'Emerging',
  interests: 'Space',
};

export const defaultInstructionalBrief: InstructionalBrief = {
  learningObjective: 'Develop narrative comprehension and temporal sequence recognition',
  targetCharacters: '星 空 夜 看 到 了 很 多',
  targetVocabulary: '星星, 天空, 晚上, 看见, 闪闪发光',
  readingSkill: 'Sequence of events',
  theme: 'Night sky observation',
  desiredLength: '150-200 characters',
  questionTypes: 'Multiple choice, sequencing, short answer',
};

export const defaultContentConstraints: ContentConstraints = {
  approvedVocabulary: 'Illustrative Heritage E2 Vocabulary Set',
  approvedCharacterSet: 'Illustrative Heritage E2 Character Set',
  referenceMaterials: 'Teacher-curated reading examples',
  culturalGuidance: 'Emphasize universal scientific curiosity',
  requiredSections: 'Reading passage, vocabulary list, comprehension questions, practice activity',
};

export const seededCoursePackage: CoursePackage = {
  readingPassage: `小明很喜欢看星星。一天晚上，他和爸爸一起去公园。

天空很黑，但是有很多星星。星星闪闪发光，非常漂亮。

"爸爸，那是什么？"小明问。

"那是北斗七星，"爸爸说。

小明迫不及待地跑向望远镜。通过望远镜，他看到了更多的星星。

"真美啊！"小明说。`,
  vocabulary: [
    { word: '星星', pinyin: 'xīng xing', definition: 'stars' },
    { word: '天空', pinyin: 'tiān kōng', definition: 'sky' },
    { word: '闪闪发光', pinyin: 'shǎn shǎn fā guāng', definition: 'sparkling, glittering' },
    { word: '北斗七星', pinyin: 'běi dǒu qī xīng', definition: 'Big Dipper' },
    { word: '迫不及待', pinyin: 'pò bù jí dài', definition: 'cannot wait, impatient' },
    { word: '望远镜', pinyin: 'wàng yuǎn jìng', definition: 'telescope' },
  ],
  comprehensionQuestions: [
    {
      id: 1,
      question: '小明和谁一起去公园？',
      options: ['妈妈', '爸爸', '老师', '朋友'],
      answer: '爸爸',
    },
    {
      id: 2,
      question: '他们在哪里看星星？',
      options: ['家里', '学校', '公园', '山上'],
      answer: '公园',
    },
    {
      id: 3,
      question: '爸爸告诉小明什么是北斗七星？',
      answer: '是',
    },
    {
      id: 4,
      question: '小明用什么看星星？',
      options: ['眼镜', '望远镜', '相机', '手机'],
      answer: '望远镜',
    },
  ],
  practiceActivity: `排序练习：
把下面的句子按正确的顺序排列：

□ 小明通过望远镜看到更多星星
□ 小明和爸爸去公园
□ 爸爸说那是北斗七星
□ 他们看到很多星星在天空`,
  teacherNotes: `教学重点：
- 时间顺序词：一天晚上、然后
- 对话标点的认读
- 天文主题词汇扩展

建议活动：
- 让学生画出他们看到的星空
- 讨论学生自己看星星的经历`,
};

export const seededVersions: Version[] = [
  {
    versionNumber: 1,
    label: 'V1 — AI Draft',
    hardRuleFlags: 3,
    decision: 'Revise',
    reviewerNotes: 'Contains advanced vocabulary exceeding reading level. Term "迫不及待" flagged for replacement.',
  },
  {
    versionNumber: 2,
    label: 'V2 — Expert Reviewed',
    hardRuleFlags: 0,
    decision: 'Pilot',
    reviewerNotes: 'All hard-rule violations resolved. Approved for classroom pilot.',
    teacherFeedback: {
      engagement: 'High',
      difficulty: 'Slightly High',
      issues: ['Question 4 caused confusion — telescope vocabulary may need more scaffolding'],
    },
  },
  {
    versionNumber: 3,
    label: 'V3 — Revised',
    hardRuleFlags: 0,
    decision: null,
    reviewerNotes: 'Final revision ready for curriculum review.',
    changes: [
      {
        field: 'Reading Passage',
        before: '小明迫不及待地跑向望远镜。',
        after: '小明马上跑到望远镜那里。',
        reason: 'Vocabulary difficulty issue resolved',
      },
    ],
  },
];
