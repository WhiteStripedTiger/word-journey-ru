/* ==========================================================
   Внутренний Компас
   constants.js
   Stable Lexicon Version 1.0
========================================================== */

const APP = {
  name: "Внутренний Компас",
  version: "1.0.0",
  defaultLanguage: "ru",
  supportedLanguages: ["ru", "ko", "en"]
};

const UI_LANG = "ru";

const CATEGORIES = {
  relationship: { ru: "Отношения", ko: "관계", en: "Relationships" },
  self: { ru: "Самость", ko: "자기", en: "Self" },
  freedom: { ru: "Свобода", ko: "자유", en: "Freedom" },
  growth: { ru: "Развитие", ko: "성장", en: "Growth" },
  creation: { ru: "Творчество", ko: "창조", en: "Creation" },
  achievement: { ru: "Достижение", ko: "성취", en: "Achievement" },
  stability: { ru: "Стабильность", ko: "안정", en: "Stability" },
  justice: { ru: "Справедливость", ko: "정의", en: "Justice" },
  wisdom: { ru: "Мудрость", ko: "지혜", en: "Wisdom" },
  emotion: { ru: "Эмоции", ko: "감정", en: "Emotion" },
  nature: { ru: "Природа", ko: "자연", en: "Nature" },
  lifestyle: { ru: "Образ жизни", ko: "삶의 방식", en: "Lifestyle" }
};

const STAGES = [
  {
    id: "positive_select",
    title: { ru: "Выберите 20 слов", ko: "긍정 단어 20개 선택", en: "Choose 20 words" },
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
    title: { ru: "Уберите 5 слов", ko: "5개 덜어내기", en: "Remove 5 words" },
    description: {
      ru: "Из выбранных 20 слов уберите 5, которые сейчас кажутся менее важными.",
      ko: "선택한 20개 중 지금 덜 중요하게 느껴지는 5개를 덜어내세요.",
      en: "Remove 5 words that feel less important now."
    },
    limit: 5,
    mode: "drop"
  },
  {
    id: "positive_drop_2",
    title: { ru: "Уберите ещё 5 слов", ko: "다시 5개 덜어내기", en: "Remove 5 more words" },
    description: {
      ru: "Снова уберите 5 слов. Оставьте то, что сильнее держится внутри.",
      ko: "다시 5개를 덜어내고 더 강하게 남는 단어를 유지하세요.",
      en: "Remove 5 more words. Keep what stays stronger inside."
    },
    limit: 5,
    mode: "drop"
  },
  {
    id: "positive_drop_3",
    title: { ru: "Оставьте 5 главных слов", ko: "핵심 긍정 단어 5개", en: "Keep 5 core words" },
    description: {
      ru: "Последний отбор: уберите 5 слов и оставьте 5 самых живых.",
      ko: "마지막으로 5개를 덜어내고 가장 살아있는 5개를 남기세요.",
      en: "Final reduction: remove 5 and keep the 5 most alive."
    },
    limit: 5,
    mode: "drop"
  },
  {
    id: "negative_select",
    title: { ru: "Выберите 10 теневых слов", ko: "부정 단어 10개 선택", en: "Choose 10 shadow words" },
    description: {
      ru: "Выберите 10 слов, которые вызывают сопротивление, боль, злость или отторжение.",
      ko: "저항감, 아픔, 분노, 거부감을 일으키는 단어 10개를 선택하세요.",
      en: "Choose 10 words that evoke resistance, pain, anger, or rejection."
    },
    limit: 10,
    mode: "select_negative"
  },
  {
    id: "negative_drop",
    title: { ru: "Оставьте 5 самых сильных теней", ko: "부정 단어 5개 남기기", en: "Keep 5 strongest shadows" },
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
    title: { ru: "Выберите противоположности", ko: "반대편 긍정 단어 선택", en: "Choose opposites" },
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
    title: { ru: "Выберите финальные 5 слов", ko: "최종 5개 선택", en: "Choose final 5 words" },
    description: {
      ru: "Выберите 5 слов, которые сейчас точнее всего описывают ваш внутренний компас.",
      ko: "지금 나의 내면 나침반을 가장 잘 보여주는 5개를 선택하세요.",
      en: "Choose 5 words that best describe your inner compass now."
    },
    limit: 5,
    mode: "final"
  }
];

const POSITIVE_WORDS = [
  ["love", "Любовь", "사랑", "Love", "relationship"],
  ["affection", "Нежность", "애정", "Affection", "relationship"],
  ["care", "Забота", "돌봄", "Care", "relationship"],
  ["family", "Семья", "가족", "Family", "relationship"],
  ["friendship", "Дружба", "우정", "Friendship", "relationship"],
  ["trust", "Доверие", "신뢰", "Trust", "relationship"],
  ["loyalty", "Верность", "충실함", "Loyalty", "relationship"],
  ["respect", "Уважение", "존중", "Respect", "relationship"],
  ["sincerity", "Искренность", "진심", "Sincerity", "relationship"],
  ["support", "Поддержка", "지지", "Support", "relationship"],
  ["understanding", "Понимание", "이해", "Understanding", "relationship"],
  ["empathy", "Эмпатия", "공감", "Empathy", "relationship"],
  ["closeness", "Близость", "친밀함", "Closeness", "relationship"],
  ["belonging", "Принадлежность", "소속감", "Belonging", "relationship"],
  ["cooperation", "Сотрудничество", "협력", "Cooperation", "relationship"],

  ["freedom", "Свобода", "자유", "Freedom", "freedom"],
  ["independence", "Независимость", "독립", "Independence", "freedom"],
  ["choice", "Выбор", "선택", "Choice", "freedom"],
  ["flexibility", "Гибкость", "유연성", "Flexibility", "freedom"],
  ["adventure", "Приключение", "모험", "Adventure", "freedom"],
  ["possibility", "Возможность", "가능성", "Possibility", "freedom"],
  ["openness", "Открытость", "개방성", "Openness", "freedom"],
  ["movement", "Движение", "움직임", "Movement", "freedom"],
  ["travel", "Путешествие", "여행", "Travel", "freedom"],
  ["discovery", "Открытие", "발견", "Discovery", "freedom"],

  ["self_respect", "Самоуважение", "자존감", "Self-respect", "self"],
  ["dignity", "Достоинство", "존엄", "Dignity", "self"],
  ["confidence", "Уверенность", "자신감", "Confidence", "self"],
  ["authenticity", "Подлинность", "참됨", "Authenticity", "self"],
  ["identity", "Идентичность", "정체성", "Identity", "self"],
  ["courage", "Мужество", "용기", "Courage", "self"],
  ["determination", "Решимость", "결단력", "Determination", "self"],
  ["inner_strength", "Внутренняя сила", "내면의 힘", "Inner strength", "self"],
  ["acceptance", "Принятие", "수용", "Acceptance", "self"],
  ["self_control", "Самоконтроль", "자기통제", "Self-control", "self"],

  ["growth", "Развитие", "성장", "Growth", "growth"],
  ["learning", "Обучение", "배움", "Learning", "growth"],
  ["curiosity", "Любопытство", "호기심", "Curiosity", "growth"],
  ["challenge", "Вызов", "도전", "Challenge", "growth"],
  ["dream", "Мечта", "꿈", "Dream", "growth"],
  ["purpose", "Предназначение", "사명", "Purpose", "growth"],
  ["meaning", "Смысл", "의미", "Meaning", "growth"],
  ["potential", "Потенциал", "잠재력", "Potential", "growth"],
  ["adaptability", "Адаптивность", "적응력", "Adaptability", "growth"],
  ["vision", "Видение", "비전", "Vision", "growth"],

  ["creativity", "Творчество", "창의성", "Creativity", "creation"],
  ["imagination", "Воображение", "상상력", "Imagination", "creation"],
  ["beauty", "Красота", "아름다움", "Beauty", "creation"],
  ["expression", "Самовыражение", "자기표현", "Self-expression", "creation"],
  ["inspiration", "Вдохновение", "영감", "Inspiration", "creation"],
  ["originality", "Оригинальность", "독창성", "Originality", "creation"],
  ["innovation", "Новаторство", "혁신", "Innovation", "creation"],
  ["playfulness", "Игривость", "유희", "Playfulness", "creation"],
  ["humor", "Юмор", "유머", "Humor", "creation"],
  ["art", "Искусство", "예술", "Art", "creation"],

  ["success", "Успех", "성공", "Success", "achievement"],
  ["achievement", "Достижение", "성취", "Achievement", "achievement"],
  ["recognition", "Признание", "인정", "Recognition", "achievement"],
  ["competence", "Компетентность", "능력", "Competence", "achievement"],
  ["mastery", "Мастерство", "숙련", "Mastery", "achievement"],
  ["discipline", "Дисциплина", "절제", "Discipline", "achievement"],
  ["focus", "Сосредоточенность", "집중", "Focus", "achievement"],
  ["perseverance", "Настойчивость", "끈기", "Perseverance", "achievement"],
  ["willpower", "Сила воли", "의지", "Willpower", "achievement"],
  ["leadership", "Лидерство", "리더십", "Leadership", "achievement"],

  ["stability", "Стабильность", "안정", "Stability", "stability"],
  ["safety", "Безопасность", "안전", "Safety", "stability"],
  ["home", "Дом", "집", "Home", "stability"],
  ["comfort", "Уют", "안락함", "Comfort", "stability"],
  ["balance", "Баланс", "균형", "Balance", "stability"],
  ["order", "Порядок", "질서", "Order", "stability"],
  ["peace", "Спокойствие", "평온", "Peace", "stability"],
  ["rest", "Отдых", "휴식", "Rest", "stability"],
  ["health", "Здоровье", "건강", "Health", "stability"],
  ["resilience", "Устойчивость", "회복탄력성", "Resilience", "stability"],

  ["justice", "Справедливость", "정의", "Justice", "justice"],
  ["fairness", "Честность правил", "공정함", "Fairness", "justice"],
  ["equality", "Равенство", "평등", "Equality", "justice"],
  ["responsibility", "Ответственность", "책임", "Responsibility", "justice"],
  ["conscience", "Совесть", "양심", "Conscience", "justice"],
  ["integrity", "Цельность", "올곧음", "Integrity", "justice"],
  ["truth", "Правда", "진실", "Truth", "justice"],
  ["solidarity", "Солидарность", "연대", "Solidarity", "justice"],
  ["mercy", "Милосердие", "자비", "Mercy", "justice"],
  ["honesty", "Честность", "정직", "Honesty", "justice"],

  ["wisdom", "Мудрость", "지혜", "Wisdom", "wisdom"],
  ["insight", "Проницательность", "통찰", "Insight", "wisdom"],
  ["knowledge", "Знание", "지식", "Knowledge", "wisdom"],
  ["reflection", "Размышление", "성찰", "Reflection", "wisdom"],
  ["reason", "Разум", "이성", "Reason", "wisdom"],
  ["discernment", "Рассудительность", "분별력", "Discernment", "wisdom"],
  ["patience", "Терпение", "인내", "Patience", "wisdom"],
  ["depth", "Глубина", "깊이", "Depth", "wisdom"],
  ["mindfulness", "Осознанность", "알아차림", "Mindfulness", "wisdom"],
  ["faith", "Вера", "믿음", "Faith", "wisdom"],

  ["happiness", "Счастье", "행복", "Happiness", "emotion"],
  ["joy", "Радость", "기쁨", "Joy", "emotion"],
  ["fun", "Веселье", "재미", "Fun", "emotion"],
  ["hope", "Надежда", "희망", "Hope", "emotion"],
  ["warmth", "Тепло", "따뜻함", "Warmth", "emotion"],
  ["lightness", "Лёгкость", "가벼움", "Lightness", "emotion"],
  ["passion", "Страсть", "열정", "Passion", "emotion"],
  ["delight", "Восторг", "환희", "Delight", "emotion"],
  ["tenderness", "Ласка", "다정함", "Tenderness", "emotion"],
  ["gratitude", "Благодарность", "감사", "Gratitude", "emotion"],

  ["nature", "Природа", "자연", "Nature", "nature"],
  ["harmony", "Гармония", "조화", "Harmony", "nature"],
  ["silence", "Тишина", "고요", "Silence", "nature"],
  ["simplicity", "Простота", "단순함", "Simplicity", "nature"],
  ["purity", "Чистота", "순수함", "Purity", "nature"],
  ["freshness", "Свежесть", "신선함", "Freshness", "nature"],
  ["vitality", "Жизненная сила", "생명력", "Vitality", "nature"],
  ["energy", "Энергия", "에너지", "Energy", "nature"],
  ["space", "Пространство", "공간", "Space", "nature"],
  ["light", "Свет", "빛", "Light", "nature"],

  ["minimalism", "Минимализм", "미니멀리즘", "Minimalism", "lifestyle"],
  ["freedom_of_time", "Свобода времени", "시간의 자유", "Freedom of time", "lifestyle"],
  ["slow_life", "Медленная жизнь", "느린 삶", "Slow life", "lifestyle"],
  ["richness", "Насыщенность", "충만함", "Richness", "lifestyle"],
  ["privacy", "Личное пространство", "개인 공간", "Privacy", "lifestyle"],
  ["ritual", "Ритуал", "의식", "Ritual", "lifestyle"],
  ["taste", "Вкус", "취향", "Taste", "lifestyle"],
  ["elegance", "Элегантность", "우아함", "Elegance", "lifestyle"],
  ["moderation", "Умеренность", "절도", "Moderation", "lifestyle"],
  ["abundance", "Изобилие", "풍요", "Abundance", "lifestyle"]
].map(([id, ru, ko, en, category]) => ({
  id,
  text: { ru, ko, en },
  category
}));

const NEGATIVE_WORDS = [
  ["self_deprecation", "Самоунижение", "자기비하", "Self-deprecation"],
  ["hypocrisy", "Лицемерие", "위선", "Hypocrisy"],
  ["discrimination", "Дискриминация", "차별", "Discrimination"],
  ["injustice", "Несправедливость", "불의", "Injustice"],
  ["laziness", "Лень", "나태함", "Laziness"],
  ["corruption", "Коррупция", "부패", "Corruption"],
  ["negativity", "Негативность", "부정성", "Negativity"],
  ["foolishness", "Глупость", "어리석음", "Foolishness"],
  ["betrayal", "Предательство", "배신", "Betrayal"],
  ["stereotype", "Стереотипность", "고정관념", "Stereotype"],
  ["fear", "Страх", "두려움", "Fear"],
  ["shame", "Стыд", "수치심", "Shame"],
  ["guilt", "Вина", "죄책감", "Guilt"],
  ["control", "Контроль", "통제", "Control"],
  ["chaos", "Хаос", "혼란", "Chaos"],
  ["emptiness", "Пустота", "공허", "Emptiness"],
  ["loneliness", "Одиночество", "외로움", "Loneliness"],
  ["rejection", "Отвержение", "거절", "Rejection"],
  ["envy", "Зависть", "질투", "Envy"],
  ["anger", "Злость", "분노", "Anger"],
  ["apathy", "Апатия", "무기력", "Apathy"],
  ["helplessness", "Беспомощность", "무력감", "Helplessness"],
  ["rigidity", "Жёсткость", "경직성", "Rigidity"],
  ["dishonesty", "Нечестность", "부정직", "Dishonesty"],
  ["meaninglessness", "Бессмысленность", "무의미", "Meaninglessness"],
  ["instability", "Нестабильность", "불안정", "Instability"],
  ["dependence", "Зависимость", "의존", "Dependence"],
  ["violence", "Насилие", "폭력", "Violence"],
  ["cruelty", "Жестокость", "잔인함", "Cruelty"],
  ["indifference", "Равнодушие", "무관심", "Indifference"]
].map(([id, ru, ko, en]) => ({
  id,
  text: { ru, ko, en },
  category: "shadow"
}));

const OPPOSITE_MAP = {
  self_deprecation: ["self_respect", "dignity", "confidence", "acceptance"],
  hypocrisy: ["authenticity", "sincerity", "honesty", "integrity"],
  discrimination: ["equality", "respect", "justice", "openness"],
  injustice: ["justice", "fairness", "conscience", "integrity"],
  laziness: ["discipline", "willpower", "focus", "perseverance"],
  corruption: ["honesty", "truth", "integrity", "responsibility"],
  negativity: ["hope", "gratitude", "joy", "lightness"],
  foolishness: ["wisdom", "discernment", "reflection", "reason"],
  betrayal: ["trust", "loyalty", "sincerity", "devotion"],
  stereotype: ["flexibility", "openness", "curiosity", "freedom"],
  fear: ["courage", "confidence", "inner_strength", "trust"],
  shame: ["acceptance", "dignity", "self_respect", "warmth"],
  guilt: ["forgiveness", "acceptance", "responsibility", "mercy"],
  control: ["freedom", "trust", "flexibility", "choice"],
  chaos: ["order", "balance", "stability", "peace"],
  emptiness: ["meaning", "purpose", "love", "richness"],
  loneliness: ["belonging", "friendship", "closeness", "support"],
  rejection: ["acceptance", "love", "respect", "belonging"],
  envy: ["gratitude", "self_respect", "abundance", "joy"],
  anger: ["peace", "patience", "understanding", "balance"],
  apathy: ["passion", "energy", "purpose", "curiosity"],
  helplessness: ["inner_strength", "confidence", "choice", "resilience"],
  rigidity: ["flexibility", "adaptability", "openness", "playfulness"],
  dishonesty: ["honesty", "truth", "sincerity", "integrity"],
  meaninglessness: ["meaning", "purpose", "dream", "calling"],
  instability: ["stability", "safety", "home", "balance"],
  dependence: ["independence", "self_reliance", "freedom", "confidence"],
  violence: ["peace", "respect", "care", "mercy"],
  cruelty: ["kindness", "empathy", "mercy", "care"],
  indifference: ["care", "empathy", "love", "responsibility"]
};

const PROMPT_MODES = {
  reflection: {
    ru: "Тёплый, бережный и глубокий стиль саморефлексии.",
    ko: "따뜻하고 섬세한 자기 성찰 중심 분석.",
    en: "Warm, gentle, and reflective analysis."
  },
  psychology: {
    ru: "Осторожный психологический анализ мотивов, конфликтов и паттернов.",
    ko: "동기, 갈등, 패턴 중심의 신중한 심리 분석.",
    en: "Careful psychological analysis of motives, conflicts, and patterns."
  },
  relationship: {
    ru: "Анализ через близость, границы, доверие и отношения.",
    ko: "친밀감, 경계, 신뢰, 관계 중심 분석.",
    en: "Analysis through closeness, boundaries, trust, and relationships."
  },
  career: {
    ru: "Анализ через работу, роль, сильные стороны и среду.",
    ko: "일, 역할, 강점, 환경 중심 분석.",
    en: "Analysis through work, roles, strengths, and environment."
  },
  literary: {
    ru: "Поэтичная интерпретация как история внутреннего пути.",
    ko: "내면 여정의 이야기처럼 문학적이고 시적인 해석.",
    en: "Poetic interpretation as a story of the inner journey."
  }
};

const getWordText = (word, lang = UI_LANG) => word?.text?.[lang] || word?.text?.ru || "";
const getPositiveById = (id) => POSITIVE_WORDS.find((word) => word.id === id);
const getNegativeById = (id) => NEGATIVE_WORDS.find((word) => word.id === id);
