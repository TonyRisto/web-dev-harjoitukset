let text = document.querySelector("#hello");

text.textContent = "hei maailma";

document.getElementById("näytä").addEventListener("click", () => {
    let nimi = document.querySelector("#nimi");
    let arvosana = document.querySelector("#arvosana");
    let nimesi = `Terve ${nimi.value}`;
    let arvosanasi = `Arvosanasi: ${arvosana.value}`;
    document.querySelector("#tulos").innerHTML = nimesi + "<br>" + arvosanasi;
})

document.getElementById("laske").addEventListener("click", () => {
    let python = document.querySelector("#Python");
    let project = document.querySelector("#Project");
    let math = document.querySelector("#Math");

    let average = (parseInt(python.value) + parseInt(project.value) + parseInt(math.value)) / 3;
    document.querySelector("#toinentulos").innerHTML = "Keskiarvo: " + average;
})