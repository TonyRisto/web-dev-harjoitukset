const numberOfParticipants = prompt("Anna osallistujien lukumäärä.");
const participants = [];

for (let i = 1; numberOfParticipants >= i; i++) {
    participants.push(prompt(`Anna ${i}. nimi`))
}

participants.sort()

for (let i = 0; participants.length > i; i++){
    document.querySelector("#list").innerHTML += "<li>" + participants[i] + "</li>"
}