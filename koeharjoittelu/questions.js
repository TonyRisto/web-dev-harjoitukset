"use strict";

/**
 * Monivalintakysymykset.
 * HUOM: options[0] on aina OIKEA vastaus. Vaihtoehdot sekoitetaan näytettäessä.
 */

const MC_TOPICS = {
  js1: "JS 1: Vuorovaikutteiset ohjelmat",
  js2: "JS 2: Ohjausrakenteet",
  js3: "JS 3: Taulukot ja funktiot",
  js4: "JS 4: DOM ja tapahtumat",
  py: "Python-palvelin (Flask)",
  js5: "JS 5: AJAX ja rajapinnat",
};

const MC_QUESTIONS = [
  // ---------------------------------------------------------------- JS 1
  {
    topic: "js1",
    q: "Mikä <script>-elementin attribuutti saa skriptin suoritettavaksi vasta, kun koko HTML-sivu on jäsennetty?",
    options: ["defer", "async", "strict", "once"],
    explain:
      "defer lataa skriptin jäsentämisen aikana mutta suorittaa sen vasta, kun kaikki HTML-elementit ovat valmiina.",
  },
  {
    topic: "js1",
    q: "Mitä prompt()-funktio palauttaa?",
    options: [
      "Aina merkkijonon (tai null, jos käyttäjä painaa Cancel)",
      "Aina luvun",
      "Totuusarvon",
      "Luvun tai merkkijonon sen mukaan, mitä käyttäjä kirjoitti",
    ],
    explain:
      "Paluuarvo on aina merkkijono, vaikka käyttäjä kirjoittaisi luvun. Cancel-painike antaa arvon null.",
  },
  {
    topic: "js1",
    q: "Käyttäjä syöttää ensin luvun 5 ja sitten luvun 7. Mitä ohjelma tulostaa?",
    code: 'const a = prompt("Luku 1");\nconst b = prompt("Luku 2");\nconsole.log(a + b);',
    options: ["57", "12", "NaN", "undefined"],
    explain:
      "Syötteet ovat merkkijonoja, joten + yhdistää ne: \"5\" + \"7\" on \"57\". Luvuiksi ne pitää muuntaa esim. parseInt/parseFloat-funktiolla.",
  },
  {
    topic: "js1",
    q: "Mitä console.log(typeof \"Ahmed\") tulostaa?",
    options: ["string", "text", "String", "char"],
    explain: "typeof-operaattori palauttaa merkkijonolle arvon \"string\".",
  },
  {
    topic: "js1",
    q: "Mitä avainsanaa kannattaa käyttää oletuksena uutta muuttujaa luodessa?",
    options: [
      "const (ja let vain, jos arvoa pitää myöhemmin muuttaa)",
      "var",
      "let aina",
      "Muuttujaa ei tarvitse määritellä",
    ],
    explain:
      "JavaScriptissä lähes kaikki muuttujat määritellään const-avainsanalla. var-avainsanaa ei enää suositella.",
  },
  {
    topic: "js1",
    q: "Millä merkeillä mallimerkkijono (template literal) rajataan?",
    options: [
      "Gravis-merkeillä (`)",
      "Kaksoislainausmerkeillä (\")",
      "Aaltosulkeilla { }",
      "Kulmasulkeilla < >",
    ],
    explain:
      "Mallimerkkijonossa käytetään gravis-merkkejä ja paikkamerkkiä ${...}, esim. `Hei ${name}`.",
  },
  {
    topic: "js1",
    q: "Mitä \"use strict\" tekee?",
    options: [
      "Estää määrittelemättömien muuttujien automaattisen luonnin, jolloin kirjoitusvirheestä tulee virheilmoitus",
      "Nopeuttaa ohjelman suoritusta",
      "Pakottaa kaikki muuttujat luvuiksi",
      "Estää console.log-kutsut",
    ],
    explain:
      "Tiukassa tilassa arvon sijoittaminen määrittelemättömään muuttujaan aiheuttaa virheen (esim. diametr vs. diameter).",
  },
  {
    topic: "js1",
    q: "Mikä on muuttujan arvo ennen kuin sille on asetettu arvo?",
    code: "let name;\nconsole.log(name);",
    options: ["undefined", "null", "0", "Virhe: ReferenceError"],
    explain: "Määritelty mutta alustamaton muuttuja on arvoltaan undefined.",
  },
  {
    topic: "js1",
    q: "Mikä on muuttujan number arvo lopuksi?",
    code: "let number = 3;\nnumber *= 2;\nnumber += 7;\nnumber -= 8;\nconsole.log(number);",
    options: ["5", "1", "13", "9"],
    explain: "3 * 2 = 6, 6 + 7 = 13, 13 - 8 = 5.",
  },
  {
    topic: "js1",
    q: "Minkä arvon Math.random() palauttaa?",
    options: [
      "Luvun, joka on vähintään 0 ja pienempi kuin 1",
      "Kokonaisluvun väliltä 1–10",
      "Luvun, joka on vähintään 0 ja enintään 1",
      "Kokonaisluvun 0 tai 1",
    ],
    explain: "Satunnaisluku on väliltä [0, 1) eli 1 ei koskaan tule arvoksi.",
  },
  {
    topic: "js1",
    q: "Mikä seuraavista on kelvollinen muuttujan nimi?",
    options: ["number2", "7days", "super-high", "my name"],
    explain:
      "Nimi ei saa alkaa numerolla, eikä siinä saa olla viivoja tai välilyöntejä. Sallittuja ovat kirjaimet, numerot, _ ja $.",
  },
  {
    topic: "js1",
    q: "Miten muunnat merkkijonon \"15.48\" liukuluvuksi?",
    options: [
      'parseFloat("15.48")',
      'toString("15.48")',
      'Math.float("15.48")',
      'parseString("15.48")',
    ],
    explain:
      "parseFloat muuntaa liukuluvuksi, parseInt kokonaisluvuksi. Myös unaarinen + toimii: +\"15.48\".",
  },
  {
    topic: "js1",
    q: "Mikä seuraavista on JavaScriptin primitiivinen tietotyyppi?",
    options: ["boolean", "array", "dictionary", "class"],
    explain:
      "Primitiivityyppejä ovat mm. boolean, number, string, null, undefined. Taulukko on olio (object).",
  },

  // ---------------------------------------------------------------- JS 2
  {
    topic: "js2",
    q: "Mikä on lausekkeen '5' === 5 arvo?",
    options: ["false", "true", "5", "Virhe"],
    explain:
      "=== vertaa sekä arvoa että tyyppiä. Merkkijono ja luku ovat eri tyyppiä. Sen sijaan '5' == 5 olisi true.",
  },
  {
    topic: "js2",
    q: "Mitä tapahtuu, kun kirjoitat ehdoksi if (first = second)?",
    options: [
      "Muuttujan second arvo sijoitetaan muuttujaan first, ja ehdon totuus riippuu sijoitetusta arvosta",
      "Muuttujien arvoja verrataan keskenään",
      "Syntyy aina syntaksivirhe",
      "Verrataan sekä arvoa että tyyppiä",
    ],
    explain:
      "= on sijoitus, ei vertailu. Yhtäsuuruutta vertaillaan operaattorilla === (tai ==).",
  },
  {
    topic: "js2",
    q: "Mitä seuraava ohjelma tulostaa?",
    code: 'const age = 38;\nif (age >= 65) {\n  console.log("Eläkeiässä");\n} else if (age >= 30) {\n  console.log("Keski-ikäinen");\n} else if (age >= 18) {\n  console.log("Nuori aikuinen");\n}',
    options: [
      "Vain: Keski-ikäinen",
      "Keski-ikäinen ja Nuori aikuinen",
      "Nuori aikuinen",
      "Ei mitään",
    ],
    explain:
      "Ehdot tarkistetaan ylhäältä alas, ja vain ensimmäinen tosi haara suoritetaan.",
  },
  {
    topic: "js2",
    q: "Mitä tapahtuu, jos switch-rakenteen case-haarasta puuttuu break?",
    options: [
      "Suoritus jatkuu seuraavan case-haaran lauseisiin, vaikka arvo ei vastaisi sitä",
      "Ohjelma pysähtyy virheeseen",
      "Vain default-haara suoritetaan",
      "Switch ei toimi lainkaan",
    ],
    explain: "Ilman break-lausetta suoritus \"valuu\" läpi seuraaviin haaroihin.",
  },
  {
    topic: "js2",
    q: "Mikä on do/while-rakenteen ja while-rakenteen keskeinen ero?",
    options: [
      "do/while suorittaa toistettavan osan aina vähintään kerran",
      "while suorittaa toistettavan osan aina vähintään kerran",
      "do/while ei tue break-lausetta",
      "Niillä ei ole mitään eroa",
    ],
    explain:
      "do/while tarkistaa ehdon vasta kierroksen jälkeen, joten ensimmäinen kierros suoritetaan aina.",
  },
  {
    topic: "js2",
    q: "Mitä luvut seuraava ohjelma tulostaa?",
    code: "for (let i = 0; i <= 6; i += 2) {\n  console.log(i);\n}",
    options: ["0, 2, 4, 6", "0, 2, 4", "2, 4, 6", "1, 3, 5"],
    explain: "i alkaa nollasta, kasvaa kahdella ja toisto jatkuu kun i <= 6.",
  },
  {
    topic: "js2",
    q: "Mitkä kolme osaa for-lauseen sulkeissa ovat (puolipisteillä erotettuna)?",
    options: [
      "Alkutoimet, toistoehto ja lopputoimet",
      "Muuttuja, tyyppi ja arvo",
      "Ehto, then ja else",
      "Alku, loppu ja askel (kuten Pythonin range)",
    ],
    explain: "for (alkutoimet; toistoehto; lopputoimet) { ... }",
  },
  {
    topic: "js2",
    q: "Mitä ehto number % 2 === 0 tarkistaa?",
    options: [
      "Onko luku parillinen",
      "Onko luku pariton",
      "Onko luku jaettu kahdella",
      "Onko luku nolla",
    ],
    explain:
      "% on jakojäännös. Jos jakojäännös kahdella jaettaessa on nolla, luku on parillinen.",
  },
  {
    topic: "js2",
    q: "Mikä on lausekkeen !(5 > 3 || 2 > 4) arvo?",
    options: ["false", "true", "undefined", "Virhe"],
    explain:
      "5 > 3 on true, joten || antaa true. Negaatio ! kääntää arvon: false.",
  },
  {
    topic: "js2",
    q: "Kuinka monta kertaa sisemmän silmukan runko suoritetaan yhteensä?",
    code: "for (let i = 1; i <= 5; i++) {\n  for (let j = 1; j <= 5; j++) {\n    console.log(i * j);\n  }\n}",
    options: ["25", "10", "5", "6"],
    explain: "Ulompi silmukka pyörii 5 kertaa ja jokaisella kierroksella sisempi 5 kertaa: 5 · 5 = 25.",
  },
  {
    topic: "js2",
    q: "Milloin while-silmukan toistoehto tarkistetaan?",
    options: [
      "Ennen jokaista toistokertaa",
      "Jokaisen toistokerran jälkeen",
      "Vain kerran silmukan alussa",
      "Vain silmukan lopussa",
    ],
    explain: "Jos ehto on heti epätosi, while-silmukan runkoa ei suoriteta kertaakaan.",
  },
  {
    topic: "js2",
    q: "Mikä on muuttujan x arvo lopuksi?",
    code: "let x = 0;\nwhile (x < 3) {\n  x++;\n}\nconsole.log(x);",
    options: ["3", "2", "4", "0"],
    explain: "Silmukka pysähtyy, kun x < 3 muuttuu epätodeksi eli kun x on 3.",
  },

  // ---------------------------------------------------------------- JS 3
  {
    topic: "js3",
    q: "Mikä on names[2] arvo?",
    code: 'const names = ["Frank", "Scott", "Jasmine", "Don"];',
    options: ["Jasmine", "Scott", "Don", "undefined"],
    explain: "Indeksointi alkaa nollasta: 0 = Frank, 1 = Scott, 2 = Jasmine.",
  },
  {
    topic: "js3",
    q: "Taulukossa on 7 alkiota. Mikä on suurin käytettävä indeksi?",
    options: ["6", "7", "8", "1"],
    explain: "Suurin indeksi on aina taulukon koko miinus yksi.",
  },
  {
    topic: "js3",
    q: "Mikä on tuloksena?",
    code: "console.log([100, 23, 15].sort());",
    options: [
      "[100, 15, 23]",
      "[15, 23, 100]",
      "[100, 23, 15]",
      "[23, 15, 100]",
    ],
    explain:
      "sort() lajittelee oletuksena merkkijonoina aakkosjärjestykseen: \"100\" < \"15\" < \"23\".",
  },
  {
    topic: "js3",
    q: "Miten lajittelet taulukon numbers suuruusjärjestykseen pienimmästä suurimpaan?",
    options: [
      "numbers.sort((a, b) => a - b)",
      "numbers.sort()",
      "numbers.sortNumbers()",
      "numbers.sort((a, b) => b - a)",
    ],
    explain:
      "Vertailufunktio a - b lajittelee nousevasti. b - a lajittelisi laskevasti.",
  },
  {
    topic: "js3",
    q: "Mikä taulukon metodi poistaa ja palauttaa ensimmäisen alkion?",
    options: ["shift()", "pop()", "push()", "reverse()"],
    explain: "shift poistaa ensimmäisen, pop viimeisen alkion. push lisää loppuun.",
  },
  {
    topic: "js3",
    q: "Mitä ohjelma tulostaa?",
    code: "const list = [1, 2];\nlist.push(3);\nconsole.log(list.length);",
    options: [
      "3",
      "2",
      "Virhe: const-muuttujaa ei voi muuttaa",
      "undefined",
    ],
    explain:
      "const estää vain muuttujan uudelleensijoittamisen, ei taulukon sisällön muuttamista.",
  },
  {
    topic: "js3",
    q: "Mikä on muuttujan r arvo?",
    code: 'function greet() {\n  console.log("Hei");\n}\nconst r = greet();',
    options: ["undefined", "null", '"Hei"', "0"],
    explain: "Funktio, jolla ei ole return-lausetta, palauttaa automaattisesti undefined.",
  },
  {
    topic: "js3",
    q: "Mitä tulostuu?",
    code: "function addOne(arr) {\n  arr.push(1);\n}\nconst x = [];\naddOne(x);\nconsole.log(x.length);",
    options: ["1", "0", "undefined", "Virhe"],
    explain:
      "Funktiolle välitetään viittaus samaan taulukkoon, joten funktion tekemä muutos näkyy myös kutsujalle.",
  },
  {
    topic: "js3",
    q: "Mitä tulostuu?",
    code: "function f() {\n  if (true) {\n    var a = 1;\n  }\n  console.log(a);\n}\nf();",
    options: ["1", "undefined", "ReferenceError", "null"],
    explain:
      "var on funktiotason muuttuja, joten se näkyy koko funktiossa myös if-lohkon ulkopuolella.",
  },
  {
    topic: "js3",
    q: "Mitä tapahtuu, jos yrität käyttää lohkossa const-avainsanalla määriteltyä muuttujaa lohkon ulkopuolella?",
    options: [
      "ReferenceError",
      "Muuttujan arvo on undefined",
      "Muuttujan arvo on null",
      "Se toimii normaalisti",
    ],
    explain: "let ja const ovat lohkokohtaisia: ne näkyvät vain siinä lohkossa, jossa ne on määritelty.",
  },
  {
    topic: "js3",
    q: "Mitä tulostuu?",
    code: "const f = (a, b) => a * a + b * b;\nconsole.log(f(3, 5));",
    options: ["34", "16", "225", "undefined"],
    explain: "3 · 3 + 5 · 5 = 9 + 25 = 34.",
  },
  {
    topic: "js3",
    q: "Miten poistat ominaisuuden phone oliosta student?",
    options: [
      "delete student.phone",
      "student.phone = delete",
      "remove(student.phone)",
      "student.phone.remove()",
    ],
    explain: "delete-operaattori poistaa olion ominaisuuden.",
  },
  {
    topic: "js3",
    q: "Mihin this viittaa olion metodin sisällä (esim. this.credits)?",
    options: [
      "Olioon itseensä, jonka metodia kutsutaan",
      "Aina globaaliin window-olioon",
      "Edelliseen funktioon",
      "Funktion paluuarvoon",
    ],
    explain: "Metodin sisällä this viittaa olioon itseensä, joten this.credits on saman olion credits-ominaisuus.",
  },
  {
    topic: "js3",
    q: "Mitä tulostuu?",
    code: "const f = (a) => {\n  a * 2;\n};\nconsole.log(f(4));",
    options: ["undefined", "8", "4", "Virhe"],
    explain:
      "Lohkon sisältävä nuolifunktio tarvitsee return-lauseen. Ilman sitä paluuarvo on undefined.",
  },
  {
    topic: "js3",
    q: "Mitä muuttujaan name sijoitetaan jokaisella kierroksella tässä toistossa?",
    code: "for (const name of names) {\n  console.log(name);\n}",
    options: [
      "Taulukon seuraava alkio",
      "Taulukon seuraava indeksi",
      "Taulukon pituus",
      "Koko taulukko",
    ],
    explain: "for...of antaa jokaisella kierroksella seuraavan alkion, kuten Pythonin for.",
  },

  // ---------------------------------------------------------------- JS 4
  {
    topic: "js4",
    q: "Mitä confirm()-funktio palauttaa?",
    options: [
      "Totuusarvon: true (OK) tai false (Cancel)",
      "Merkkijonon",
      "Luvun 1 tai 0",
      "undefined",
    ],
    explain: "OK-painike antaa true ja Cancel-painike false.",
  },
  {
    topic: "js4",
    q: "Mikä on prompt()-funktion paluuarvo, kun käyttäjä painaa Cancel-painiketta?",
    options: ["null", "Tyhjä merkkijono ''", "false", "undefined"],
    explain:
      "Tyhjällä kentällä OK antaa tyhjän merkkijonon, mutta Cancel antaa arvon null.",
  },
  {
    topic: "js4",
    q: "Mikä funktio hakee dokumentista ensimmäisen CSS-valitsinta vastaavan elementin?",
    options: [
      "document.querySelector()",
      "document.querySelectorAll()",
      "document.createElement()",
      "document.getElements()",
    ],
    explain: "querySelectorAll palauttaa kaikki vastaavat elementit, querySelector vain ensimmäisen.",
  },
  {
    topic: "js4",
    q: 'Mitä tapahtuu, jos kirjoitat button.addEventListener("click", popup())?',
    options: [
      "popup suoritetaan heti, ja kuuntelijaksi annetaan sen paluuarvo",
      "popup suoritetaan vasta, kun painiketta napsautetaan",
      "Selain näyttää syntaksivirheen",
      "popup suoritetaan kahdesti",
    ],
    explain:
      "Sulkeet kutsuvat funktion heti. Tapahtumankäsittelijäksi pitää antaa viittaus funktioon ilman sulkeita: popup.",
  },
  {
    topic: "js4",
    q: "Mitä evt.preventDefault() tekee lomakkeen submit-tapahtumassa?",
    options: [
      "Estää oletustoiminnon eli lomakkeen lähetyksen aiheuttaman sivun uudelleenlatauksen",
      "Tyhjentää lomakkeen kentät",
      "Poistaa lomakkeen sivulta",
      "Lähettää lomakkeen kahdesti",
    ],
    explain: "preventDefault estää selaimen oletustoiminnon, jolloin sivu ei vaihdu.",
  },
  {
    topic: "js4",
    q: "Mikä tapa liittää tapahtumankäsittelijä on suositeltu nykyaikaisessa web-kehityksessä?",
    options: [
      "addEventListener()",
      "HTML:n onclick-attribuutti",
      "button.onclick = ...",
      "document.listen()",
    ],
    explain:
      "addEventListener sallii useita käsittelijöitä samalle tapahtumalle, ja käsittelijän voi poistaa removeEventListenerillä.",
  },
  {
    topic: "js4",
    q: "Miten luet tekstikenttään (input) kirjoitetun tekstin?",
    options: [
      "input.value",
      "input.innerHTML",
      "input.text()",
      "input.content",
    ],
    explain: "Syötekentän sisältö on kentän value-ominaisuudessa.",
  },
  {
    topic: "js4",
    q: 'Mitä tekee document.querySelector("#paragraph").classList.toggle("red")?',
    options: [
      "Kytkee red-luokan päälle tai pois elementiltä",
      "Poistaa elementin",
      "Lisää red-luokan aina",
      "Vaihtaa elementin id:n",
    ],
    explain: "toggle lisää luokan, jos sitä ei ole, ja poistaa sen, jos se on.",
  },
  {
    topic: "js4",
    q: 'Mitä document.createElement("p") tekee?',
    options: [
      "Luo uuden p-elementin, mutta ei vielä lisää sitä dokumenttiin",
      "Luo p-elementin ja lisää sen heti sivulle",
      "Hakee sivun ensimmäisen p-elementin",
      "Poistaa kaikki p-elementit",
    ],
    explain: "Elementti tulee näkyviin vasta, kun se lisätään dokumenttiin esim. appendChild-metodilla.",
  },
  {
    topic: "js4",
    q: "HTML-dokumentissa body-elementin sisällä on h1- ja a-elementti. Mikä on h1- ja a-elementin keskinäinen suhde DOM-puussa?",
    options: [
      "Sisaruksia (sibling)",
      "Vanhempi ja lapsi",
      "Lapsi ja lapsenlapsi",
      "Ei suhdetta",
    ],
    explain: "Samalla vanhemmalla (body) olevat solmut ovat toistensa sisaruksia.",
  },
  {
    topic: "js4",
    q: "Mihin evt.currentTarget viittaa tapahtumankäsittelijässä?",
    options: [
      "Elementtiin, johon tapahtumankäsittelijä on liitetty",
      "Koko ikkunaan (window)",
      "Hiiren sijaintiin",
      "Seuraavaan elementtiin",
    ],
    explain: "currentTarget on se elementti, johon addEventListener kutsuttiin.",
  },
  {
    topic: "js4",
    q: "Mikä ominaisuus sisältää elementin sisällä olevan HTML-koodin?",
    options: ["innerHTML", "innerText", "outerCode", "htmlValue"],
    explain: "innerHTML sisältää HTML-koodin, innerText pelkän tekstin.",
  },
  {
    topic: "js4",
    q: 'Mitä valitsee document.querySelectorAll("li")[1]?',
    options: [
      "Dokumentin toisen li-elementin",
      "Dokumentin ensimmäisen li-elementin",
      "Kaikki li-elementit, joiden id on 1",
      "Virheen, koska querySelectorAll ei palauta taulukkoa",
    ],
    explain: "Kokoelma on taulukkomainen ja indeksointi alkaa nollasta, joten [1] on toinen alkio.",
  },
  {
    topic: "js4",
    q: "Miksi alert()-funktion käyttöä ei suositella nykyaikaisissa verkkosovelluksissa?",
    options: [
      "Se keskeyttää JavaScriptin suorituksen, kunnes käyttäjä sulkee ikkunan, ja heikentää käyttökokemusta",
      "Se ei toimi nykyaikaisissa selaimissa",
      "Se on hitaampi kuin console.log",
      "Se vaatii palvelimen",
    ],
    explain: "alert pysäyttää ohjelman suorituksen odottamaan käyttäjää.",
  },

  // ---------------------------------------------------------------- Python / Flask
  {
    topic: "py",
    q: "Miten Flaskissa määritellään päätepiste /sum?",
    options: [
      "@app.route('/sum') funktion yläpuolella",
      "app.endpoint = '/sum'",
      "def /sum():",
      "app.run('/sum')",
    ],
    explain: "@app.route-dekoraattori kertoo, mikä funktio suoritetaan kun pyyntö tulee kyseiseen polkuun.",
  },
  {
    topic: "py",
    q: "Miten luet kyselyparametrin number1 Flask-päätepisteessä?",
    options: [
      'request.args.get("number1")',
      'request.number1',
      'app.get("number1")',
      'request.body("number1")',
    ],
    explain: "Kyselyparametrit (esim. ?number1=13) luetaan request.args-oliosta get-metodilla.",
  },
  {
    topic: "py",
    q: "Mitä Flask tekee, kun päätepistefunktio palauttaa Pythonin sanakirjan (dict)?",
    options: [
      "Muuntaa sen automaattisesti JSON-muotoiseksi vastaukseksi",
      "Palauttaa virheen 500",
      "Tulostaa sen konsoliin",
      "Tallentaa sen tiedostoon",
    ],
    explain: "Sanakirja muunnetaan JSONiksi automaattisesti.",
  },
  {
    topic: "py",
    q: "Mikä tilakoodi Flaskin automaattisesti palauttaa, kun pyydetään olematonta päätepistettä?",
    options: ["404 (Not Found)", "400 (Bad Request)", "500 (Internal Server Error)", "200 (OK)"],
    explain: "404 tarkoittaa, ettei resurssia löytynyt.",
  },
  {
    topic: "py",
    q: "Mitä IP-osoite 127.0.0.1 tarkoittaa?",
    options: [
      "Silmukkaosoite (localhost): yhteys vain samalta tietokoneelta",
      "Julkinen palvelimen osoite",
      "Osoite, joka toimii vain Flaskissa",
      "Osoite, joka sallii yhteydet kaikilta koneilta",
    ],
    explain: "Silmukkaosoite viittaa aina omaan tietokoneeseen.",
  },
  {
    topic: "py",
    q: "Jos float()-muunnos epäonnistuu virheellisen luvun takia, mikä tilakoodi sopii vastaukseen parhaiten?",
    options: [
      "400 (Bad Request)",
      "500 (Internal Server Error)",
      "404 (Not Found)",
      "200 (OK)",
    ],
    explain:
      "Virhe johtuu asiakkaan antamasta virheellisestä syötteestä, joten 400 kuvaa tilannetta paremmin kuin oletuksena tuleva 500.",
  },
  {
    topic: "py",
    q: "Mitä if __name__ == '__main__': -lause tekee?",
    options: [
      "Suorittaa sisällön vain, jos tiedosto käynnistetään suoraan pääohjelmana",
      "Suorittaa sisällön aina",
      "Suorittaa sisällön vain, kun tiedosto importataan moduulina",
      "Määrittelee Flask-päätepisteen",
    ],
    explain: "Näin app.run() käynnistyy vain kun tiedosto ajetaan suoraan, ei kun se importataan.",
  },
  {
    topic: "py",
    q: "Päätepiste on @app.route('/echo/<text>'). Mihin <text> päätyy?",
    options: [
      "Funktion samannimiseen parametriin text",
      "request.args-olioon",
      "Vastauksen otsikkoon",
      "Globaaliin muuttujaan",
    ],
    explain: "Kulmasulkeissa oleva polun osa välitetään funktion samannimiselle parametrille.",
  },
  {
    topic: "py",
    q: 'Mihin Response-oliolle annettava MIME-tyyppi "application/json" on tarkoitettu?',
    options: [
      "Kertomaan asiakasohjelmalle, että vastaus sisältää JSON-dataa",
      "Salaamaan vastauksen",
      "Nopeuttamaan palvelinta",
      "Määrittämään palvelimen portin",
    ],
    explain: "MIME-tyyppi kertoo, miten vastauksen sisältö pitää tulkita.",
  },
  {
    topic: "py",
    q: "Mitä argumentti use_reloader=True tekee app.run()-kutsussa?",
    options: [
      "Käynnistää palvelimen automaattisesti uudelleen, kun lähdekoodia muutetaan",
      "Lataa selaimen sivun uudelleen",
      "Tyhjentää välimuistin",
      "Käynnistää palvelimen vain kerran",
    ],
    explain: "Näin muutoksia voi testata ilman, että palvelin pitää käynnistää käsin.",
  },
  {
    topic: "py",
    q: "Mikä on päätepiste (endpoint)?",
    options: [
      "Taustapalvelun verkko-osoite, johon lähetetty pyyntö käynnistää tietyn toiminnon",
      "Tietokannan taulu",
      "Selaimen kehittäjätyökalu",
      "Python-virtuaaliympäristö",
    ],
    explain: "Päätepisteiden kautta asiakasohjelma (esim. selain) käyttää taustapalvelun toimintoja.",
  },
  {
    topic: "py",
    q: "Osoitteessa http://127.0.0.1:3000/sum?number1=13&number2=28 mitä number1 ja number2 ovat?",
    options: [
      "Kyselyparametreja (query parameters)",
      "Polkuparametreja",
      "Portteja",
      "Tilakoodeja",
    ],
    explain: "Kyselyparametrit erotetaan polusta kysymysmerkillä ja toisistaan &-merkillä.",
  },

  // ---------------------------------------------------------------- JS 5
  {
    topic: "js5",
    q: "Mitä fetch()-funktio palauttaa?",
    options: [
      "Lupauksen (Promise)",
      "Suoraan JSON-olion",
      "Merkkijonon",
      "Totuusarvon",
    ],
    explain: "fetch palauttaa lupauksen, joka ratkeaa Response-olioksi.",
  },
  {
    topic: "js5",
    q: "Miksi Flask-sovellukseen asennetaan Flask-CORS?",
    options: [
      "Jotta selaimessa toimiva JavaScript saa hakea dataa myös eri alkuperästä (eri portti tai palvelin)",
      "Jotta Flask nopeutuu",
      "Jotta Flask osaa muuntaa sanakirjan JSONiksi",
      "Jotta HTML-lomake toimii",
    ],
    explain:
      "Selain sallii oletuksena pyynnöt vain samaan alkuperään. Flask-CORS lisää vastauksiin tiedon, joka sallii muutkin.",
  },
  {
    topic: "js5",
    q: "Missä await-avainsanaa saa käyttää (ei JS-moduulien ylätasolla)?",
    options: [
      "Vain async-avainsanalla määritellyn funktion sisällä",
      "Missä tahansa funktiossa",
      "Vain for-silmukan sisällä",
      "Vain try-lohkon ulkopuolella",
    ],
    explain: "await toimii vain async-funktioissa.",
  },
  {
    topic: "js5",
    q: "Mitkä ovat lupauksen (Promise) kolme mahdollista tilaa?",
    options: [
      "pending, fulfilled, rejected",
      "start, running, stop",
      "open, closed, error",
      "true, false, null",
    ],
    explain: "Odottava, täyttynyt ja hylätty.",
  },
  {
    topic: "js5",
    q: "Palvelin vastaa fetch-pyyntöön tilakoodilla 404. Mitä fetch tekee?",
    options: [
      "Ei hylkää lupausta, joten tilakoodi pitää tarkistaa itse esim. response.ok-ominaisuudella",
      "Heittää aina virheen, jonka catch kiinni ottaa",
      "Palauttaa arvon null",
      "Sulkee sivun",
    ],
    explain:
      "fetch hylkää lupauksen vain verkkovirheissä. HTTP-virhekoodit pitää käsitellä itse.",
  },
  {
    topic: "js5",
    q: "Miksi response.json()-kutsun eteen kirjoitetaan await?",
    options: [
      "Koska json() palauttaa myös lupauksen",
      "Koska json() on hidas funktio, jota ei voi kutsua ilman awaitia",
      "Koska await muuntaa JSONin merkkijonoksi",
      "Koska json() toimii vain try-lohkossa",
    ],
    explain: "Vastauksen rungon jäsentäminen on asynkronista, joten myös json() palauttaa lupauksen.",
  },
  {
    topic: "js5",
    q: "Missä järjestyksessä rivit tulostuvat?",
    code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");',
    options: ["A, C, B", "A, B, C", "B, A, C", "C, B, A"],
    explain:
      "Takaisinkutsufunktio suoritetaan vasta, kun muu synkroninen koodi on suoritettu, vaikka viive olisi 0.",
  },
  {
    topic: "js5",
    q: "Mitä otsaketta (header) tarvitaan, kun lähetät JSON-dataa POST-pyynnöllä fetchillä?",
    options: [
      '"Content-type": "application/json"',
      '"Accept": "text/plain"',
      '"Method": "JSON"',
      '"Content": "json"',
    ],
    explain: "Otsake kertoo palvelimelle, että pyynnön runko on JSON-muotoista.",
  },
  {
    topic: "js5",
    q: "Milloin try...catch...finally-rakenteen finally-lohko suoritetaan?",
    options: [
      "Aina, onnistui suoritus tai ei",
      "Vain virhetilanteessa",
      "Vain jos virhettä ei tullut",
      "Vain await-kutsun jälkeen",
    ],
    explain: "finally suoritetaan joka tapauksessa.",
  },
  {
    topic: "js5",
    q: "Mikä funktio suorittaa koodia toistuvasti säännöllisin väliajoin?",
    options: ["setInterval", "setTimeout", "setRepeat", "await"],
    explain: "setTimeout suorittaa koodin vain kerran viiveen jälkeen, setInterval toistuvasti.",
  },
  {
    topic: "js5",
    q: "Mitä AJAX-tekniikalla voi tehdä?",
    options: [
      "Päivittää sivun sisältöä hakemalla dataa palvelimelta ilman, että sivua ladataan uudelleen",
      "Ladata CSS-tyylit selaimeen",
      "Käynnistää Flask-palvelimen",
      "Muuntaa Pythonin JavaScriptiksi",
    ],
    explain: "AJAX = Asynchronous JavaScript and XML (nykyisin yleensä JSON).",
  },
  {
    topic: "js5",
    q: "Mitä tulostuu?",
    code: 'const images = [{ name: "Nukkuva kissa" }, { name: "Makaava kissa" }];\nconsole.log(images[1].name);',
    options: ["Makaava kissa", "Nukkuva kissa", "undefined", "[object Object]"],
    explain: "Taulukon toinen alkio on indeksissä 1, ja .name hakee sen name-ominaisuuden.",
  },
  {
    topic: "js5",
    q: "Mitä JSON.stringify() tekee?",
    options: [
      "Muuntaa JavaScript-olion JSON-merkkijonoksi",
      "Muuntaa JSON-merkkijonon JavaScript-olioksi",
      "Lähettää pyynnön palvelimelle",
      "Poistaa olion",
    ],
    explain: "Vastakkainen operaatio, JSON-tekstistä olioksi, tehdään JSON.parse- tai response.json()-kutsulla.",
  },
  {
    topic: "js5",
    q: "Miksi JavaScriptissä verkkopyynnöt tehdään asynkronisesti?",
    options: [
      "JavaScript on yksisäikeinen: synkroninen odotus jäädyttäisi ohjelman ja käyttöliittymän",
      "Koska synkronisia pyyntöjä ei ole olemassa",
      "Koska asynkroninen koodi on aina nopeampaa",
      "Koska selain vaatii sen turvallisuussyistä",
    ],
    explain: "Odotuksen aikana ohjelma voi tehdä muuta ja reagoida käyttäjän toimiin.",
  },
  {
    topic: "js5",
    q: "Mikä JSON-rakenne on [{\"name\": \"A\"}, {\"name\": \"B\"}]?",
    options: [
      "Taulukko, joka sisältää kaksi oliota",
      "Olio, jossa on kaksi taulukkoa",
      "Merkkijono",
      "Kaksi erillistä JSON-dokumenttia",
    ],
    explain: "Hakasulkeet [] kuvaavat taulukkoa ja aaltosulkeet {} olioita.",
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MC_TOPICS, MC_QUESTIONS };
}
