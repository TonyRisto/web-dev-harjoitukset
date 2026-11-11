'use strict';
const students = [
  {
    name: 'John',
    id: '2345768',
  },
  {
    name: 'Paul',
    id: '2134657',
  },
  {
    name: 'Jones',
    id: '5423679',
  },
];
const element = document.querySelector("#target");

for (let i = 0; i < 3; i++) {
  const option = document.createElement("option");
  option.value = students[i].id
  option.innerHTML += `${students[i].name}`;
  element.appendChild(option);
}