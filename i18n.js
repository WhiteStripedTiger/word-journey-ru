/* ==========================================================
   Inner Compass
   i18n.js
   UI text dictionary
========================================================== */

let UI_LANG = localStorage.getItem("innerCompassLanguage") || "ru";

const LANGUAGES = {
  ru: "Русский",
  ko: "한국어",
  en: "English"
};

const TEXT = {
  ru: {
    appName: "Внутренний Компас",
    languageTitle: "Выберите язык",
    languageDescription: "Вы сможете изменить язык позже на экране результата.",

    introTitle: "Пять слов, которые сейчас ведут вас",
    introDescription:
      "Пройдите путь выбора слов: притяжение, отбор, тень, противоположность и финальный внутренний компас.",
    introNotice1: "Важно: это не психологический тест и не диагноз.",
    introNotice2: "Это упражнение для саморефлексии и бережного разговора с собой.",
    startButton: "Начать путешествие",

    resetButton: "Сначала",
    backButton: "Назад",
    nextButton: "Далее",

    flowPositive: "Притяжение",
    flowNegative: "Тень",
    flowOpposite: "Противоположность",
    flowFinal: "Финал",

    oppositePanelTitle: "Выберите противоположное слово",

    resultEyebrow: "Результат",
    resultTitle: "Ваши пять слов",

    summaryTitle: "Краткое резюме пути",
    totalTimeLabel: "Общее время",
    slowestStageLabel: "Самый долгий этап",
    mostToggledStageLabel: "Больше всего колебаний",

    analysisModeTitle: "Режим AI-анализа",
    analysisModeDescription:
      "Выберите стиль интерпретации. Данные останутся теми же, изменится только способ анализа.",

    modeReflectionTitle: "🌿 Рефлексия",
    modeReflectionDescription: "Тёплый и бережный разбор",
    modePsychologyTitle: "🧠 Психология",
    modePsychologyDescription: "Мотивы, конфликты, паттерны",
    modeRelationshipTitle: "❤️ Отношения",
    modeRelationshipDescription: "Близость, границы, связь",
    modeCareerTitle: "💼 Карьера",
    modeCareerDescription: "Работа, роль, сильные стороны",
    modeLiteraryTitle: "✍️ Литературно",
    modeLiteraryDescription: "Поэтичная история человека",

    promptTitle: "Промпт для анализа",
    promptDescription:
      "Скопируйте этот текст и отправьте его ChatGPT или другой AI-системе.",
    copyPromptButton: "Скопировать промпт",

    jsonTitle: "Данные путешествия JSON",
    jsonDescription:
      "Эти данные включают итоговые слова, этапы, время, переключения и путь выбора.",
    copyJsonButton: "Скопировать JSON",

    timelineTitle: "Decision Timeline",
    timelineDescription:
      "Хронология выбора слов. Полезно для более глубокого анализа и отладки.",

    developerTitle: "Developer Data",
    developerDescription:
      "Техническая аналитика: счётчики, стадии, категории и служебные данные.",

    copyAllButton: "Скопировать всё",
    restartButton: "Пройти заново",

    disclaimer:
      "Интерпретация по этим данным предназначена только для саморефлексии. Она не является диагнозом и не заменяет помощь специалиста.",

    step: "Шаг",
    selectCount: "выбрано"
  },

  ko: {
    appName: "내면 나침반",
    languageTitle: "언어를 선택하세요",
    languageDescription: "결과 화면에서도 언어를 다시 바꿀 수 있어요.",

    introTitle: "지금 당신을 이끄는 다섯 단어",
    introDescription:
      "끌림, 덜어냄, 그림자, 반대편 선택, 최종 선택의 과정을 통해 나의 내면 나침반을 찾아갑니다.",
    introNotice1: "중요: 이건 심리검사나 진단이 아닙니다.",
    introNotice2: "나 자신과 조심스럽게 대화하기 위한 자기 성찰 도구입니다.",
    startButton: "여정 시작하기",

    resetButton: "처음부터",
    backButton: "뒤로",
    nextButton: "다음",

    flowPositive: "끌림",
    flowNegative: "그림자",
    flowOpposite: "반대편",
    flowFinal: "최종",

    oppositePanelTitle: "반대편 긍정 단어를 선택하세요",

    resultEyebrow: "결과",
    resultTitle: "당신의 다섯 단어",

    summaryTitle: "여정 요약",
    totalTimeLabel: "총 소요 시간",
    slowestStageLabel: "가장 오래 걸린 단계",
    mostToggledStageLabel: "가장 많이 망설인 단계",

    analysisModeTitle: "AI 분석 모드",
    analysisModeDescription:
      "해석 스타일을 선택하세요. 데이터는 같고 분석 방식만 달라집니다.",

    modeReflectionTitle: "🌿 성찰",
    modeReflectionDescription: "따뜻하고 섬세한 해석",
    modePsychologyTitle: "🧠 심리",
    modePsychologyDescription: "동기, 갈등, 패턴 중심",
    modeRelationshipTitle: "❤️ 관계",
    modeRelationshipDescription: "친밀감, 경계, 연결",
    modeCareerTitle: "💼 커리어",
    modeCareerDescription: "일, 역할, 강점",
    modeLiteraryTitle: "✍️ 문학",
    modeLiteraryDescription: "시적인 내면 이야기",

    promptTitle: "분석용 프롬프트",
    promptDescription:
      "이 텍스트를 복사해 ChatGPT나 다른 AI에게 보내면 깊이 있는 해석을 받을 수 있습니다.",
    copyPromptButton: "프롬프트 복사",

    jsonTitle: "여정 데이터 JSON",
    jsonDescription:
      "최종 단어, 단계, 시간, 토글 횟수, 선택 과정을 포함한 데이터입니다.",
    copyJsonButton: "JSON 복사",

    timelineTitle: "의사결정 타임라인",
    timelineDescription:
      "단어 선택의 흐름입니다. 더 깊은 분석과 디버깅에 사용할 수 있습니다.",

    developerTitle: "개발자 데이터",
    developerDescription:
      "카운터, 단계, 카테고리 등 기술 분석 데이터입니다.",

    copyAllButton: "전체 복사",
    restartButton: "다시 하기",

    disclaimer:
      "이 데이터 기반 해석은 자기 성찰을 위한 참고 자료입니다. 진단이 아니며 전문가의 도움을 대체하지 않습니다.",

    step: "단계",
    selectCount: "선택됨"
  },

  en: {
    appName: "Inner Compass",
    languageTitle: "Choose your language",
    languageDescription: "You can change the language again on the result screen.",

    introTitle: "Five words that guide you now",
    introDescription:
      "Move through attraction, reduction, shadow, opposites, and final choice to discover your inner compass.",
    introNotice1: "Important: this is not a psychological test or diagnosis.",
    introNotice2: "It is a self-reflection tool for a gentle conversation with yourself.",
    startButton: "Start journey",

    resetButton: "Start over",
    backButton: "Back",
    nextButton: "Next",

    flowPositive: "Attraction",
    flowNegative: "Shadow",
    flowOpposite: "Opposite",
    flowFinal: "Final",

    oppositePanelTitle: "Choose the opposite positive word",

    resultEyebrow: "Result",
    resultTitle: "Your five words",

    summaryTitle: "Journey summary",
    totalTimeLabel: "Total time",
    slowestStageLabel: "Slowest stage",
    mostToggledStageLabel: "Most hesitation",

    analysisModeTitle: "AI analysis mode",
    analysisModeDescription:
      "Choose the style of interpretation. The data stays the same; only the analysis style changes.",

    modeReflectionTitle: "🌿 Reflection",
    modeReflectionDescription: "Warm and gentle interpretation",
    modePsychologyTitle: "🧠 Psychology",
    modePsychologyDescription: "Motives, conflicts, patterns",
    modeRelationshipTitle: "❤️ Relationships",
    modeRelationshipDescription: "Closeness, boundaries, connection",
    modeCareerTitle: "💼 Career",
    modeCareerDescription: "Work, role, strengths",
    modeLiteraryTitle: "✍️ Literary",
    modeLiteraryDescription: "A poetic inner story",

    promptTitle: "Analysis prompt",
    promptDescription:
      "Copy this text and send it to ChatGPT or another AI system.",
    copyPromptButton: "Copy prompt",

    jsonTitle: "Journey data JSON",
    jsonDescription:
      "This data includes final words, stages, time, toggles, and decision path.",
    copyJsonButton: "Copy JSON",

    timelineTitle: "Decision Timeline",
    timelineDescription:
      "The chronology of word choices. Useful for deeper analysis and debugging.",

    developerTitle: "Developer Data",
    developerDescription:
      "Technical analytics: counters, stages, categories, and system data.",

    copyAllButton: "Copy all",
    restartButton: "Restart",

    disclaimer:
      "Interpretation based on this data is for self-reflection only. It is not a diagnosis and does not replace professional help.",

    step: "Step",
    selectCount: "selected"
  }
};

function t(key) {
  return TEXT[UI_LANG]?.[key] || TEXT.ru[key] || key;
}

function setLanguage(lang) {
  if (!TEXT[lang]) return;
  UI_LANG = lang;
  localStorage.setItem("innerCompassLanguage", lang);
  document.documentElement.lang = lang;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  const languageSelect = document.getElementById("languageSelect");
  const resultLanguageSelect = document.getElementById("resultLanguageSelect");

  if (languageSelect) languageSelect.value = UI_LANG;
  if (resultLanguageSelect) resultLanguageSelect.value = UI_LANG;
}
