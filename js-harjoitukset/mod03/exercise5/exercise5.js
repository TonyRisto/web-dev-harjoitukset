const numbers = [];
let number;

while (true) {
    number = parseInt(prompt("Anna luku"));

    if (numbers.includes(number)) {
        alert("Luku löytyy jo listasta!");
        break;
    }

    numbers.push(number);
}

console.log(numbers.sort((a, b) => a - b));