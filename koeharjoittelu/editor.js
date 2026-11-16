"use strict";

/**
 * IDE-tyyliset muokkaustoiminnot koodaustehtävien tekstikentälle.
 *
 *  - Enter: säilyttää sisennyksen, lisää sisennyksen avaavan sulkeen jälkeen
 *    ja jakaa {} / () / [] -parin omille riveilleen
 *  - Tab / Shift+Tab: sisentää ja pienentää sisennystä (myös usealle riville)
 *  - Backspace: poistaa tyhjän sulkeparin tai yhden sisennystason kerrallaan
 *  - Sulkeiden ja lainausmerkkien automaattinen sulkeminen sekä ohitus
 *  - } ) ] kirjoitettaessa rivin alussa sisennys pienenee
 *  - Ctrl/Cmd + / : kommentoi tai poista kommentti riveiltä
 *  - Esc ja sen jälkeen Tab siirtää fokuksen pois kentästä (saavutettavuus)
 *
 * Varsinainen logiikka on puhdas funktio computeEdit(), jota testataan
 * komentoriviltä (node selftest.js).
 */

const Editor = (() => {
  const INDENT = "  ";
  const PAIRS = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'", "`": "`" };
  const OPENERS = ["(", "[", "{"];
  const CLOSING_BRACKETS = [")", "]", "}"];
  const QUOTES = ['"', "'", "`"];

  function lineStart(value, pos) {
    return pos <= 0 ? 0 : value.lastIndexOf("\n", pos - 1) + 1;
  }

  function lineEnd(value, pos) {
    const index = value.indexOf("\n", pos);
    return index === -1 ? value.length : index;
  }

  function makeEdit(start, end, text, selStart, selEnd = selStart) {
    return { start, end, text, selStart, selEnd };
  }

  /**
   * Muuntaa kaikki valinnan koskettamat rivit funktiolla mapLines ja
   * laskee uuden valinnan.
   */
  function transformLines(value, selStart, selEnd, mapLines) {
    const blockStart = lineStart(value, selStart);

    // Jos valinta päättyy rivin alkuun, sitä riviä ei käsitellä.
    let endPos = selEnd;
    if (selEnd > selStart && selEnd === lineStart(value, selEnd)) endPos = selEnd - 1;

    const blockEnd = lineEnd(value, endPos);
    const lines = value.slice(blockStart, blockEnd).split("\n");
    const newLines = mapLines(lines);
    const text = newLines.join("\n");

    const firstDelta = newLines[0].length - lines[0].length;
    const totalDelta = text.length - (blockEnd - blockStart);
    // Valinta, joka alkaa rivin alusta, pysyy rivin alussa (koko rivi pysyy valittuna).
    const keepAtLineStart = selStart !== selEnd && selStart === blockStart;
    const newSelStart = keepAtLineStart
      ? blockStart
      : Math.max(blockStart, selStart + firstDelta);
    const newSelEnd = Math.max(newSelStart, selEnd + totalDelta);
    return makeEdit(blockStart, blockEnd, text, newSelStart, newSelEnd);
  }

  const indentLines = (lines) =>
    lines.map((line) => (line.trim() === "" ? line : INDENT + line));

  const outdentLines = (lines) =>
    lines.map((line) =>
      line.startsWith("\t") ? line.slice(1) : line.replace(new RegExp(`^ {1,${INDENT.length}}`), ""),
    );

  function toggleComment(lines) {
    const nonEmpty = lines.filter((line) => line.trim() !== "");
    if (nonEmpty.length === 0) return lines;

    if (nonEmpty.every((line) => /^\s*\/\//.test(line))) {
      return lines.map((line) => line.replace(/^(\s*)\/\/ ?/, "$1"));
    }
    const column = Math.min(...nonEmpty.map((line) => line.match(/^[ \t]*/)[0].length));
    return lines.map((line) =>
      line.trim() === "" ? line : line.slice(0, column) + "// " + line.slice(column),
    );
  }

  /**
   * Laskee, miten näppäinpainallus muuttaa tekstiä.
   * Palauttaa null, jos selaimen oletustoiminto saa hoitaa painalluksen.
   * Muuten palauttaa { start, end, text, selStart, selEnd }: korvaa välin
   * [start, end) tekstillä `text` ja aseta valinnaksi [selStart, selEnd]
   * (sijainnit uudessa tekstissä).
   */
  function computeEdit(value, selStart, selEnd, key, mods = {}) {
    const { shift = false, ctrl = false, meta = false } = mods;
    const collapsed = selStart === selEnd;
    const before = value[selStart - 1];
    const after = value[selEnd];

    if (ctrl || meta) {
      return key === "/" ? transformLines(value, selStart, selEnd, toggleComment) : null;
    }

    if (key === "Enter") {
      const prefix = value.slice(lineStart(value, selStart), selStart);
      const indent = prefix.match(/^[ \t]*/)[0];

      if (OPENERS.includes(before) && after === PAIRS[before]) {
        const text = "\n" + indent + INDENT + "\n" + indent;
        return makeEdit(selStart, selEnd, text, selStart + 1 + indent.length + INDENT.length);
      }
      const text = "\n" + indent + (OPENERS.includes(before) ? INDENT : "");
      return makeEdit(selStart, selEnd, text, selStart + text.length);
    }

    if (key === "Tab") {
      if (shift) return transformLines(value, selStart, selEnd, outdentLines);
      if (value.slice(selStart, selEnd).includes("\n")) {
        return transformLines(value, selStart, selEnd, indentLines);
      }
      const column = selStart - lineStart(value, selStart);
      const text = " ".repeat(INDENT.length - (column % INDENT.length));
      return makeEdit(selStart, selEnd, text, selStart + text.length);
    }

    if (key === "Backspace") {
      if (!collapsed || selStart === 0) return null;

      const isPair =
        (OPENERS.includes(before) && after === PAIRS[before]) ||
        (QUOTES.includes(before) && after === before);
      if (isPair) return makeEdit(selStart - 1, selStart + 1, "", selStart - 1);

      const prefix = value.slice(lineStart(value, selStart), selStart);
      if (/^ +$/.test(prefix)) {
        const remove = prefix.length % INDENT.length || INDENT.length;
        return makeEdit(selStart - remove, selStart, "", selStart - remove);
      }
      return null;
    }

    if (key.length !== 1) return null;

    // Ohita jo olemassa oleva sulkeva merkki.
    if (collapsed && after === key && (CLOSING_BRACKETS.includes(key) || QUOTES.includes(key))) {
      return makeEdit(selStart, selStart, "", selStart + 1);
    }

    // Sulkeva sulku rivin alussa pienentää sisennystä.
    if (CLOSING_BRACKETS.includes(key)) {
      const prefix = value.slice(lineStart(value, selStart), selStart);
      if (collapsed && /^ +$/.test(prefix)) {
        const remove = Math.min(INDENT.length, prefix.length);
        return makeEdit(selStart - remove, selEnd, key, selStart - remove + 1);
      }
      return null;
    }

    // Avaava sulku tai lainausmerkki lisää parin.
    const closer = PAIRS[key];
    if (closer !== undefined) {
      if (!collapsed) {
        const selected = value.slice(selStart, selEnd);
        return makeEdit(selStart, selEnd, key + selected + closer, selStart + 1, selStart + 1 + selected.length);
      }
      if (QUOTES.includes(key)) {
        // Ei paria sanan sisällä (esim. don't).
        if (/\w/.test(before ?? "") || /\w/.test(after ?? "")) return null;
      } else if (after !== undefined && !/[\s)\]}.,;:]/.test(after)) {
        return null;
      }
      return makeEdit(selStart, selEnd, key + closer, selStart + 1);
    }

    return null;
  }

  /** Toteuttaa muutoksen tekstikentässä siten, että kumoaminen (Ctrl/Cmd+Z) toimii. */
  function applyEdit(textarea, edit) {
    const value = textarea.value;
    const expected = value.slice(0, edit.start) + edit.text + value.slice(edit.end);

    if (edit.start !== edit.end || edit.text !== "") {
      textarea.setSelectionRange(edit.start, edit.end);
      let done = false;
      try {
        done =
          edit.text === ""
            ? document.execCommand("delete")
            : document.execCommand("insertText", false, edit.text);
      } catch (error) {
        done = false;
      }
      if (!done || textarea.value !== expected) {
        textarea.value = expected;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    textarea.setSelectionRange(edit.selStart, edit.selEnd);
  }

  /** Liittää IDE-tyyliset toiminnot tekstikenttään. */
  function attach(textarea) {
    let tabLeavesField = false;
    const modifierKeys = ["Shift", "Control", "Alt", "Meta", "AltGraph", "CapsLock"];

    textarea.addEventListener("blur", () => {
      tabLeavesField = false;
    });

    textarea.addEventListener("keydown", (event) => {
      if (event.isComposing || modifierKeys.includes(event.key)) return;

      if (event.key === "Escape") {
        tabLeavesField = true;
        return;
      }
      if (event.key === "Tab" && tabLeavesField) {
        tabLeavesField = false;
        return; // selain siirtää fokuksen
      }
      tabLeavesField = false;

      const edit = computeEdit(
        textarea.value,
        textarea.selectionStart,
        textarea.selectionEnd,
        event.key,
        {
          shift: event.shiftKey,
          // AltGr (Windows) näkyy ctrl+alt-yhdistelmänä, eikä se ole pikanäppäin.
          ctrl: event.ctrlKey && !event.altKey,
          meta: event.metaKey,
        },
      );
      if (!edit) return;

      event.preventDefault();
      applyEdit(textarea, edit);
    });
  }

  return { computeEdit, attach, INDENT };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Editor;
}
