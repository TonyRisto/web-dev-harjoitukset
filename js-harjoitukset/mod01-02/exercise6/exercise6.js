const answer = confirm("Lasketaanko neliöjuuri?");

let result;

if (answer == false) {
    result = "Neliöjuurta ei lasketa";
} else {
    const input = prompt("Anna luku");
    const number = Number(input);

    if (number < 0) {
        result = "Negatiivisen luvun neliöjuurta ei ole määritelty.";
    } else {
        result = Math.sqrt(number);
    }
}

document.querySelector("#answer").innerHTML = result;