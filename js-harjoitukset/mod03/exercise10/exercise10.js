const numberOfCandidates = parseInt(prompt("Anna ehdokkaiden lukumäärä"));
const candidates = [];

for (let i = 1; i <= numberOfCandidates; i++) {
    let candidate = prompt(`Anna ${i}. ehdokkaan nimi`);
    let votes = 0;

    candidates.push({ candidate, votes});
}

const numberOfVoters = parseInt(prompt("Anna äänestäjien lukumäärä"));

for (let i = 0; i < numberOfVoters; i++) {
    let vote = prompt("Ketä haluat äänestää?")

    for (let i = 0; i < candidates.length; i++) {
        if (vote == candidates[i].candidate) {
            candidates[i].votes += 1;
        }
    }
}

candidates.sort( (a, b) => b.votes - a.votes);

const structure = document.querySelector("#structure");
const winner = document.createElement("p");
const resultsLabel = document.createElement("p");

winner.textContent = `Voittaja on ${candidates[0].candidate} ${candidates[0].votes} äänellä.`
structure.append(winner);

resultsLabel.textContent = "Tulokset:"
structure.append(resultsLabel);

candidates.forEach(candidate => {
    const p = document.createElement("p");
    p.textContent = `${candidate.candidate}: ${candidate.votes} ääntä`;
    structure.append(p);
});