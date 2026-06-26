/* ==========================================================
   Внутренний Компас
   script.js
========================================================== */

let currentStageIndex = 0;
let selectedMode = "reflection";
let timerInterval = null;

const state = {
  session: {
    id: crypto.randomUUID(),
    language: UI_LANG,
    started_at: null,
    finished_at: null,
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

const $ = (id) => document.getElementById(id);

const screens = {
  intro: $("introScreen"),
  journey: $("journeyScreen"),
  result: $("resultScreen")
};

function now() {
  return Date.now();
}

function elapsed() {
  return now() - state.session.started_at;
}

function formatTime(ms) {
  if (!ms && ms !== 0) return "—";
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

function logAction(action, word, stageId) {
  state.timeline.push({
    time_ms: elapsed(),
    time: formatTime(elapsed()),
    action,
    word_id: word.id,
    word: getWordText(word),
    stage: stageId
  });
}

function toggleFromList(list, word) {
  const index = list.findIndex((item) => item.id === word.id);
  if (index >= 0) {
    list.splice(index, 1);
    return false;
  }
  list.push(word);
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

function getWordsForStage() {
  const stage = getStage();

  if (stage.id === "positive_select") return POSITIVE_WORDS;

  if (stage.id === "positive_drop_1") {
    return state.selections.positive_selected_20;
  }

  if (stage.id === "positive_drop_2") {
    return state.selections.positive_selected_20.filter(
      (word) => !state.selections.dropped_positive.step1.some((w) => w.id === word.id)
    );
  }

  if (stage.id === "positive_drop_3") {
    return state.selections.positive_selected_20.filter(
      (word) =>
        !state.selections.dropped_positive.step1.some((w) => w.id === word.id) &&
        !state.selections.dropped_positive.step2.some((w) => w.id === word.id)
    );
  }

  if (stage.id === "negative_select") return NEGATIVE_WORDS;

  if (stage.id === "negative_drop") return state.selections.negative_selected_10;

  if (stage.id === "final_select") {
    const oppositeWords = state.selections.opposite_choices
      .map((choice) => getPositiveById(choice.chosen_opposite_id))
      .filter(Boolean);

    return [...state.selections.positive_core_5, ...oppositeWords];
  }

  return [];
}

function updateFlowTabs() {
  const stage = getStage().id;

  $("flowPositive").classList.toggle("active", stage.startsWith("positive"));
  $("flowNegative").classList.toggle("active", stage.startsWith("negative"));
  $("flowOpposite").classList.toggle("active", stage === "opposite_select");
  $("flowFinal").classList.toggle("active", stage === "final_select");
}

function renderStage() {
  const stage = getStage();
  initStageData(stage.id);

  $("stageLabel").textContent = `Шаг ${currentStageIndex + 1} / ${STAGES.length}`;
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
  const selected = getCurrentSelectionList();

  $("wordGrid").innerHTML = "";

  words.forEach((word) => {
    const button = document.createElement("button");
    button.className = "word-chip";
    button.textContent = getWordText(word);

    if (stage.mode.includes("negative")) {
      button.classList.add("negative");
    }

    if (selected.some((item) => item.id === word.id)) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      const list = getCurrentSelectionList();
      const alreadySelected = list.some((item) => item.id === word.id);

      if (!alreadySelected && list.length >= stage.limit) return;

      const added = toggleFromList(list, word);
      state.stageData[stage.id].total_toggles += 1;
      logAction(added ? "select" : "remove", word, stage.id);

      renderStage();
    });

    $("wordGrid").appendChild(button);
  });
}

function renderOppositeStage() {
  $("wordGrid").innerHTML = "";
  $("oppositePanel").classList.remove("hidden");

  const negatives = state.selections.negative_core_5;
  const currentIndex = state.selections.opposite_choices.length;
  const currentNegative = negatives[currentIndex];

  if (!currentNegative) {
    updateButtons();
    return;
  }

  $("currentNegativeWord").textContent = getWordText(currentNegative);
  $("oppositeOptions").innerHTML = "";

  const candidates = (OPPOSITE_MAP[currentNegative.id] || [])
    .map((id) => getPositiveById(id))
    .filter(Boolean);

  candidates.forEach((word) => {
    const button = document.createElement("button");
    button.className = "opposite-option";
    button.textContent = getWordText(word);

    button.addEventListener("click", () => {
      state.selections.opposite_choices.push({
        negative_id: currentNegative.id,
        negative: getWordText(currentNegative),
        chosen_opposite_id: word.id,
        chosen_opposite: getWordText(word)
      });

      state.stageData.opposite_select.total_toggles += 1;
      logAction("choose_opposite", word, "opposite_select");

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
  const dropped = [
    ...state.selections.dropped_positive.step1,
    ...state.selections.dropped_positive.step2,
    ...state.selections.dropped_positive.step3
  ];

  state.selections.positive_core_5 = state.selections.positive_selected_20.filter(
    (word) => !dropped.some((d) => d.id === word.id)
  );

  state.selections.negative_core_5 = state.selections.negative_selected_10.filter(
    (word) => !state.selections.dropped_negative.some((d) => d.id === word.id)
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
  state.session.started_at = new Date().toISOString();
  state.session.started_at_ms = now();

  timerInterval = setInterval(() => {
    $("timerText").textContent = formatTime(elapsed());
  }, 500);

  showScreen("journey");
  renderStage();
}

function finishJourney() {
  clearInterval(timerInterval);

  state.session.finished_at = new Date().toISOString();
  state.session.total_duration_ms = elapsed();

  calculateCores();

  showResult();
  showScreen("result");
}

function getJourneyData() {
  return {
    final_positive_5: state.selections.final_positive_5.map(getWordText),
    journey: {
      positive_selected_20: state.selections.positive_selected_20.map(getWordText),
      dropped_positive: {
        step1: state.selections.dropped_positive.step1.map(getWordText),
        step2: state.selections.dropped_positive.step2.map(getWordText),
        step3: state.selections.dropped_positive.step3.map(getWordText)
      },
      positive_core_5: state.selections.positive_core_5.map(getWordText),
      negative_selected_10: state.selections.negative_selected_10.map(getWordText),
      dropped_negative: state.selections.dropped_negative.map(getWordText),
      negative_core_5: state.selections.negative_core_5.map(getWordText),
      opposite_choices: state.selections.opposite_choices,
      timeline: state.timeline
    },
    stage_summaries: Object.values(state.stageData),
    session: state.session
  };
}

function getSlowestStage() {
  const stages = Object.values(state.stageData);
  return stages.sort((a, b) => b.duration_ms - a.duration_ms)[0];
}

function getMostToggledStage() {
  const stages = Object.values(state.stageData);
  return stages.sort((a, b) => b.total_toggles - a.total_toggles)[0];
}

function stageName(id) {
  return STAGES.find((s) => s.id === id)?.title?.[UI_LANG] || id;
}

function buildPrompt() {
  const data = getJourneyData();
  const slowest = getSlowestStage();
  const toggled = getMostToggledStage();

  return `Вы — глубокий и бережный аналитик внутреннего пути человека.

Ниже приведены данные человека, который проходил упражнение «Внутренний Компас»: он выбирал слова, убирал часть слов, работал с теневыми словами, выбирал противоположности и в конце оставил пять финальных слов.

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

На основе этих данных проанализируйте:

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
Опишите человека:
- когда он один;
- когда он с друзьями;
- когда он в работе или роли.
В каждой сцене добавьте одну фразу в кавычках, которую он мог бы подумать или сказать.

5. 【На что стоит обратить внимание】
Честно, но бережно опишите:
- возможные ловушки;
- как он может невольно напрягать других;
- как он может истощать себя;
- что ему стоит тренировать для роста.

6. 【Слова этому человеку】
Завершите анализ одним тёплым, искренним абзацем, обращённым напрямую к человеку.`;
}

function showResult() {
  $("finalWords").innerHTML = "";
  state.selections.final_positive_5.forEach((word) => {
    const div = document.createElement("div");
    div.className = "final-word";
    div.textContent = getWordText(word);
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
    div.innerHTML = `<strong>${item.time} · ${stageName(item.stage)}</strong>${item.action}: ${item.word}`;
    $("timelineOutput").appendChild(div);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function resetApp() {
  location.reload();
}

$("startBtn").addEventListener("click", startJourney);
$("nextBtn").addEventListener("click", nextStage);
$("backBtn").addEventListener("click", prevStage);
$("resetBtn").addEventListener("click", resetApp);
$("restartBtn").addEventListener("click", resetApp);

$("copyPromptBtn").addEventListener("click", () => copyText($("promptOutput").textContent));
$("copyJsonBtn").addEventListener("click", () => copyText($("jsonOutput").textContent));
$("copyAllBtn").addEventListener("click", () => {
  copyText(`${$("promptOutput").textContent}\n\n${$("jsonOutput").textContent}`);
});

document.querySelectorAll(".mode-card").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-card").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    selectedMode = button.dataset.mode;
    $("promptOutput").textContent = buildPrompt();
  });
});
