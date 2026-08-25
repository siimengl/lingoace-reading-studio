import { CoursePackage } from '@/types';

// Illustrative candidates representing different output tradeoff profiles
// No real vendor/model names or API calls

export const candidateA: CoursePackage = {
  readingPassage: `小明很喜欢看星星。一天晚上，他和爸爸一起去公园看星星。

夜晚的天空很黑，但是有很多星星。星星闪闪发光，非常漂亮。小明看见了天空中很多很多的星星。到了公园后，小明迫不及待地跑向望远镜。

"爸爸，那是什么？"小明问。

"那是北斗七星，"爸爸说。

通过望远镜，他看到了更多的星星。小明非常开心。

"真美啊！"小明说。`,
  vocabulary: [
    { word: '星星', pinyin: 'xīng xing', definition: 'stars' },
    { word: '天空', pinyin: 'tiān kōng', definition: 'sky' },
    { word: '晚上', pinyin: 'wǎn shang', definition: 'evening, night' },
    { word: '看见', pinyin: 'kàn jiàn', definition: 'to see' },
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

export const candidateB: CoursePackage = {
  readingPassage: `晚上，小明和爸爸去看夜空。天空有很多星星。星星很亮，很漂亮。小明很高兴。他们到了公园。

"那是什么？"小明问。

"那是星星，"爸爸说。

小明很开心。他看了很多很多星星。小明很喜欢看星星。天空的星星真好看。晚上的天空让小明很开心。他观察了美丽的星星。小明和爸爸一起看了很久。星星在天空中闪烁。

"真好看！"小明说。小明觉得星星非常漂亮。`,
  vocabulary: [
    { word: '晚上', pinyin: 'wǎn shang', definition: 'evening, night' },
    { word: '星星', pinyin: 'xīng xing', definition: 'stars' },
    { word: '天空', pinyin: 'tiān kōng', definition: 'sky' },
    { word: '很亮', pinyin: 'hěn liàng', definition: 'very bright' },
    { word: '开心', pinyin: 'kāi xīn', definition: 'happy' },
  ],
  comprehensionQuestions: [
    {
      id: 1,
      question: '小明和谁去看星星？',
      options: ['妈妈', '爸爸', '老师'],
      answer: '爸爸',
    },
    {
      id: 2,
      question: '他们什么时候去看星星？',
      options: ['早上', '中午', '晚上'],
      answer: '晚上',
    },
    {
      id: 3,
      question: '星星怎么样？',
      options: ['很亮', '很大', '很小'],
      answer: '很亮',
    },
  ],
  practiceActivity: `画一画：
画出你看到的星星。

写一写：
晚上，我看到了____。`,
  teacherNotes: `教学重点：
- 基础问答句型
- 描述性词汇：很亮、好看
- 时间词：晚上

建议活动：
- 学生分享看星星的经历
- 认读基础天文词汇`,
};

export const candidateC: CoursePackage = {
  readingPassage: `小明喜欢看星星。晚上，他和爸爸一起去公园。夜晚的天空很黑，有很多星星。

星星闪闪发光，非常漂亮。小明看见了天空中很多很多的星星。到了公园后，小明跑到那里。他非常开心。小明很高兴能看星星。天空中的星星真美丽。

"爸爸，那是什么？"小明问。

"那是星座，"爸爸回答。

通过工具，他看到了更多星星。小明觉得很有趣。

"好美！"小明说。`,
  vocabulary: [
    { word: '星星', pinyin: 'xīng xing', definition: 'stars' },
    { word: '天空', pinyin: 'tiān kōng', definition: 'sky' },
    { word: '晚上', pinyin: 'wǎn shang', definition: 'evening, night' },
    { word: '闪闪发光', pinyin: 'shǎn shǎn fā guāng', definition: 'sparkling' },
    { word: '看见', pinyin: 'kàn jiàn', definition: 'to see' },
  ],
  comprehensionQuestions: [
    {
      id: 1,
      question: '小明和谁一起去公园？',
      options: ['妈妈', '爸爸', '朋友'],
      answer: '爸爸',
    },
    {
      id: 2,
      question: '他们在哪里看星星？',
      answer: '公园',
    },
    {
      id: 3,
      question: '爸爸说那是什么？',
      options: ['月亮', '星座', '太阳'],
      answer: '星座',
    },
    {
      id: 4,
      question: '小明看到了什么？',
      answer: '更多星星',
    },
  ],
  practiceActivity: `连线练习：
把词语和图片连起来：
星星 - 天空

填空练习：
小明和____去公园。
他看到了很多____。`,
  teacherNotes: '',
};
