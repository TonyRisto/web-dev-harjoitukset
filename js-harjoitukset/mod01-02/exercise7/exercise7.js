const numberOfThrows = prompt("Monta kertaa noppaa heitetään?");

let sum = 0;

for (let i = 1; i <= numberOfThrows; i++) {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    sum = sum + diceNumber;
    result.innerHTML += `<p>Heitto ${i}: ${diceNumber}</p>`;
}

result.innerHTML += `<h1>Yhteensä: ${sum}`;