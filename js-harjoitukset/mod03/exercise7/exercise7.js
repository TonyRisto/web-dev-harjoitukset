const amount = parseInt(prompt("Anna nopan tahkojen määrä."));

function diceThrow(amount) {
    return Math.floor(Math.random() * amount) + 1;
}

do {
    number = diceThrow(amount);
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    li.textContent = number;
    ul.append(li);
} while (number != amount);
