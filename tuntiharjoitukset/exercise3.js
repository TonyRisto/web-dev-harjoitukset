const names = [];

while (names.length < 5) {
    let name = prompt("Anna nimi")
    console.log(name)
    names.push(name)
}

document.querySelector("#result").textContent = "Nimet: " + names;
document.querySelector("#last").textContent = "Viimeinen: " + names[names.length - 1];
names.sort();
document.querySelector("#first").textContent = "Ensimmäinen kun alkio on järjestetty: " + names[0];
names.shift()
document.querySelector("#removed").textContent = "Koko lista kun eka on poistettu " + names;