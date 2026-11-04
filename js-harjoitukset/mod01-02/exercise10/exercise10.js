const amountOfDice = parseInt(prompt("Anna noppien lukumäärä"));
const sumOfTheDice = parseInt(prompt("Anna noppien summa"));
const throws = parseInt(prompt("Anna heittojen lukumäärä"))

function throwDice(numberOfDice) {
    let sumOfThrows = 0;

    for (let i = 0; i < numberOfDice; i++) {
        sumOfThrows += Math.floor(Math.random() * 6) + 1;
    }
    return sumOfThrows;
}

function simulate(throws) {
    let sumsMatched = 0;

    for (let i = 0; i < throws; i++) {
        let sum = throwDice(amountOfDice);

        if (sum == sumOfTheDice) {
            sumsMatched += 1;
        }
    }
    return sumsMatched;
}

const probability = ((simulate(throws) / throws) * 100).toFixed(2);
const main = document.querySelector("main");
const p = document.createElement("p");
p.textContent = `Todennäköisyys saada summa ${sumOfTheDice} noppien lukumäärällä ${amountOfDice} heittojen lukumäärällä ${throws} on ${probability}%.`;
main.append(p);