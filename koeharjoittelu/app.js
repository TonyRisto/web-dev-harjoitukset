"use strict";

// Käyttöliittymä. Riippuu tiedostoista testrunner.js, questions.js ja exercises.js.

const STORAGE_PREFIX = "koeharjoittelu:";

const quiz = { list: [], answered: 0, correct: 0 };
const passedExercises = new Set();

// ------------------------------------------------------------ apufunktiot

function $(selector, root = document) {
  return root.querySelector(selector);
}

/** Luo elementin turvallisesti (sisältö asetetaan tekstinä, ei HTML:nä). */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, value);
  }
  for (const child of children.flat()) {
    if (child != null) node.append(child);
  }
  return node;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function storageGet(key) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + key);
  } catch (error) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, value);
  } catch (error) {
    /* localStorage ei käytössä: ei tallennusta */
  }
}

function storageRemove(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    /* ei tehdä mitään */
  }
}

// ------------------------------------------------------------ pistepalkki

function updateScores() {
  $("#score-mc").textContent = `Monivalinta: ${quiz.correct} / ${quiz.list.length}`;
  $("#score-code").textContent = `Koodaus: ${passedExercises.size} / ${EXERCISES.length}`;
}

// ------------------------------------------------------------ välilehdet

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      for (const other of tabs) {
        const active = other === tab;
        other.classList.toggle("active", active);
        other.setAttribute("aria-selected", String(active));
        $(`#panel-${other.dataset.tab}`).hidden = !active;
      }
    });
  }
}

// ------------------------------------------------------------ monivalinta

function initTopicList() {
  const container = $("#topic-list");
  for (const [key, label] of Object.entries(MC_TOPICS)) {
    const count = MC_QUESTIONS.filter((q) => q.topic === key).length;
    container.append(
      el(
        "label",
        {},
        el("input", { type: "checkbox", name: "topic", value: key, checked: true }),
        ` ${label} (${count})`,
      ),
    );
  }
}

function startQuiz() {
  const topics = [...document.querySelectorAll("input[name=topic]:checked")].map(
    (input) => input.value,
  );
  const count = Number($("#mc-count").value);

  let pool = shuffle(MC_QUESTIONS.filter((q) => topics.includes(q.topic)));
  if (count > 0) pool = pool.slice(0, count);

  quiz.list = pool;
  quiz.answered = 0;
  quiz.correct = 0;
  renderQuiz();
}

function renderQuiz() {
  const list = $("#mc-list");
  list.replaceChildren();
  $("#mc-summary").hidden = true;

  if (quiz.list.length === 0) {
    list.append(
      el("div", { class: "card", text: "Valitse vähintään yksi aihe ja aloita sarja." }),
    );
  }

  quiz.list.forEach((question, index) => {
    list.append(renderQuestion(question, index));
  });
  updateScores();
}

function renderQuestion(question, index) {
  const choices = shuffle(
    question.options.map((text, i) => ({ text, correct: i === 0 })),
  );

  const card = el("article", { class: "card question" });
  const feedback = el("div", { class: "feedback", hidden: true });
  const optionsBox = el("div", { class: "options" });
  const buttons = [];

  function answer(choice, button) {
    for (const b of buttons) b.disabled = true;
    quiz.answered++;

    buttons.forEach((b, i) => {
      if (choices[i].correct) b.classList.add("correct");
    });

    if (choice.correct) {
      quiz.correct++;
      feedback.className = "feedback ok";
      feedback.textContent = `✓ Oikein! ${question.explain}`;
    } else {
      button.classList.add("wrong");
      feedback.className = "feedback bad";
      feedback.textContent = `✗ Väärin. ${question.explain}`;
    }
    feedback.hidden = false;

    updateScores();
    if (quiz.answered === quiz.list.length) showQuizSummary();
  }

  for (const choice of choices) {
    const button = el("button", {
      class: "option",
      type: "button",
      text: choice.text,
      onclick: () => answer(choice, button),
    });
    buttons.push(button);
    optionsBox.append(button);
  }

  card.append(
    el(
      "div",
      { class: "meta" },
      el("span", { text: `Kysymys ${index + 1} / ${quiz.list.length}` }),
      el("span", { text: MC_TOPICS[question.topic] }),
    ),
    el("h3", { text: question.q }),
    question.code ? el("pre", { class: "snippet" }, el("code", { text: question.code })) : null,
    optionsBox,
    feedback,
  );
  return card;
}

function showQuizSummary() {
  const total = quiz.list.length;
  const percent = Math.round((quiz.correct / total) * 100);
  const summary = $("#mc-summary");
  summary.replaceChildren(
    el("h2", { text: "Sarja valmis" }),
    el("p", { text: `Sait ${quiz.correct} / ${total} oikein (${percent} %).` }),
    el("div", { class: "progress" }, el("div", { style: `width: ${percent}%` })),
    el("p", {
      text:
        percent === 100
          ? "Täydet pisteet!"
          : percent >= 70
            ? "Hyvin menee. Kertaa vielä väärin menneet kysymykset."
            : "Kertaa materiaalia ja kokeile uudelleen.",
    }),
    el("button", { class: "btn primary", type: "button", text: "Uusi sarja", onclick: startQuiz }),
  );
  summary.hidden = false;
  summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ------------------------------------------------------------ koodaustehtävät

function renderExercises() {
  const list = $("#code-list");
  list.replaceChildren();
  for (const exercise of EXERCISES) {
    list.append(renderExercise(exercise));
  }
  updateScores();
}

function renderExercise(exercise) {
  const saved = storageGet(`code:${exercise.id}`);
  const editor = el("textarea", {
    class: "editor",
    spellcheck: "false",
    autocapitalize: "off",
    autocomplete: "off",
    "aria-label": `Koodi: ${exercise.title}`,
  });
  editor.value = saved ?? exercise.starter;
  editor.rows = Math.max(8, editor.value.split("\n").length + 1);

  editor.addEventListener("input", () => storageSet(`code:${exercise.id}`, editor.value));
  editor.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const { selectionStart, selectionEnd, value } = editor;
    editor.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
    editor.selectionStart = editor.selectionEnd = selectionStart + 2;
    editor.dispatchEvent(new Event("input"));
  });

  const badge = el("span", { class: "badge", text: "Ei ajettu" });
  const results = el("div", { class: "results" });
  const reveal = el("div", { class: "reveal", hidden: true });

  const runButton = el("button", { class: "btn primary", type: "button", text: "Aja testit" });

  async function run() {
    runButton.disabled = true;
    results.replaceChildren(el("p", { text: "Ajetaan testejä…" }));
    try {
      const report = await runTests(editor.value, exercise.fn, exercise.tests);
      renderReport(results, report);
      badge.textContent = report.allPassed
        ? "Läpi"
        : `${report.passed}/${report.total} läpi`;
      badge.className = `badge ${report.allPassed ? "pass" : "fail"}`;
      if (report.allPassed) passedExercises.add(exercise.id);
      else passedExercises.delete(exercise.id);
      updateScores();
    } finally {
      runButton.disabled = false;
    }
  }
  runButton.addEventListener("click", run);

  function showReveal(label, text, isCode) {
    reveal.replaceChildren(
      el("strong", { text: label }),
      isCode ? el("pre", {}, el("code", { text })) : el("div", { text }),
    );
    reveal.hidden = false;
  }

  const actions = el(
    "div",
    { class: "actions" },
    runButton,
    el("button", {
      class: "btn",
      type: "button",
      text: "Vihje",
      onclick: () => showReveal("Vihje: ", exercise.hint, false),
    }),
    el("button", {
      class: "btn",
      type: "button",
      text: "Näytä ratkaisu",
      onclick: () => showReveal("Mallivastaus:", exercise.solution, true),
    }),
    el("button", {
      class: "btn",
      type: "button",
      text: "Palauta pohja",
      onclick: () => {
        editor.value = exercise.starter;
        storageRemove(`code:${exercise.id}`);
        results.replaceChildren();
        reveal.hidden = true;
        badge.textContent = "Ei ajettu";
        badge.className = "badge";
        passedExercises.delete(exercise.id);
        updateScores();
      },
    }),
  );

  const card = el(
    "article",
    { class: "card exercise", "data-id": exercise.id },
    el("h3", { text: exercise.title }),
    el(
      "div",
      { class: "meta" },
      el("span", { text: MC_TOPICS[exercise.topic] }),
      badge,
    ),
    el("p", { text: exercise.description }),
    editor,
    actions,
    reveal,
    results,
  );
  card.run = run; // "Aja kaikki" käyttää tätä
  card.reset = () => {
    editor.value = exercise.starter;
    storageRemove(`code:${exercise.id}`);
    results.replaceChildren();
    reveal.hidden = true;
    badge.textContent = "Ei ajettu";
    badge.className = "badge";
  };
  return card;
}

function renderReport(container, report) {
  container.replaceChildren();

  if (!report.compiled) {
    container.append(
      el("div", { class: "result-summary fail", text: "✗ Koodia ei voitu suorittaa" }),
      el("p", {}, el("code", { text: report.error })),
    );
    return;
  }

  container.append(
    el("div", {
      class: `result-summary ${report.allPassed ? "pass" : "fail"}`,
      text: report.allPassed
        ? `✓ Kaikki testit menivät läpi (${report.passed}/${report.total})`
        : `✗ ${report.passed}/${report.total} testiä meni läpi`,
    }),
  );

  const items = report.results.map((result) => {
    const item = el(
      "li",
      { class: result.passed ? "pass" : "fail" },
      el("span", { class: "mark", text: result.passed ? "✓" : "✗" }),
      el("span", { text: result.name }),
    );
    if (!result.passed) {
      const detail = el("div", { class: "test-detail" });
      if (result.error) {
        detail.append("Virhe: ", el("code", { text: result.error }));
      } else {
        detail.append(
          "Odotettu: ",
          el("code", { text: formatValue(result.expected) }),
          " · Saatu: ",
          el("code", { text: formatValue(result.actual) }),
        );
      }
      item.append(detail);
    }
    return item;
  });
  container.append(el("ul", { class: "test-list" }, items));
}

async function runAllExercises() {
  const button = $("#run-all");
  button.disabled = true;
  try {
    for (const card of document.querySelectorAll(".exercise")) {
      await card.run();
    }
  } finally {
    button.disabled = false;
  }
  const done = passedExercises.size;
  const out = $("#selftest-output");
  out.hidden = false;
  out.replaceChildren(
    el("strong", {
      text: `Tulos: ${done} / ${EXERCISES.length} tehtävää läpi.`,
    }),
  );
}

/** Ajaa mallivastaukset testeille, jotta nähdään että testit itse ovat kunnossa. */
async function selfTest() {
  const out = $("#selftest-output");
  out.hidden = false;
  out.replaceChildren(el("p", { text: "Ajetaan itsetestiä…" }));

  const rows = [];
  let allOk = true;
  for (const exercise of EXERCISES) {
    const report = await runTests(exercise.solution, exercise.fn, exercise.tests);
    allOk = allOk && report.allPassed;
    rows.push(
      el(
        "li",
        { class: report.allPassed ? "pass" : "fail" },
        el("span", { class: "mark", text: report.allPassed ? "✓" : "✗" }),
        el("span", {
          text: `${exercise.title}: ${report.passed}/${report.total}${report.error ? " – " + report.error : ""}`,
        }),
      ),
    );
  }

  out.replaceChildren(
    el("div", {
      class: `result-summary ${allOk ? "pass" : "fail"}`,
      text: allOk
        ? "✓ Itsetesti läpi: kaikki mallivastaukset läpäisevät testit."
        : "✗ Itsetesti epäonnistui: jokin mallivastaus ei läpäise testejä.",
    }),
    el("ul", { class: "test-list" }, rows),
  );
}

function resetAll() {
  if (!confirm("Palautetaanko kaikki koodaustehtävät aloituskoodiin?")) return;
  passedExercises.clear();
  for (const card of document.querySelectorAll(".exercise")) card.reset();
  $("#selftest-output").hidden = true;
  updateScores();
}

// ------------------------------------------------------------ käynnistys

function init() {
  initTabs();
  initTopicList();
  $("#mc-start").addEventListener("click", startQuiz);
  $("#run-all").addEventListener("click", runAllExercises);
  $("#self-test").addEventListener("click", selfTest);
  $("#reset-all").addEventListener("click", resetAll);

  startQuiz();
  renderExercises();
}

init();
