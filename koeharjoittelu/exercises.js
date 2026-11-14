"use strict";

/**
 * Koodaustehtävät.
 *
 * Jokaisella tehtävällä on:
 *   id, title, topic   – tunniste, otsikko ja aihealue (ks. MC_TOPICS)
 *   fn                 – funktion nimi, jonka käyttäjä kirjoittaa
 *   description        – tehtävänanto
 *   hint               – vihje
 *   starter            – aloituskoodi
 *   solution           – mallivastaus (käytetään itsetestissä ja "Näytä ratkaisu" -painikkeessa)
 *   tests              – lista testejä (ks. testrunner.js)
 */

const t = (name, call, expected, extra = {}) => ({
  name,
  call,
  expected,
  ...extra,
});

function mockResponse({ ok = true, status = 200, data }) {
  return { ok, status, json: async () => data };
}

const EXERCISES = [
  // ------------------------------------------------------------ 1
  {
    id: "sum-inputs",
    title: "Syötteiden summa",
    topic: "js1",
    fn: "sumInputs",
    description:
      'prompt() palauttaa aina merkkijonon. Kirjoita funktio sumInputs(a, b), joka saa parametreina kaksi merkkijonoa (esim. "5" ja "7"), muuntaa ne luvuiksi ja palauttaa niiden summan lukuna (12, ei "57").',
    hint: "Käytä parseFloat()-funktiota tai unaarista + -operaattoria ennen yhteenlaskua.",
    starter: `function sumInputs(a, b) {
  // kirjoita koodisi tähän
}
`,
    solution: `function sumInputs(a, b) {
  return parseFloat(a) + parseFloat(b);
}
`,
    tests: [
      t('sumInputs("5", "7") on 12', (fn) => fn("5", "7"), 12),
      t('sumInputs("10", "-3") on 7', (fn) => fn("10", "-3"), 7),
      t('sumInputs("1.5", "2.5") on 4', (fn) => fn("1.5", "2.5"), 4),
      t("Palautettava arvo on tyyppiä number", (fn) => typeof fn("2", "3"), "number"),
    ],
  },

  // ------------------------------------------------------------ 2
  {
    id: "classify-age",
    title: "Ikäluokka (if / else if)",
    topic: "js2",
    fn: "classifyAge",
    description:
      'Kirjoita funktio classifyAge(age), joka palauttaa: "Eläkeiässä", jos age on vähintään 65; "Keski-ikäinen", jos vähintään 30; "Nuori aikuinen", jos vähintään 18; muuten "Alaikäinen".',
    hint: "Tarkista ehdot suurimmasta pienimpään käyttämällä else if -haaroja.",
    starter: `function classifyAge(age) {
  // kirjoita koodisi tähän
}
`,
    solution: `function classifyAge(age) {
  if (age >= 65) {
    return "Eläkeiässä";
  } else if (age >= 30) {
    return "Keski-ikäinen";
  } else if (age >= 18) {
    return "Nuori aikuinen";
  } else {
    return "Alaikäinen";
  }
}
`,
    tests: [
      t("10 → Alaikäinen", (fn) => fn(10), "Alaikäinen"),
      t("17 → Alaikäinen", (fn) => fn(17), "Alaikäinen"),
      t("18 → Nuori aikuinen (raja-arvo)", (fn) => fn(18), "Nuori aikuinen"),
      t("29 → Nuori aikuinen", (fn) => fn(29), "Nuori aikuinen"),
      t("30 → Keski-ikäinen (raja-arvo)", (fn) => fn(30), "Keski-ikäinen"),
      t("64 → Keski-ikäinen", (fn) => fn(64), "Keski-ikäinen"),
      t("65 → Eläkeiässä (raja-arvo)", (fn) => fn(65), "Eläkeiässä"),
      t("90 → Eläkeiässä", (fn) => fn(90), "Eläkeiässä"),
    ],
  },

  // ------------------------------------------------------------ 3
  {
    id: "cabin-class",
    title: "Hyttiluokka (switch)",
    topic: "js2",
    fn: "cabinDescription",
    description:
      'Kirjoita funktio cabinDescription(cabinClass), joka käyttää switch-rakennetta ja palauttaa: "A" → "Yläkannen hytti, jossa on ikkuna.", "B" → "Yläkannen hytti ilman ikkunaa.", "C" → "Ikkunaton hytti autokannen alapuolella.", muuten "Virheellinen hyttiluokka."',
    hint: "Muista return tai break jokaisen case-haaran lopussa ja default-haara viimeiseksi.",
    starter: `function cabinDescription(cabinClass) {
  // kirjoita koodisi tähän
}
`,
    solution: `function cabinDescription(cabinClass) {
  switch (cabinClass) {
    case "A":
      return "Yläkannen hytti, jossa on ikkuna.";
    case "B":
      return "Yläkannen hytti ilman ikkunaa.";
    case "C":
      return "Ikkunaton hytti autokannen alapuolella.";
    default:
      return "Virheellinen hyttiluokka.";
  }
}
`,
    tests: [
      t('"A"', (fn) => fn("A"), "Yläkannen hytti, jossa on ikkuna."),
      t('"B"', (fn) => fn("B"), "Yläkannen hytti ilman ikkunaa."),
      t('"C"', (fn) => fn("C"), "Ikkunaton hytti autokannen alapuolella."),
      t('"D" on virheellinen', (fn) => fn("D"), "Virheellinen hyttiluokka."),
      t('"a" (pieni kirjain) on virheellinen', (fn) => fn("a"), "Virheellinen hyttiluokka."),
    ],
  },

  // ------------------------------------------------------------ 4
  {
    id: "even-numbers",
    title: "Parilliset luvut (for)",
    topic: "js2",
    fn: "evenNumbers",
    description:
      "Kirjoita funktio evenNumbers(limit), joka palauttaa taulukon, jossa ovat kaikki parilliset kokonaisluvut nollasta lukuun limit asti (limit mukaan lukien, jos se on parillinen).",
    hint: "for (let i = 0; i <= limit; i += 2) ja results.push(i).",
    starter: `function evenNumbers(limit) {
  // kirjoita koodisi tähän
}
`,
    solution: `function evenNumbers(limit) {
  const result = [];
  for (let i = 0; i <= limit; i += 2) {
    result.push(i);
  }
  return result;
}
`,
    tests: [
      t("evenNumbers(0) → [0]", (fn) => fn(0), [0]),
      t("evenNumbers(1) → [0]", (fn) => fn(1), [0]),
      t("evenNumbers(6) → [0, 2, 4, 6]", (fn) => fn(6), [0, 2, 4, 6]),
      t("evenNumbers(7) → [0, 2, 4, 6]", (fn) => fn(7), [0, 2, 4, 6]),
      t("evenNumbers(10) sisältää 6 lukua", (fn) => fn(10).length, 6),
    ],
  },

  // ------------------------------------------------------------ 5
  {
    id: "multiplication-table",
    title: "Kertotaulu (sisäkkäiset silmukat)",
    topic: "js2",
    fn: "multiplicationTable",
    description:
      'Kirjoita funktio multiplicationTable(n), joka palauttaa taulukon merkkijonoja kertotaulusta 1…n × 1…n tässä järjestyksessä: ["1 kertaa 1 on 1.", "1 kertaa 2 on 2.", …]. Ulompi silmukka on ensimmäinen kerroin.',
    hint: "Kaksi sisäkkäistä for-silmukkaa (i ja j). Käytä mallimerkkijonoa: `${i} kertaa ${j} on ${i * j}.`",
    starter: `function multiplicationTable(n) {
  // kirjoita koodisi tähän
}
`,
    solution: `function multiplicationTable(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      rows.push(\`\${i} kertaa \${j} on \${i * j}.\`);
    }
  }
  return rows;
}
`,
    tests: [
      t("n = 1", (fn) => fn(1), ["1 kertaa 1 on 1."]),
      t("n = 2", (fn) => fn(2), [
        "1 kertaa 1 on 1.",
        "1 kertaa 2 on 2.",
        "2 kertaa 1 on 2.",
        "2 kertaa 2 on 4.",
      ]),
      t("n = 5 antaa 25 riviä", (fn) => fn(5).length, 25),
      t("n = 3, viimeinen rivi", (fn) => fn(3)[8], "3 kertaa 3 on 9."),
    ],
  },

  // ------------------------------------------------------------ 6
  {
    id: "sorted-copy",
    title: "Lajiteltu kopio (taulukko)",
    topic: "js3",
    fn: "sortedCopy",
    description:
      "Kirjoita funktio sortedCopy(numbers), joka palauttaa uuden taulukon, jossa luvut ovat suuruusjärjestyksessä pienimmästä suurimpaan. Alkuperäistä taulukkoa ei saa muuttaa.",
    hint: "sort() muuttaa taulukkoa itse ja lajittelee oletuksena merkkijonoina. Tee ensin kopio (esim. [...numbers]) ja anna sort-metodille vertailufunktio (a, b) => a - b.",
    starter: `function sortedCopy(numbers) {
  // kirjoita koodisi tähän
}
`,
    solution: `function sortedCopy(numbers) {
  const copy = [...numbers];
  copy.sort((a, b) => a - b);
  return copy;
}
`,
    tests: [
      t("[100, 23, 15] → [15, 23, 100]", (fn) => fn([100, 23, 15]), [15, 23, 100]),
      t("Negatiiviset: [3, -1, 2] → [-1, 2, 3]", (fn) => fn([3, -1, 2]), [-1, 2, 3]),
      t("Tyhjä taulukko → []", (fn) => fn([]), []),
      t(
        "Alkuperäinen taulukko ei muutu",
        (fn) => {
          const original = [3, 1, 2];
          const result = fn(original);
          return { result, original };
        },
        { result: [1, 2, 3], original: [3, 1, 2] },
      ),
    ],
  },

  // ------------------------------------------------------------ 7
  {
    id: "make-student",
    title: "Opiskelijaolio ja metodi",
    topic: "js3",
    fn: "makeStudent",
    description:
      "Kirjoita funktio makeStudent(firstName, lastName, credits), joka palauttaa olion, jossa on ominaisuudet firstName, lastName ja credits sekä metodi hasLeft(), joka palauttaa montako opintopistettä tutkinnosta vielä puuttuu (240 − credits). Käytä this-avainsanaa.",
    hint: "Metodin sisällä this.credits viittaa saman olion credits-ominaisuuteen, joten metodi huomioi myös myöhemmin muutetun arvon.",
    starter: `function makeStudent(firstName, lastName, credits) {
  // kirjoita koodisi tähän
}
`,
    solution: `function makeStudent(firstName, lastName, credits) {
  return {
    firstName: firstName,
    lastName: lastName,
    credits: credits,
    hasLeft: function () {
      return 240 - this.credits;
    },
  };
}
`,
    tests: [
      t(
        "Ominaisuudet ja hasLeft()",
        (fn) => {
          const s = fn("Ahmed", "Hussein", 175);
          return [s.firstName, s.lastName, s.credits, s.hasLeft()];
        },
        ["Ahmed", "Hussein", 175, 65],
      ),
      t("Valmis tutkinto: 240 op → 0", (fn) => fn("A", "B", 240).hasLeft(), 0),
      t(
        "Muutettu credits näkyy hasLeft()-tuloksessa",
        (fn) => {
          const s = fn("A", "B", 100);
          s.credits = 200;
          return s.hasLeft();
        },
        40,
      ),
    ],
  },

  // ------------------------------------------------------------ 8
  {
    id: "average-arrow",
    title: "Keskiarvo (nuolifunktio)",
    topic: "js3",
    fn: "average",
    description:
      "Kirjoita nuolifunktio average, joka saa parametrina lukutaulukon ja palauttaa lukujen keskiarvon. Tyhjän taulukon keskiarvo on 0.",
    hint: "const average = (numbers) => { ... }. Käy luvut läpi for...of-silmukalla ja jaa summa taulukon pituudella. Älä jaa nollalla.",
    starter: `const average = (numbers) => {
  // kirjoita koodisi tähän
};
`,
    solution: `const average = (numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum / numbers.length;
};
`,
    tests: [
      t("[2, 4, 6] → 4", (fn) => fn([2, 4, 6]), 4),
      t("[5] → 5", (fn) => fn([5]), 5),
      t("[1, 2] → 1.5", (fn) => fn([1, 2]), 1.5),
      t("[] → 0", (fn) => fn([]), 0),
    ],
  },

  // ------------------------------------------------------------ 9
  {
    id: "build-list",
    title: "Lista DOMiin (createElement)",
    topic: "js4",
    fn: "buildList",
    description:
      "Kirjoita funktio buildList(items), joka luo document.createElement-metodilla <ul>-elementin ja lisää siihen jokaista taulukon merkkijonoa kohden <li>-elementin, jonka teksti on kyseinen merkkijono. Palauta <ul>-elementti (älä lisää sitä sivulle).",
    hint: "const ul = document.createElement('ul'); silmukassa: const li = document.createElement('li'); li.textContent = item; ul.appendChild(li);",
    starter: `function buildList(items) {
  // kirjoita koodisi tähän
}
`,
    solution: `function buildList(items) {
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}
`,
    tests: [
      t(
        'buildList(["a", "b"])',
        (fn) => {
          const ul = fn(["a", "b"]);
          return [
            ul.tagName,
            ul.children.length,
            ul.children[0].tagName,
            ul.children[0].textContent,
            ul.children[1].textContent,
          ];
        },
        ["UL", 2, "LI", "a", "b"],
      ),
      t(
        "Tyhjä taulukko antaa tyhjän listan",
        (fn) => {
          const ul = fn([]);
          return [ul.tagName, ul.children.length];
        },
        ["UL", 0],
      ),
      t("Kolme alkiota → kolme li-elementtiä", (fn) => fn(["x", "y", "z"]).children.length, 3),
    ],
  },

  // ------------------------------------------------------------ 10
  {
    id: "fetch-names",
    title: "Datan haku rajapinnasta (fetch + async/await)",
    topic: "js5",
    fn: "fetchNames",
    description:
      "Kirjoita asynkroninen funktio fetchNames(url), joka hakee JSON-dataa fetchillä. Data on taulukko olioita, joiden muoto on { score: 1, show: { name: 'Emmerdale' } }. Palauta taulukko sarjojen nimistä (show.name). Tarkista response.ok ja heitä virhe, jos pyyntö epäonnistui. Käsittele virhe try/catch-rakenteella ja palauta virhetilanteessa tyhjä taulukko. (Testit käyttävät feikki-fetchiä, joten oikeaa verkkoyhteyttä ei tarvita.)",
    hint: "async function ...; const response = await fetch(url); if (!response.ok) throw new Error(...); const data = await response.json(); return data.map(...)",
    starter: `async function fetchNames(url) {
  // 1. hae data fetchillä (await)
  // 2. tarkista response.ok
  // 3. muunna vastaus json()-metodilla (await)
  // 4. palauta taulukko, jossa on jokaisen alkion show.name
  // 5. virhetilanteessa palauta tyhjä taulukko (try/catch)
}
`,
    solution: `async function fetchNames(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP-virhe! Tilakoodi: " + response.status);
    }
    const data = await response.json();
    return data.map((item) => item.show.name);
  } catch (error) {
    return [];
  }
}
`,
    tests: (() => {
      const calls = [];
      return [
        t(
          "Hakee annetusta osoitteesta ja palauttaa nimet",
          async (fn) => {
            calls.length = 0;
            const names = await fn("https://api.example/shows");
            return { names, calls: [...calls] };
          },
          {
            names: ["Emmerdale", "Coronation Street"],
            calls: ["https://api.example/shows"],
          },
          {
            fetch: (url) => {
              calls.push(url);
              return Promise.resolve(
                mockResponse({
                  data: [
                    { score: 1, show: { name: "Emmerdale" } },
                    { score: 0.5, show: { name: "Coronation Street" } },
                  ],
                }),
              );
            },
          },
        ),
        t(
          "Tyhjä hakutulos → []",
          (fn) => fn("https://api.example/empty"),
          [],
          { fetch: () => Promise.resolve(mockResponse({ data: [] })) },
        ),
        t(
          "HTTP-virhe (404) → []",
          (fn) => fn("https://api.example/missing"),
          [],
          {
            fetch: () =>
              Promise.resolve(mockResponse({ ok: false, status: 404, data: null })),
          },
        ),
        t(
          "Verkkovirhe → []",
          (fn) => fn("https://api.example/down"),
          [],
          { fetch: () => Promise.reject(new TypeError("Failed to fetch")) },
        ),
      ];
    })(),
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { EXERCISES };
}
