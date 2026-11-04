const numbers = [1, 3, 6, 8, 10, 15, 20, 50, 100];

function even(list) {
    const newNumbers = [];
    
    for (let i = 0; i < list.length; i++) {
        if (list[i] % 2 == 0) {
            newNumbers.push(list[i]);
        }
    }
    return newNumbers;
}

const main = document.querySelector("main");
const p1 = document.createElement("p");
const p2 = document.createElement("p");

p1.textContent = "Alkuperäinen lista: " + numbers;
main.append(p1);
p2.textContent = "Uusi lista jossa pelkästään parillisia lukuja: " + even(numbers);
main.append(p2);