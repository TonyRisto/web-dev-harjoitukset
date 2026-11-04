const numbers = [];

do {
    input = parseInt(prompt("Anna luku"));

    if (input !== 0) {
        numbers.push(input);
    }

} while (input !== 0);

console.log(numbers.sort((a, b) => b - a))