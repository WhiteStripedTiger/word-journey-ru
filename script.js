/* ==========================================================
   Inner Compass
   script.js Final v3
   5-file structure
========================================================== */

let currentStageIndex = 0;
let selectedMode = "reflection";
let timerInterval = null;

const $ = (id) => document.getElementById(id);

const screens = {
  language: $("languageScreen"),
  intro: $("introScreen"),
  journey: $("journeyScreen"),
  result: $("resultScreen")
};

const state = {
  session: {
    id: crypto.randomUUID(),
    language: UI_LANG,
    started_at: null,
    started_at_ms: null,
    finished_at: null,
    finished_at_ms: null,
    total_duration_ms: 0,
    app_version: APP.version
  },
  selections: {
    positive_selected_20: [],
    dropped_positive: {
      step1: [],
      step2: [],
      step3: []
    },
    positive_core_5: [],
    negative_selected_10: [],
    dropped_negative: [],
    negative_core_5: [],
    opposite_choices: [],
    final_positive_5: []
  },
  stageData: {},
  timeline: []
};

function now() {
  return Date.now();
}

function elapsed() {
  if (!state.session.started_at_ms) return 0;
  return now() - state.session.started_at_ms;
}

function formatTime(ms) {
  if (ms === null || ms === undefined || Number.isNaN(ms)) return "—";
  const sec = Math.floor(ms / 1000);
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function getStage() {
  return STAGES[currentStageIndex];
}

function stageName(id) {
  return STAGES.find((stage) => stage.id === id)?.title?.[UI_LANG] || id;
}

function getAnyWordById(id) {
  return getPositiveById(id) || getNegativeById(id);
}

function wordTextById(id) {
  return getWordText(getAnyWordById(id));
}

function idsToTexts(ids) {
  return ids.map(wordTextById);
}

function initStageData(stageId) {
  if (!state.stageData[stageId]) {
    state.stageData[stageId] = {
      stage: stageId,
      started_at_ms: elapsed(),
      duration_ms: 0,
      total_toggles: 0,
      back_count: 0
    };
  }
}

function finishStageData(stageId) {
  const data = state.stageData[stageId];
  if (!data) return;
  data.duration_ms = elapsed() - data.started_at_ms;
}

function logAction(action, wordId, stageId) {
  state.timeline.push({
    time_ms: elapsed(),
    time: formatTime(elapsed()),
    action,
    word_id: wordId,
    stage: stageId
  });
}

function toggleId(list, id) {
  const index = list.indexOf(id);

  if (index >= 0) {
    list.splice(index, 1);
    return false;
  }

  list.push(id);
  return true;
}

function getCurrentSelectionList() {
  const stage = getStage();

  if (stage.id === "positive_select") return state.selections.positive_selected_20;
  if (stage.id === "positive_drop_1") return state.selections.dropped_positive.step1;
  if (stage.id === "positive_drop_2") return state.selections.dropped_positive.step2;
  if (stage.id === "positive_drop_3") return state.selections.dropped_positive.step3;
  if (stage.id === "negative_select") return state.selections.negative_selected_10;
  if (stage.id === "negative_drop") return state.selections.dropped_negative;
  if (stage.id === "final_select") return state.selections.final_positive_5;

  return [];
}

function positiveIdsToWords(ids) {
  return ids.map(getPositiveById).filter(Boolean);
}

function negativeIdsToWords(ids) {
  return ids.map(getNegativeById).filter(Boolean);
}

function getWordsForStage() {
  const stage = getStage();

  if (stage.id === "positive_select") return POSITIVE_WORDS;

  if (stage.id === "positive_drop_1") {
    return positiveIdsToWords(state.selections.positive_selected_20);
  }

  if (stage.id === "positive_drop_2") {
    const ids = state.selections.positive_selected_20.filter(
      (id) => !state.selections.dropped_positive.step1.includes(id)
    );
    return positiveIdsToWords(ids);
  }

  if (stage.id === "positive_drop_3") {
    const ids = state.selections.positive_selected_20.filter(
      (id) =>
        !state.selections.dropped_positive.step1.includes(id) &&
        !state.selections.dropped_positive.step2.includes(id)
    );
    return positiveIdsToWords(ids);
  }

  if (stage.id === "negative_select") return NEGATIVE_WORDS;

  if (stage.id === "negative_drop") {
    return negativeIdsToWords(state.selections.negative_selected_10);
  }

  if (stage.id === "final_select") {
    const oppositeIds = state.selections.opposite_choices.map(
      (choice) => choice.chosen_opposite_id
    );

    const ids = [...state.selections.positive_core_5, ...oppositeIds];
    return positiveIdsToWords(ids);
  }

  return [];
}

function updateFlowTabs() {
  const stageId = getStage().id;

  $("flowPositive").classList.toggle("active", stageId.startsWith("positive"));
  $("flowNegative").classList.toggle("active", stageId.startsWith("negative"));
  $("flowOpposite").classList.toggle("active", stageId === "opposite_select");
  $("flowFinal").classList.toggle("active", stageId === "final_select");
}

function renderStage() {
  const stage = getStage();
  initStageData(stage.id);

  $("stageLabel").textContent = `${t("step")} ${currentStageIndex + 1} / ${STAGES.length}`;
  $("stageTitle").textContent = stage.title[UI_LANG];
  $("stageDescription").textContent = stage.description[UI_LANG];
  $("progressBar").style.width = `${((currentStageIndex + 1) / STAGES.length) * 100}%`;

  updateFlowTabs();

  if (stage.id === "opposite_select") {
    renderOppositeStage();
  } else {
    $("oppositePanel").classList.add("hidden");
    renderWordGrid();
  }

  updateButtons();
}

function renderWordGrid() {
  const stage = getStage();
  const words = getWordsForStage();
  const selectedIds = getCurrentSelectionList();

  $("wordGrid").innerHTML = "";

  words.forEach((word) => {
    const button = document.createElement("button");
    button.className = "word-chip";
    button.textContent = getWordText(word);

    if (stage.mode.includes("negative")) {
      button.classList.add("negative");
    }

    if (selectedIds.includes(word.id)) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      const list = getCurrentSelectionList();
      const alreadySelected = list.includes(word.id);

      if (!alreadySelected && list.length >= stage.limit) return;

      const added = toggleId(list, word.id);
      state.stageData[stage.id].total_toggles += 1;
      logAction(added ? "select" : "remove", word.id, stage.id);

      renderStage();
    });

    $("wordGrid").appendChild(button);
  });
}

function renderOppositeStage() {
  $("wordGrid").innerHTML = "";
  $("oppositePanel").classList.remove("hidden");

  const negativeIds = state.selections.negative_core_5;
  const currentIndex = state.selections.opposite_choices.length;
  const currentNegativeId = negativeIds[currentIndex];

  if (!currentNegativeId) {
    updateButtons();
    return;
  }

  $("currentNegativeWord").textContent = wordTextById(currentNegativeId);
  $("oppositeOptions").innerHTML = "";

  const candidateIds = OPPOSITE_MAP[currentNegativeId] || [];

  candidateIds.forEach((positiveId) => {
    const word = getPositiveById(positiveId);
    if (!word) return;

    const button = document.createElement("button");
    button.className = "opposite-option";
    button.textContent = getWordText(word);

    button.addEventListener("click", () => {
      state.selections.opposite_choices.push({
        negative_id: currentNegativeId,
        chosen_opposite_id: positiveId
      });

      state.stageData.opposite_select.total_toggles += 1;
      logAction("choose_opposite", positiveId, "opposite_select");

      renderStage();
    });

    $("oppositeOptions").appendChild(button);
  });
}

function updateButtons() {
  const stage = getStage();
  const selected = getCurrentSelectionList();

  if (stage.id === "opposite_select") {
    $("selectionCounter").textContent = `${state.selections.opposite_choices.length} / 5`;
    $("nextBtn").disabled = state.selections.opposite_choices.length !== 5;
    return;
  }

  $("selectionCounter").textContent = `${selected.length} / ${stage.limit}`;
  $("nextBtn").disabled = selected.length !== stage.limit;
}

function calculateCores() {
  const droppedPositive = [
    ...state.selections.dropped_positive.step1,
    ...state.selections.dropped_positive.step2,
    ...state.selections.dropped_positive.step3
  ];

  state.selections.positive_core_5 = state.selections.positive_selected_20.filter(
    (id) => !droppedPositive.includes(id)
  );

  state.selections.negative_core_5 = state.selections.negative_selected_10.filter(
    (id) => !state.selections.dropped_negative.includes(id)
  );
}

function nextStage() {
  const stage = getStage();
  finishStageData(stage.id);
  calculateCores();

  if (currentStageIndex < STAGES.length - 1) {
    currentStageIndex += 1;
    renderStage();
  } else {
    finishJourney();
  }
}

function prevStage() {
  if (currentStageIndex === 0) return;

  const current = getStage();
  state.stageData[current.id].back_count += 1;

  currentStageIndex -= 1;
  renderStage();
}

function startJourney() {
  state.session.language = UI_LANG;
  state.session.started_at_ms = now();
  state.session.started_at = new Date(state.session.started_at_ms).toISOString();

  timerInterval = setInterval(() => {
    $("timerText").textContent = formatTime(elapsed());
  }, 500);

  showScreen("journey");
  renderStage();
}

function finishJourney() {
  clearInterval(timerInterval);

  state.session.finished_at_ms = now();
  state.session.finished_at = new Date(state.session.finished_at_ms).toISOString();
  state.session.total_duration_ms =
    state.session.finished_at_ms - state.session.started_at_ms;

  calculateCores();

  showResult();
  showScreen("result");
}

function localizeOppositeChoices() {
  return state.selections.opposite_choices.map((choice) => ({
    negative_id: choice.negative_id,
    negative: wordTextById(choice.negative_id),
    chosen_opposite_id: choice.chosen_opposite_id,
    chosen_opposite: wordTextById(choice.chosen_opposite_id)
  }));
}

function localizeTimeline() {
  return state.timeline.map((item) => ({
    time_ms: item.time_ms,
    time: item.time,
    action: item.action,
    word_id: item.word_id,
    word: wordTextById(item.word_id),
    stage: item.stage
  }));
}

function getJourneyData() {
  return {
    language: UI_LANG,
    final_positive_5_ids: state.selections.final_positive_5,
    final_positive_5: idsToTexts(state.selections.final_positive_5),

    journey: {
      positive_selected_20_ids: state.selections.positive_selected_20,
      positive_selected_20: idsToTexts(state.selections.positive_selected_20),

      dropped_positive_ids: {
        step1: state.selections.dropped_positive.step1,
        step2: state.selections.dropped_positive.step2,
        step3: state.selections.dropped_positive.step3
      },
      dropped_positive: {
        step1: idsToTexts(state.selections.dropped_positive.step1),
        step2: idsToTexts(state.selections.dropped_positive.step2),
        step3: idsToTexts(state.selections.dropped_positive.step3)
      },

      positive_core_5_ids: state.selections.positive_core_5,
      positive_core_5: idsToTexts(state.selections.positive_core_5),

      negative_selected_10_ids: state.selections.negative_selected_10,
      negative_selected_10: idsToTexts(state.selections.negative_selected_10),

      dropped_negative_ids: state.selections.dropped_negative,
      dropped_negative: idsToTexts(state.selections.dropped_negative),

      negative_core_5_ids: state.selections.negative_core_5,
      negative_core_5: idsToTexts(state.selections.negative_core_5),

      opposite_choices: localizeOppositeChoices(),
      opposite_choice_ids: state.selections.opposite_choices,

      timeline: localizeTimeline()
    },

    stage_summaries: Object.values(state.stageData),
    session: {
      ...state.session,
      language: UI_LANG
    }
  };
}

function getSlowestStage() {
  return [...Object.values(state.stageData)].sort(
    (a, b) => b.duration_ms - a.duration_ms
  )[0];
}

function getMostToggledStage() {
  return [...Object.values(state.stageData)].sort(
    (a, b) => b.total_toggles - a.total_toggles
  )[0];
}

function buildPromptRu(data, slowest, toggled) {
  return `Вы — глубокий и бережный аналитик внутреннего пути человека.

Ниже приведены данные человека, который проходил упражнение «Внутренний Компас».

Стиль анализа: ${PROMPT_MODES[selectedMode].ru}

Самый долгий этап: «${stageName(slowest.stage)}» (${Math.round(slowest.duration_ms / 1000)} сек).
Этап с наибольшим числом переключений: «${stageName(toggled.stage)}» (${toggled.total_toggles} переключений).

Важно:
- Не делайте медицинских диагнозов.
- Не утверждайте выводы как абсолютную истину.
- Время выбора и количество переключений используйте только как мягкие подсказки.
- Пишите тепло, конкретно и так, чтобы человек мог узнать в тексте свою историю.

--- DATA ---
${JSON.stringify(data, null, 2)}
--- END DATA ---

Проанализируйте:

1. 【Название жизни】
Сформулируйте одну поэтичную фразу, которая передаёт направление жизни этого человека.

2. 【Ценности уверенности vs ценности стремления】
positive_core_5 — это ценности, которые уже укоренены внутри.
opposite_choices — это слова, которые могут показывать актуальное стремление.
Объясните разницу между ними.

3. 【Внутренняя задача】
negative_core_5 — это тени, с которыми человек хочет встретиться.
Объясните, что они могут значить и как связаны с выбранными противоположностями.

4. 【Я в трёх сценах】
Опишите человека: когда он один, когда он с друзьями, и когда он в работе или роли.
В каждой сцене добавьте одну фразу в кавычках, которую он мог бы подумать или сказать.

5. 【На что стоит обратить внимание】
Честно, но бережно опишите возможные ловушки, способы самоистощения и то, что стоит тренировать для роста.

6. 【Слова этому человеку】
Завершите анализ одним тёплым, искренним абзацем, обращённым напрямую к человеку.`;
}

function buildPromptKo(data, slowest, toggled) {
  return `당신은 한 사람의 내면 여정 데이터를 분석하는 깊이 있는 심리 통찰가입니다.

아래는 이 사람이 단어를 선택하고, 덜어내고, 그림자 단어를 마주하고, 반대편 단어를 고른 뒤 최종 다섯 단어를 완성한 데이터입니다.

분석 스타일: ${PROMPT_MODES[selectedMode].ko}

가장 오래 걸린 단계는 "${stageName(slowest.stage)}" (${Math.round(slowest.duration_ms / 1000)}초)입니다.
가장 많이 망설인 단계는 "${stageName(toggled.stage)}" (${toggled.total_toggles}회 토글)입니다.

주의:
- 의학적 진단을 하지 마세요.
- 단정하지 말고 가능성의 언어로 해석하세요.
- 시간과 토글 수는 참고 정보로만 사용하세요.
- 이 사람이 자신의 이야기처럼 느낄 수 있도록 구체적이고 따뜻하게 써주세요.

--- DATA ---
${JSON.stringify(data, null, 2)}
--- END DATA ---

위 데이터를 바탕으로 아래 여섯 가지를 분석해주세요.

1. 【인생 타이틀】
이 사람의 삶을 한 문장으로 압축한 시적이고 울림 있는 타이틀을 제시해주세요.

2. 【확신의 가치 vs 열망의 가치】
positive_core_5는 이미 이 사람 안에 뿌리내린 확신입니다.
opposite_choices는 지금 이 사람이 가장 원하는 열망일 수 있습니다.
이 둘의 차이와 의미를 풀어주세요.

3. 【내면의 과제】
negative_core_5는 이 사람이 가장 직면하고 싶은 그림자입니다.
그 단어들이 삶에서 어떤 의미를 가질지, 반대편 긍정어와 어떻게 연결되는지 설명해주세요.

4. 【세 가지 장면 속의 나】
혼자 있을 때, 친구들과 함께 있을 때, 직장이나 역할 속에 있을 때의 모습을 풍부하게 묘사해주세요.
각 장면마다 실제로 할 법한 말이나 생각을 큰따옴표 안에 한 문장씩 포함해주세요.

5. 【이 사람이 주의해야 할 점】
좋은 말만 하지 말고, 진짜 친한 친구가 조심스럽게 건네는 말처럼 따뜻하지만 직접적으로 써주세요.

6. 【이 사람에게 건네는 말】
분석을 마치고 이 사람에게 직접 말을 건네듯 따뜻하고 진심 어린 한 문단을 써주세요.`;
}

function buildPromptEn(data, slowest, toggled) {
  return `You are a deep and gentle analyst of a person's inner journey.

Below is data from a person who completed the Inner Compass exercise: choosing words, removing words, facing shadow words, selecting opposites, and choosing five final words.

Analysis style: ${PROMPT_MODES[selectedMode].en}

The slowest stage was "${stageName(slowest.stage)}" (${Math.round(slowest.duration_ms / 1000)} seconds).
The stage with the most toggles was "${stageName(toggled.stage)}" (${toggled.total_toggles} toggles).

Important:
- Do not make medical diagnoses.
- Do not present conclusions as absolute truth.
- Use time and toggle counts only as gentle clues.
- Write warmly, concretely, and personally.

--- DATA ---
${JSON.stringify(data, null, 2)}
--- END DATA ---

Please analyze:

1. 【Life Title】
Create one poetic sentence that captures this person's direction in life.

2. 【Values of certainty vs values of longing】
positive_core_5 may represent values already rooted within them.
opposite_choices may represent current longings.
Explain the difference and meaning.

3. 【Inner Task】
negative_core_5 represents shadows this person wants to face.
Explain what they may mean and how they connect to the chosen opposites.

4. 【Me in Three Scenes】
Describe this person when alone, with friends, and in work or role.
Include one sentence in quotation marks for each scene.

5. 【What This Person Should Watch Out For】
Be honest but gentle, like a close friend speaking carefully.

6. 【Words to This Person】
End with one warm, sincere paragraph addressed directly to this person.`;
}

function buildPrompt() {
  const data = getJourneyData();
  const slowest = getSlowestStage();
  const toggled = getMostToggledStage();

  if (UI_LANG === "ko") return buildPromptKo(data, slowest, toggled);
  if (UI_LANG === "en") return buildPromptEn(data, slowest, toggled);
  return buildPromptRu(data, slowest, toggled);
}

function showResult() {
  $("finalWords").innerHTML = "";

  state.selections.final_positive_5.forEach((id) => {
    const div = document.createElement("div");
    div.className = "final-word";
    div.textContent = wordTextById(id);
    $("finalWords").appendChild(div);
  });

  const slowest = getSlowestStage();
  const toggled = getMostToggledStage();

  $("totalDuration").textContent = formatTime(state.session.total_duration_ms);
  $("slowestStage").textContent = `${stageName(slowest.stage)} · ${formatTime(slowest.duration_ms)}`;
  $("mostToggledStage").textContent = `${stageName(toggled.stage)} · ${toggled.total_toggles}`;

  $("jsonOutput").textContent = JSON.stringify(getJourneyData(), null, 2);
  $("promptOutput").textContent = buildPrompt();
  $("developerOutput").textContent = JSON.stringify(state, null, 2);

  renderTimeline();
}

function renderTimeline() {
  $("timelineOutput").innerHTML = "";

  state.timeline.forEach((item) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `<strong>${item.time} · ${stageName(item.stage)}</strong>${item.action}: ${wordTextById(item.word_id)}`;
    $("timelineOutput").appendChild(div);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function resetApp() {
  location.reload();
}

function changeLanguage(lang) {
  setLanguage(lang);
  state.session.language = UI_LANG;
  applyI18n();

  if (screens.journey.classList.contains("active")) {
    renderStage();
  }

  if (screens.result.classList.contains("active")) {
    showResult();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();

  document.querySelectorAll(".language-card").forEach((button) => {
    button.addEventListener("click", () => {
      changeLanguage(button.dataset.language);
      showScreen("intro");
    });
  });

  $("languageSelect")?.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
  });

  $("resultLanguageSelect")?.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
  });

  $("startBtn").addEventListener("click", startJourney);
  $("nextBtn").addEventListener("click", nextStage);
  $("backBtn").addEventListener("click", prevStage);
  $("resetBtn").addEventListener("click", resetApp);
  $("restartBtn").addEventListener("click", resetApp);

  $("copyPromptBtn").addEventListener("click", () =>
    copyText($("promptOutput").textContent)
  );

  $("copyJsonBtn").addEventListener("click", () =>
    copyText($("jsonOutput").textContent)
  );

  $("copyAllBtn").addEventListener("click", () => {
    copyText(`${$("promptOutput").textContent}\n\n${$("jsonOutput").textContent}`);
  });

  document.querySelectorAll(".mode-card").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mode-card").forEach((b) =>
        b.classList.remove("active")
      );
      button.classList.add("active");
      selectedMode = button.dataset.mode;

      if (screens.result.classList.contains("active")) {
        $("promptOutput").textContent = buildPrompt();
      }
    });
  });
});
