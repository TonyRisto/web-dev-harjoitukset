"use strict";
console.log("I'm printing to console!");

const name = prompt("Mikä on nimesi?");
document.querySelector("#greeting").innerHTML = "Hei, " + name;

const n1 = parseInt(prompt("Anna 1. luku"));
const n2 = parseInt(prompt("Anna 2. luku"));
const n3 = parseInt(prompt("Anna 3. luku"));

const prefix = `Numeroiden ${n1}, ${n2} ja ${n3}`

document.querySelector("#prefix").innerHTML = prefix
document.querySelector("#sum").innerHTML = "Summa: " + (n1 + n2 + n3);
document.querySelector("#dot").innerHTML = "Tulo: "  + (n1 * n2 * n3);
document.querySelector("#average").innerHTML = "Keskiarvo: " + (n1 + n2 + n3) / 3