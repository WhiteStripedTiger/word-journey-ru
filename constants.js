/* ==========================================================
   Внутренний Компас
   constants.js
   Version 2.0
========================================================== */


/* ==========================================================
   APP INFO
========================================================== */

const APP = {
  name: "Внутренний Компас",
  version: "2.0.0",
  defaultLanguage: "ru",
  supportedLanguages: ["ru", "ko", "en"]
};


/* ==========================================================
   CATEGORIES
========================================================== */

const CATEGORIES = {
  relationship: {
    ru: "Отношения",
    ko: "관계",
    en: "Relationships"
  },
  self: {
    ru: "Самость",
    ko: "자기",
    en: "Self"
  },
  growth: {
    ru: "Развитие",
    ko: "성장",
    en: "Growth"
  },
  freedom: {
    ru: "Свобода",
    ko: "자유",
    en: "Freedom"
  },
  emotion: {
    ru: "Эмоции",
    ko: "감정",
    en: "Emotion"
  },
  creation: {
    ru: "Творчество",
    ko: "창조",
    en: "Creation"
  },
  achievement: {
    ru: "Достижение",
    ko: "성취",
    en: "Achievement"
  },
  justice: {
    ru: "Справедливость",
    ko: "정의",
    en: "Justice"
  },
  stability: {
    ru: "Стабильность",
    ko: "안정",
    en: "Stability"
  },
  wisdom: {
    ru: "Мудрость",
    ko: "지혜",
    en: "Wisdom"
  }
};


/* ==========================================================
   STAGES
========================================================== */

const STAGES = [
  {
    id: "positive_select",
    title: {
      ru: "Выберите 20 слов",
      ko: "긍정 단어 20개 선택",
      en: "Choose 20 positive words"
    },
    description: {
      ru: "Выберите 20 слов, которые сейчас особенно откликаются вам.",
      ko: "지금 나에게 특히 와닿는 긍정 단어 20개를 선택하세요.",
      en: "Choose 20 words that resonate with you right now."
    },
    limit: 20,
    mode: "select"
  },

  {
    id: "positive_drop_1",
    title: {
      ru: "Уберите 5 слов",
      ko: "5개 덜어내기",
      en: "Remove 5 words"
    },
    description: {
      ru: "Из выбранных слов уберите 5, которые сейчас кажутся менее важными.",
      ko: "선택한 단어 중 지금은 덜 중요하게 느껴지는 5개를 덜어내세요.",
      en: "Remove 5 words that feel less important right now."
    },
    limit: 5,
    mode: "drop"
  },

  {
    id: "positive_drop_2",
    title: {
      ru: "Уберите ещё 5 слов",
      ko: "다시 5개 덜어내기",
      en: "Remove 5 more words"
    },
    description: {
      ru: "Снова уберите 5 слов. Оставьте только те, которые сильнее держатся внутри.",
      ko: "다시 5개를 덜어내세요. 더 강하게 남는 단어만 유지하세요.",
      en: "Remove 5 more words. Keep only the ones that stay stronger inside."
    },
    limit: 5,
    mode: "drop"
  },

  {
    id: "positive_drop_3",
    title: {
      ru: "Оставьте 5 главных слов",
      ko: "핵심 긍정 단어 5개 남기기",
      en: "Keep 5 core words"
    },
    description: {
      ru: "Последний отбор: уберите 5 слов и оставьте 5 самых живых.",
      ko: "마지막으로 5개를 덜어내고 가장 살아있는 5개를 남기세요.",
      en: "Final reduction: remove 5 words and keep the 5 most alive."
    },
    limit: 5,
    mode: "drop"
  },

  {
    id: "negative_select",
    title: {
      ru: "Выберите 10 теневых слов",
      ko: "부정 단어 10개 선택",
      en: "Choose 10 shadow words"
    },
    description: {
      ru: "Выберите 10 слов, которые вызывают отторжение, боль, злость или внутреннее сопротивление.",
      ko: "거부감, 아픔, 분노, 내적 저항을 일으키는 단어 10개를 선택하세요.",
      en: "Choose 10 words that evoke rejection, pain, anger, or inner resistance."
    },
    limit: 10,
    mode: "select_negative"
  },

  {
    id: "negative_drop",
    title: {
      ru: "Оставьте 5 самых сильных теней",
      ko: "가장 강한 부정 단어 5개 남기기",
      en: "Keep 5 strongest shadow words"
    },
    description: {
      ru: "Уберите 5 слов и оставьте те, с которыми особенно хочется разобраться.",
      ko: "5개를 덜어내고 특히 마주하고 싶은 단어를 남기세요.",
      en: "Remove 5 words and keep the ones you most want to face."
    },
    limit: 5,
    mode: "drop_negative"
  },

  {
    id: "opposite_select",
    title: {
      ru: "Выберите противоположности",
      ko: "반대편 긍정 단어 선택",
      en: "Choose opposites"
    },
    description: {
      ru: "Для каждого теневого слова выберите положительную противоположность.",
      ko: "각 부정 단어의 반대편에 있는 긍정 단어를 선택하세요.",
      en: "For each shadow word, choose a positive opposite."
    },
    limit: 5,
    mode: "opposite"
  },

  {
    id: "final_select",
    title: {
      ru: "Выберите финальные 5 слов",
      ko: "최종 5개 선택",
      en: "Choose final 5 words"
    },
    description: {
      ru: "Перед вами слова, прошедшие весь путь. Выберите 5 слов, которые сейчас точнее всего описывают ваш внутренний компас.",
      ko: "여정을 통과한 단어들 중 지금 나의 내면 나침반을 가장 잘 보여주는 5개를 선택하세요.",
      en: "Choose 5 words that best describe your inner compass right now."
    },
    limit: 5,
    mode: "final"
  }
];


/* ==========================================================
   POSITIVE WORDS
   v2 Part 1
========================================================== */

const POSITIVE_WORDS = [
  {
    id: "love",
    text: {
      ru: "Любовь",
      ko: "사랑",
      en: "Love"
    },
    category: "relationship"
  },
  {
    id: "affection",
    text: {
      ru: "Нежность",
      ko: "애정",
      en: "Affection"
    },
    category: "relationship"
  },
  {
    id: "care",
    text: {
      ru: "Забота",
      ko: "돌봄",
      en: "Care"
    },
    category: "relationship"
  },
  {
    id: "family",
    text: {
      ru: "Семья",
      ko: "가족",
      en: "Family"
    },
    category: "relationship"
  },
  {
    id: "friendship",
    text: {
      ru: "Дружба",
      ko: "우정",
      en: "Friendship"
    },
    category: "relationship"
  },
  {
    id: "trust",
    text: {
      ru: "Доверие",
      ko: "신뢰",
      en: "Trust"
    },
    category: "relationship"
  },
  {
    id: "loyalty",
    text: {
      ru: "Верность",
      ko: "충실함",
      en: "Loyalty"
    },
    category: "relationship"
  },
  {
    id: "honesty",
    text: {
      ru: "Честность",
      ko: "정직",
      en: "Honesty"
    },
    category: "justice"
  },
  {
    id: "sincerity",
    text: {
      ru: "Искренность",
      ko: "진심",
      en: "Sincerity"
    },
    category: "relationship"
  },
  {
    id: "respect",
    text: {
      ru: "Уважение",
      ko: "존중",
      en: "Respect"
    },
    category: "relationship"
  },

  {
    id: "freedom",
    text: {
      ru: "Свобода",
      ko: "자유",
      en: "Freedom"
    },
    category: "freedom"
  },
  {
    id: "independence",
    text: {
      ru: "Независимость",
      ko: "독립",
      en: "Independence"
    },
    category: "freedom"
  },
  {
    id: "flexibility",
    text: {
      ru: "Гибкость",
      ko: "유연성",
      en: "Flexibility"
    },
    category: "freedom"
  },
  {
    id: "choice",
    text: {
      ru: "Выбор",
      ko: "선택",
      en: "Choice"
    },
    category: "freedom"
  },
  {
    id: "adventure",
    text: {
      ru: "Приключение",
      ko: "모험",
      en: "Adventure"
    },
    category: "freedom"
  },

  {
    id: "self_respect",
    text: {
      ru: "Самоуважение",
      ko: "자존감",
      en: "Self-respect"
    },
    category: "self"
  },
  {
    id: "dignity",
    text: {
      ru: "Достоинство",
      ko: "존엄",
      en: "Dignity"
    },
    category: "self"
  },
  {
    id: "confidence",
    text: {
      ru: "Уверенность",
      ko: "자신감",
      en: "Confidence"
    },
    category: "self"
  },
  {
    id: "identity",
    text: {
      ru: "Идентичность",
      ko: "정체성",
      en: "Identity"
    },
    category: "self"
  },
  {
    id: "authenticity",
    text: {
      ru: "Подлинность",
      ko: "참됨",
      en: "Authenticity"
    },
    category: "self"
  },

  {
    id: "growth",
    text: {
      ru: "Развитие",
      ko: "성장",
      en: "Growth"
    },
    category: "growth"
  },
  {
    id: "learning",
    text: {
      ru: "Обучение",
      ko: "배움",
      en: "Learning"
    },
    category: "growth"
  },
  {
    id: "curiosity",
    text: {
      ru: "Любопытство",
      ko: "호기심",
      en: "Curiosity"
    },
    category: "growth"
  },
  {
    id: "wisdom",
    text: {
      ru: "Мудрость",
      ko: "지혜",
      en: "Wisdom"
    },
    category: "wisdom"
  },
  {
    id: "insight",
    text: {
      ru: "Проницательность",
      ko: "통찰",
      en: "Insight"
    },
    category: "wisdom"
  },

  {
    id: "happiness",
    text: {
      ru: "Счастье",
      ko: "행복",
      en: "Happiness"
    },
    category: "emotion"
  },
  {
    id: "joy",
    text: {
      ru: "Радость",
      ko: "기쁨",
      en: "Joy"
    },
    category: "emotion"
  },
  {
    id: "fun",
    text: {
      ru: "Веселье",
      ko: "재미",
      en: "Fun"
    },
    category: "emotion"
  },
  {
    id: "peace",
    text: {
      ru: "Спокойствие",
      ko: "평온",
      en: "Peace"
    },
    category: "stability"
  },
  {
    id: "hope",
    text: {
      ru: "Надежда",
      ko: "희망",
      en: "Hope"
    },
    category: "emotion"
  },

  {
    id: "creativity",
    text: {
      ru: "Творчество",
      ko: "창의성",
      en: "Creativity"
    },
    category: "creation"
  },
  {
    id: "imagination",
    text: {
      ru: "Воображение",
      ko: "상상력",
      en: "Imagination"
    },
    category: "creation"
  },
  {
    id: "beauty",
    text: {
      ru: "Красота",
      ko: "아름다움",
      en: "Beauty"
    },
    category: "creation"
  },
  {
    id: "expression",
    text: {
      ru: "Самовыражение",
      ko: "자기표현",
      en: "Self-expression"
    },
    category: "creation"
  },
  {
    id: "inspiration",
    text: {
      ru: "Вдохновение",
      ko: "영감",
      en: "Inspiration"
    },
    category: "creation"
  }
];
/* ==========================================================
   POSITIVE WORDS
   v2 Part 2
   Add more positive words
========================================================== */

POSITIVE_WORDS.push(
  {
    id: "success",
    text: {
      ru: "Успех",
      ko: "성공",
      en: "Success"
    },
    category: "achievement"
  },
  {
    id: "achievement",
    text: {
      ru: "Достижение",
      ko: "성취",
      en: "Achievement"
    },
    category: "achievement"
  },
  {
    id: "ambition",
    text: {
      ru: "Амбиция",
      ko: "야망",
      en: "Ambition"
    },
    category: "achievement"
  },
  {
    id: "recognition",
    text: {
      ru: "Признание",
      ko: "인정",
      en: "Recognition"
    },
    category: "achievement"
  },
  {
    id: "competence",
    text: {
      ru: "Компетентность",
      ko: "능력",
      en: "Competence"
    },
    category: "achievement"
  },
  {
    id: "mastery",
    text: {
      ru: "Мастерство",
      ko: "숙련",
      en: "Mastery"
    },
    category: "achievement"
  },
  {
    id: "discipline",
    text: {
      ru: "Дисциплина",
      ko: "절제",
      en: "Discipline"
    },
    category: "achievement"
  },
  {
    id: "focus",
    text: {
      ru: "Сосредоточенность",
      ko: "집중",
      en: "Focus"
    },
    category: "achievement"
  },
  {
    id: "perseverance",
    text: {
      ru: "Настойчивость",
      ko: "끈기",
      en: "Perseverance"
    },
    category: "achievement"
  },
  {
    id: "willpower",
    text: {
      ru: "Сила воли",
      ko: "의지",
      en: "Willpower"
    },
    category: "achievement"
  },

  {
    id: "stability",
    text: {
      ru: "Стабильность",
      ko: "안정",
      en: "Stability"
    },
    category: "stability"
  },
  {
    id: "safety",
    text: {
      ru: "Безопасность",
      ko: "안전",
      en: "Safety"
    },
    category: "stability"
  },
  {
    id: "comfort",
    text: {
      ru: "Уют",
      ko: "안락함",
      en: "Comfort"
    },
    category: "stability"
  },
  {
    id: "home",
    text: {
      ru: "Дом",
      ko: "집",
      en: "Home"
    },
    category: "stability"
  },
  {
    id: "balance",
    text: {
      ru: "Баланс",
      ko: "균형",
      en: "Balance"
    },
    category: "stability"
  },
  {
    id: "order",
    text: {
      ru: "Порядок",
      ko: "질서",
      en: "Order"
    },
    category: "stability"
  },
  {
    id: "rhythm",
    text: {
      ru: "Ритм",
      ko: "리듬",
      en: "Rhythm"
    },
    category: "stability"
  },
  {
    id: "rest",
    text: {
      ru: "Отдых",
      ko: "휴식",
      en: "Rest"
    },
    category: "stability"
  },
  {
    id: "health",
    text: {
      ru: "Здоровье",
      ko: "건강",
      en: "Health"
    },
    category: "stability"
  },
  {
    id: "resilience",
    text: {
      ru: "Устойчивость",
      ko: "회복탄력성",
      en: "Resilience"
    },
    category: "stability"
  },

  {
    id: "justice",
    text: {
      ru: "Справедливость",
      ko: "정의",
      en: "Justice"
    },
    category: "justice"
  },
  {
    id: "fairness",
    text: {
      ru: "Честность правил",
      ko: "공정함",
      en: "Fairness"
    },
    category: "justice"
  },
  {
    id: "equality",
    text: {
      ru: "Равенство",
      ko: "평등",
      en: "Equality"
    },
    category: "justice"
  },
  {
    id: "responsibility",
    text: {
      ru: "Ответственность",
      ko: "책임",
      en: "Responsibility"
    },
    category: "justice"
  },
  {
    id: "conscience",
    text: {
      ru: "Совесть",
      ko: "양심",
      en: "Conscience"
    },
    category: "justice"
  },
  {
    id: "integrity",
    text: {
      ru: "Цельность",
      ko: "올곧음",
      en: "Integrity"
    },
    category: "justice"
  },
  {
    id: "truth",
    text: {
      ru: "Правда",
      ko: "진실",
      en: "Truth"
    },
    category: "justice"
  },
  {
    id: "transparency",
    text: {
      ru: "Прозрачность",
      ko: "투명성",
      en: "Transparency"
    },
    category: "justice"
  },
  {
    id: "solidarity",
    text: {
      ru: "Солидарность",
      ko: "연대",
      en: "Solidarity"
    },
    category: "justice"
  },
  {
    id: "mercy",
    text: {
      ru: "Милосердие",
      ko: "자비",
      en: "Mercy"
    },
    category: "justice"
  },

  {
    id: "calmness",
    text: {
      ru: "Умиротворение",
      ko: "고요",
      en: "Calmness"
    },
    category: "emotion"
  },
  {
    id: "warmth",
    text: {
      ru: "Тепло",
      ko: "따뜻함",
      en: "Warmth"
    },
    category: "emotion"
  },
  {
    id: "lightness",
    text: {
      ru: "Лёгкость",
      ko: "가벼움",
      en: "Lightness"
    },
    category: "emotion"
  },
  {
    id: "passion",
    text: {
      ru: "Страсть",
      ko: "열정",
      en: "Passion"
    },
    category: "emotion"
  },
  {
    id: "delight",
    text: {
      ru: "Восторг",
      ko: "환희",
      en: "Delight"
    },
    category: "emotion"
  }
);
/* ==========================================================
   POSITIVE WORDS
   v2 Part 3
========================================================== */

POSITIVE_WORDS.push(

  {
    id: "dream",
    text: {
      ru: "Мечта",
      ko: "꿈",
      en: "Dream"
    },
    category: "growth"
  },

  {
    id: "purpose",
    text: {
      ru: "Предназначение",
      ko: "사명",
      en: "Purpose"
    },
    category: "growth"
  },

  {
    id: "meaning",
    text: {
      ru: "Смысл жизни",
      ko: "삶의 의미",
      en: "Meaning"
    },
    category: "growth"
  },

  {
    id: "calling",
    text: {
      ru: "Призвание",
      ko: "소명",
      en: "Calling"
    },
    category: "growth"
  },

  {
    id: "challenge",
    text: {
      ru: "Вызов",
      ko: "도전",
      en: "Challenge"
    },
    category: "growth"
  },

  {
    id: "exploration",
    text: {
      ru: "Исследование",
      ko: "탐험",
      en: "Exploration"
    },
    category: "growth"
  },

  {
    id: "openness",
    text: {
      ru: "Открытость",
      ko: "개방성",
      en: "Openness"
    },
    category: "growth"
  },

  {
    id: "adaptability",
    text: {
      ru: "Адаптивность",
      ko: "적응력",
      en: "Adaptability"
    },
    category: "growth"
  },

  {
    id: "vision",
    text: {
      ru: "Видение",
      ko: "비전",
      en: "Vision"
    },
    category: "growth"
  },

  {
    id: "potential",
    text: {
      ru: "Потенциал",
      ko: "잠재력",
      en: "Potential"
    },
    category: "growth"
  },



  {
    id: "humility",
    text: {
      ru: "Смирение",
      ko: "겸손",
      en: "Humility"
    },
    category: "self"
  },

  {
    id: "acceptance",
    text: {
      ru: "Принятие",
      ko: "수용",
      en: "Acceptance"
    },
    category: "self"
  },

  {
    id: "forgiveness",
    text: {
      ru: "Прощение",
      ko: "용서",
      en: "Forgiveness"
    },
    category: "self"
  },

  {
    id: "gratitude",
    text: {
      ru: "Благодарность",
      ko: "감사",
      en: "Gratitude"
    },
    category: "self"
  },

  {
    id: "mindfulness",
    text: {
      ru: "Осознанность",
      ko: "알아차림",
      en: "Mindfulness"
    },
    category: "self"
  },

  {
    id: "self_control",
    text: {
      ru: "Самоконтроль",
      ko: "자기통제",
      en: "Self-control"
    },
    category: "self"
  },

  {
    id: "self_reliance",
    text: {
      ru: "Самостоятельность",
      ko: "자립",
      en: "Self-reliance"
    },
    category: "self"
  },

  {
    id: "inner_strength",
    text: {
      ru: "Внутренняя сила",
      ko: "내면의 힘",
      en: "Inner Strength"
    },
    category: "self"
  },

  {
    id: "courage",
    text: {
      ru: "Мужество",
      ko: "용기",
      en: "Courage"
    },
    category: "self"
  },

  {
    id: "determination",
    text: {
      ru: "Решимость",
      ko: "결단력",
      en: "Determination"
    },
    category: "self"
  },



  {
    id: "cooperation",
    text: {
      ru: "Сотрудничество",
      ko: "협력",
      en: "Cooperation"
    },
    category: "relationship"
  },

  {
    id: "support",
    text: {
      ru: "Поддержка",
      ko: "지지",
      en: "Support"
    },
    category: "relationship"
  },

  {
    id: "understanding",
    text: {
      ru: "Понимание",
      ko: "이해",
      en: "Understanding"
    },
    category: "relationship"
  },

  {
    id: "empathy",
    text: {
      ru: "Эмпатия",
      ko: "공감",
      en: "Empathy"
    },
    category: "relationship"
  },

  {
    id: "generosity",
    text: {
      ru: "Щедрость",
      ko: "너그러움",
      en: "Generosity"
    },
    category: "relationship"
  },

  {
    id: "hospitality",
    text: {
      ru: "Гостеприимство",
      ko: "환대",
      en: "Hospitality"
    },
    category: "relationship"
  },

  {
    id: "devotion",
    text: {
      ru: "Преданность",
      ko: "헌신",
      en: "Devotion"
    },
    category: "relationship"
  },

  {
    id: "unity",
    text: {
      ru: "Единство",
      ko: "하나됨",
      en: "Unity"
    },
    category: "relationship"
  },

  {
    id: "community",
    text: {
      ru: "Сообщество",
      ko: "공동체",
      en: "Community"
    },
    category: "relationship"
  },

  {
    id: "belonging",
    text: {
      ru: "Принадлежность",
      ko: "소속감",
      en: "Belonging"
    },
    category: "relationship"
  }

);
/* ==========================================================
   POSITIVE WORDS
   v2 Part 4
========================================================== */

POSITIVE_WORDS.push(

  /* ---------- Nature ---------- */

  {
    id: "nature",
    text: {
      ru: "Природа",
      ko: "자연",
      en: "Nature"
    },
    category: "stability"
  },

  {
    id: "harmony",
    text: {
      ru: "Гармония",
      ko: "조화",
      en: "Harmony"
    },
    category: "stability"
  },

  {
    id: "silence",
    text: {
      ru: "Тишина",
      ko: "고요",
      en: "Silence"
    },
    category: "stability"
  },

  {
    id: "simplicity",
    text: {
      ru: "Простота",
      ko: "단순함",
      en: "Simplicity"
    },
    category: "stability"
  },

  {
    id: "purity",
    text: {
      ru: "Чистота",
      ko: "순수함",
      en: "Purity"
    },
    category: "stability"
  },

  {
    id: "freshness",
    text: {
      ru: "Свежесть",
      ko: "신선함",
      en: "Freshness"
    },
    category: "stability"
  },

  {
    id: "vitality",
    text: {
      ru: "Жизненная сила",
      ko: "생명력",
      en: "Vitality"
    },
    category: "stability"
  },

  {
    id: "energy",
    text: {
      ru: "Энергия",
      ko: "에너지",
      en: "Energy"
    },
    category: "stability"
  },



  /* ---------- Leadership ---------- */

  {
    id: "leadership",
    text: {
      ru: "Лидерство",
      ko: "리더십",
      en: "Leadership"
    },
    category: "achievement"
  },

  {
    id: "initiative",
    text: {
      ru: "Инициативность",
      ko: "주도성",
      en: "Initiative"
    },
    category: "achievement"
  },

  {
    id: "influence",
    text: {
      ru: "Влияние",
      ko: "영향력",
      en: "Influence"
    },
    category: "achievement"
  },

  {
    id: "service",
    text: {
      ru: "Служение",
      ko: "섬김",
      en: "Service"
    },
    category: "achievement"
  },

  {
    id: "contribution",
    text: {
      ru: "Вклад",
      ko: "기여",
      en: "Contribution"
    },
    category: "achievement"
  },



  /* ---------- Creativity ---------- */

  {
    id: "innovation",
    text: {
      ru: "Новаторство",
      ko: "혁신",
      en: "Innovation"
    },
    category: "creation"
  },

  {
    id: "originality",
    text: {
      ru: "Оригинальность",
      ko: "독창성",
      en: "Originality"
    },
    category: "creation"
  },

  {
    id: "curious_mind",
    text: {
      ru: "Любознательность",
      ko: "탐구심",
      en: "Inquisitiveness"
    },
    category: "creation"
  },

  {
    id: "playfulness",
    text: {
      ru: "Игривость",
      ko: "유희",
      en: "Playfulness"
    },
    category: "creation"
  },

  {
    id: "humor",
    text: {
      ru: "Юмор",
      ko: "유머",
      en: "Humor"
    },
    category: "creation"
  },



  /* ---------- Wisdom ---------- */

  {
    id: "knowledge",
    text: {
      ru: "Знание",
      ko: "지식",
      en: "Knowledge"
    },
    category: "wisdom"
  },

  {
    id: "understanding_deep",
    text: {
      ru: "Глубина",
      ko: "깊이",
      en: "Depth"
    },
    category: "wisdom"
  },

  {
    id: "reflection",
    text: {
      ru: "Размышление",
      ko: "성찰",
      en: "Reflection"
    },
    category: "wisdom"
  },

  {
    id: "reason",
    text: {
      ru: "Разум",
      ko: "이성",
      en: "Reason"
    },
    category: "wisdom"
  },

  {
    id: "discernment",
    text: {
      ru: "Рассудительность",
      ko: "분별력",
      en: "Discernment"
    },
    category: "wisdom"
  },



  /* ---------- Spiritual ---------- */

  {
    id: "faith",
    text: {
      ru: "Вера",
      ko: "믿음",
      en: "Faith"
    },
    category: "wisdom"
  },

  {
    id: "hope_spiritual",
    text: {
      ru: "Духовная надежда",
      ko: "영적 희망",
      en: "Spiritual Hope"
    },
    category: "wisdom"
  },

  {
    id: "inner_peace",
    text: {
      ru: "Внутренний мир",
      ko: "내적 평화",
      en: "Inner Peace"
    },
    category: "wisdom"
  },

  {
    id: "compassion_spiritual",
    text: {
      ru: "Милосердие души",
      ko: "영혼의 자비",
      en: "Compassion"
    },
    category: "wisdom"
  },



  /* ---------- Freedom ---------- */

  {
    id: "independence_spirit",
    text: {
      ru: "Свободный дух",
      ko: "자유로운 영혼",
      en: "Free Spirit"
    },
    category: "freedom"
  },

  {
    id: "travel",
    text: {
      ru: "Путешествия",
      ko: "여행",
      en: "Travel"
    },
    category: "freedom"
  },

  {
    id: "discovery",
    text: {
      ru: "Открытия",
      ko: "발견",
      en: "Discovery"
    },
    category: "freedom"
  },

  {
    id: "possibility",
    text: {
      ru: "Возможности",
      ko: "가능성",
      en: "Possibility"
    },
    category: "freedom"
  },

  {
    id: "future",
    text: {
      ru: "Будущее",
      ko: "미래",
      en: "Future"
    },
    category: "freedom"
  }

);
