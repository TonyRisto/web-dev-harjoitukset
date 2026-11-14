"use strict";

/**
 * Testifunktio koodaustehtäville.
 *
 * runTests(code, fnName, tests) suorittaa käyttäjän kirjoittaman koodin,
 * hakee siitä funktion `fnName` ja ajaa sille kaikki testit.
 *
 * Testi on olio:
 *   {
 *     name:     "testin kuvaus",
 *     call:     (fn) => fn(1, 2),        // kutsuu käyttäjän funktiota ja palauttaa tuloksen
 *     expected: 3,                       // odotettu tulos
 *     fetch:    (url) => Promise,        // valinnainen: testissä käytettävä feikki-fetch
 *   }
 *
 * Palauttaa (Promise):
 *   {
 *     compiled:  boolean,   // saatiinko koodi ja funktio käyttöön
 *     error:     string|null,
 *     results:   [{ name, passed, expected, actual, error }],
 *     passed:    number,
 *     total:     number,
 *     allPassed: boolean    // true, jos kaikki testit menivät läpi
 *   }
 */

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null || typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key]),
  );
}

function formatValue(value) {
  if (value === undefined) return "undefined";
  if (typeof value === "function") return "[funktio]";
  if (typeof value === "string") return JSON.stringify(value);
  try {
    const text = JSON.stringify(value);
    return text === undefined ? String(value) : text;
  } catch (error) {
    return String(value);
  }
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Testi ei valmistunut ${ms} ms kuluessa`)),
      ms,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function runTests(code, fnName, tests, timeoutMs = 2000) {
  const report = {
    compiled: false,
    error: null,
    results: [],
    passed: 0,
    total: tests.length,
    allPassed: false,
  };

  // Testit korvaavat selaimen fetchin feikillä, jota ohjataan testikohtaisesti.
  const fetchRef = { impl: null };
  const fakeFetch = (...args) => fetchRef.impl(...args);

  let fn;
  try {
    const factory = new Function(
      "fetch",
      `"use strict";\n${code}\n;return typeof ${fnName} === "function" ? ${fnName} : undefined;`,
    );
    fn = factory(fakeFetch);
  } catch (error) {
    report.error = `${error.name}: ${error.message}`;
    return report;
  }

  if (typeof fn !== "function") {
    report.error = `Funktiota "${fnName}" ei löytynyt. Tarkista funktion nimi.`;
    return report;
  }
  report.compiled = true;

  for (const test of tests) {
    const result = {
      name: test.name,
      passed: false,
      expected: test.expected,
      actual: undefined,
      error: null,
    };

    fetchRef.impl =
      test.fetch ||
      (() => Promise.reject(new Error("fetch ei ole käytössä tässä testissä")));

    try {
      result.actual = await withTimeout(
        Promise.resolve(test.call(fn)),
        timeoutMs,
      );
      result.passed = deepEqual(result.actual, test.expected);
    } catch (error) {
      result.error = `${error.name}: ${error.message}`;
    }

    if (result.passed) report.passed++;
    report.results.push(result);
  }

  report.allPassed = report.passed === report.total;
  return report;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { runTests, deepEqual, formatValue };
}
