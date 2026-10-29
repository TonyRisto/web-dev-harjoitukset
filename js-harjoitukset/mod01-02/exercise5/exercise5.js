const year = parseInt(prompt("Anna vuosiluku"));

if (year % 400 == 0) {
    answer = `${year} oli karkausvuosi.`;
} else if (year % 4 == 0 && year % 100 != 0) {
    answer = `${year} oli karkausvuosi.`;
} else {
    answer = `${year} ei ollut karkausvuosi.`;
}

document.querySelector("#year").innerHTML = answer;