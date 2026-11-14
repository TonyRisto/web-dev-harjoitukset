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

  console.log(
    failures === 0
      ? "\nKaikki tarkistukset läpi ✓"
      : `\n${failures} tarkistusta epäonnistui ✗`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
