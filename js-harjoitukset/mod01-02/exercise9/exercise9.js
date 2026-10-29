const number = prompt("Anna luku");
const result = document.querySelector("#result");
let sum = 0;

for (let i = 1; i <= number; i++) {
    if (number % i == 0){
        sum += 1;
    }
}

if (sum == 2) {
    result.innerHTML += `<p>${number} on alkuluku</p>`;
} else {
    result.innerHTML += `<p>${number} ei ole alkuluku</p>`;
}