const numbers = [];

while (numbers.length < 5) {
    numbers.push(parseInt(prompt("Anna numero")))
}

for (let number = 1; number <= numbers.length; number++) {
    console.log(numbers[numbers.length - number])
}