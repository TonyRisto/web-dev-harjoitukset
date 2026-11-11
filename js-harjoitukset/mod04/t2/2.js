const element = document.querySelector("#target");
const li1 = document.createElement("li");
const li2 = document.createElement("li");
const li3 = document.createElement("li");


li1.textContent = "First item";
element.appendChild(li1);
li2.textContent = "Second item";
element.appendChild(li2);
li3.textContent = "Third item";
element.appendChild(li3);