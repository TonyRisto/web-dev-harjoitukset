const n1 = document.querySelector("#num1");
const n2 = document.querySelector("#num2");
const start = document.querySelector("#start")

let num1 = 0;
let num2 = 0;

start.addEventListener("click", () => {
    num1 = Number(n1.value);
    num2 = Number(n2.value);

    let choice = document.getElementById("operation").value;

    let result = 0;
    if (choice == "add") {
        result = num1 + num2;
    } else if (choice == "sub") {
        result = num1 - num2;
    } else if (choice == "multi") {
        result = num1 * num2;
    } else if (choice == "div") {
        result = num1 / num2;
    }

    const p = document.querySelector("#result");
    p.textContent = `Vastaus on: ${result}`;
});