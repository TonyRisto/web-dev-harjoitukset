const calculationInput = document.querySelector("#calculation");
const calculationButton = document.querySelector("#start");

const plus = "+";
const minus = "-";
const multiply = "*";
const division = "/";


calculationButton.addEventListener("click", () => {
    const calculation = calculationInput.value;
    const calculationArray = calculation.split(/([+\/*-])/);
    const numbers = [];

    for (let item of calculationArray) {
        let number = Number(item);
        if (typeof number === "number" && !isNaN(number)) {
            numbers.push(number);
        }
    }
    if (calculationArray.includes(plus)) {
        let plusIndex = calculationArray.indexOf(plus);
        console.log(plusIndex);
    }
})
