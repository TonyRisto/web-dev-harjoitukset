'use strict';
const names = ['John', 'Paul', 'Jones'];

for (let i = 0; i < names.length; i++) {
    const element = document.querySelector("#target");
    element.innerHTML += `<li>${names[i]}</li>`
}