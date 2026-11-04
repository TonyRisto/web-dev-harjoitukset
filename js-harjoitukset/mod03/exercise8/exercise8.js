const listOfNames = ["Johnny", "DeeDee", "Joey","Marky"];

function concat(list) {
    let concated = "";
    for (let i = 0; i < list.length; i++) {
        concated += list[i];
    }
    return concated;
}

const element = document.querySelector("div");
const paragraph = document.createElement("p");
paragraph.textContent = concat(listOfNames);
element.append(paragraph);