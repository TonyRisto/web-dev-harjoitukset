function diceThrow() {
    return Math.floor(Math.random() * 6) + 1;
}

do {
    number = diceThrow();
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    li.textContent = number;
    ul.append(li);
} while (number != 6);
