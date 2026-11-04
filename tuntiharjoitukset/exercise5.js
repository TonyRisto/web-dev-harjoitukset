const element = document.getElementById("main");

const p = document.createElement("p");
p.textContent = "tekstiä";
element.append(p);

const div = document.createElement("div");
const h1 = document.createElement("h1");
h1.textContent = "Tekstiä";
div.append(h1);
element.append(div);

const input = document.createElement("input");
input.placeholder = "Paina enter";

element.append(input);

input.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        console.log("Enteriä painettu", input.value);
    }
}) 