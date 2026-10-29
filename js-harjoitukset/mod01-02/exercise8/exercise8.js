const startYear = parseInt(prompt("Anna alkuvuosi"));
const endYear = parseInt(prompt("Anna loppuvuosi"));
const result = document.querySelector("#result");

for (let i = startYear; i <= endYear; i++) {
    if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
        result.innerHTML += `<li>${i} oli karkausvuosi.</li>`;
    }
}