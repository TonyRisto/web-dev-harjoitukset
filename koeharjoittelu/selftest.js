"use strict";

/**
 * Itsetesti: varmistaa, että harjoituskokeen aineisto on kunnossa.
 * Aja komentoriviltä: node selftest.js
 *
 *  1. Jokaisen koodaustehtävän mallivastaus läpäisee kaikki testit.
 *  2. Jokaisen tehtävän aloituskoodi EI läpäise testejä (testit eivät ole liian löysiä).
 *  3. Monivalintakysymyksissä on vähintään 3 vaihtoehtoa eikä toistoja.
 */

const { runTests } = require("./testrunner.js");
const { EXERCISES } = require("./exercises.js");
const { MC_QUESTIONS, MC_TOPICS } = require("./questions.js");
const Editor = require("./editor.js");

// Pieni feikki-document, jotta DOM-tehtävän testit toimivat Nodessa.
function fakeElement(tag) {
  return {
    tagName: tag.toUpperCase(),
    children: [],
    textContent: "",
    appendChild(child) {
      this.children.push(child);
      return child;
    },
  };
}
global.document = { createElement: fakeElement };

async function main() {
  let failures = 0;
  const fail = (msg) => {
    failures++;
    console.log("  ✗ " + msg);
  };

  console.log("Koodaustehtävät");
  for (const ex of EXERCISES) {
    const solved = await runTests(ex.solution, ex.fn, ex.tests);
    const starter = await runTests(ex.starter, ex.fn, ex.tests);
    const solvedOk = solved.allPassed;
    const starterFails = !starter.allPassed && starter.passed === 0;
    console.log(
      `${solvedOk && starterFails ? "✓" : "✗"} ${ex.title}: ` +
        `ratkaisu ${solved.passed}/${solved.total}, pohja ${starter.passed}/${starter.total}`,
    );
    if (!solvedOk) {
      fail(`Mallivastaus ei läpäise testejä (${ex.id})`);
      if (solved.error) console.log("    " + solved.error);
      solved.results
        .filter((r) => !r.passed)
        .forEach((r) =>
          console.log(
            `    - ${r.name}: odotettu ${JSON.stringify(r.expected)}, saatu ${JSON.stringify(r.actual)} ${r.error || ""}`,
          ),
        );
    }
    if (!starterFails) fail(`Aloituskoodi läpäisee testejä jo valmiiksi (${ex.id})`);
    if (!MC_TOPICS[ex.topic]) fail(`Tuntematon aihe: ${ex.topic}`);
  }

  console.log("\nMonivalintakysymykset");
  const perTopic = {};
  MC_QUESTIONS.forEach((q, i) => {
    perTopic[q.topic] = (perTopic[q.topic] || 0) + 1;
    if (!MC_TOPICS[q.topic]) fail(`Kysymys ${i + 1}: tuntematon aihe ${q.topic}`);
    if (q.options.length < 3) fail(`Kysymys ${i + 1}: liian vähän vaihtoehtoja`);
    if (new Set(q.options).size !== q.options.length)
      fail(`Kysymys ${i + 1}: samoja vaihtoehtoja useaan kertaan`);
    if (!q.explain) fail(`Kysymys ${i + 1}: selitys puuttuu`);
  });
  console.log(`  Yhteensä ${MC_QUESTIONS.length} kysymystä:`, perTopic);

  // ---------------------------------------------------------------- Editori
  console.log("\nEditorin näppäintoiminnot");

  // Kohdistin merkitään |-merkillä, valinta merkeillä ‹ ›.
  function parseMarked(text) {
    const caret = text.indexOf("|");
    if (caret !== -1) {
      return { value: text.replace("|", ""), selStart: caret, selEnd: caret };
    }
    const start = text.indexOf("‹");
    const end = text.indexOf("›") - 1;
    return { value: text.replace("‹", "").replace("›", ""), selStart: start, selEnd: end };
  }

  function applyMarked(text, key, mods) {
    const { value, selStart, selEnd } = parseMarked(text);
    const edit = Editor.computeEdit(value, selStart, selEnd, key, mods);
    if (!edit) return null;
    const result = value.slice(0, edit.start) + edit.text + value.slice(edit.end);
    if (edit.selStart === edit.selEnd) {
      return result.slice(0, edit.selStart) + "|" + result.slice(edit.selStart);
    }
    return (
      result.slice(0, edit.selStart) +
      "‹" +
      result.slice(edit.selStart, edit.selEnd) +
      "›" +
      result.slice(edit.selEnd)
    );
  }

  const editorCases = [
    // [kuvaus, ennen, näppäin, näppäinmuokkaimet, odotettu (null = selaimen oletus)]
    ["Enter säilyttää sisennyksen", "  foo();|", "Enter", {}, "  foo();\n  |"],
    ["Enter { jälkeen lisää sisennyksen", "function f() {|", "Enter", {}, "function f() {\n  |"],
    ["Enter {}-parin välissä", "if (x) {|}", "Enter", {}, "if (x) {\n  |\n}"],
    ["Enter sisennetyssä {}-parissa", "  if (x) {|}", "Enter", {}, "  if (x) {\n    |\n  }"],
    ["Tab rivin alussa", "|abc", "Tab", {}, "  |abc"],
    ["Tab seuraavaan sisennyskohtaan", "a|bc", "Tab", {}, "a |bc"],
    ["Tab usealle riville", "‹a\nb›", "Tab", {}, "‹  a\n  b›"],
    ["Shift+Tab usealle riville", "  ‹a\n    b›", "Tab", { shift: true }, "‹a\n  b›"],
    ["Shift+Tab yhdelle riville", "    |a", "Tab", { shift: true }, "  |a"],
    ["Ctrl+Tab jätetään selaimelle", "|a", "Tab", { ctrl: true }, null],
    ["{ lisää parin", "|", "{", {}, "{|}"],
    ["( lisää parin sanan jälkeen", "foo|", "(", {}, "foo(|)"],
    ["( ei lisää paria sanan keskelle", "fo|o", "(", {}, null],
    ["Sulkevan ohitus", "foo(|)", ")", {}, "foo()|"],
    ["Valinnan ympäröinti", "‹abc›", "(", {}, "(‹abc›)"],
    ["Lainausmerkkipari", "|", '"', {}, '"|"'],
    ["Heittomerkki sanan sisällä (don't)", "don|", "'", {}, null],
    ["Backspace poistaa tyhjän sulkeparin", "{|}", "Backspace", {}, "|"],
    ["Backspace poistaa sisennystason", "    |x", "Backspace", {}, "  |x"],
    ["Backspace poistaa viimeisen sisennyksen", "  |x", "Backspace", {}, "|x"],
    ["Backspace tekstin jälkeen on selaimen oma", "a|", "Backspace", {}, null],
    ["} pienentää sisennystä", "{\n  foo();\n  |", "}", {}, "{\n  foo();\n}|"],
    ["} sisennetyllä rivillä", "    |", "}", {}, "  }|"],
    ["Kommentoi rivin", "|foo();", "/", { ctrl: true }, "// |foo();"],
    ["Poista kommentti", "// |foo();", "/", { meta: true }, "|foo();"],
    ["Kommentoi useita rivejä", "‹a\n  b›", "/", { ctrl: true }, "‹// a\n//   b›"],
    ["Tavallinen kirjain jää selaimelle", "ab|", "x", {}, null],
  ];

  for (const [name, before, key, mods, expected] of editorCases) {
    const actual = applyMarked(before, key, mods);
    if (actual === expected) {
      console.log(`  ✓ ${name}`);
    } else {
      fail(`${name}: odotettu ${JSON.stringify(expected)}, saatu ${JSON.stringify(actual)}`);
    }
  }

  console.log(
    failures === 0
      ? "\nKaikki tarkistukset läpi ✓"
      : `\n${failures} tarkistusta epäonnistui ✗`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
