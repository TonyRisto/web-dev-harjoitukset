const dogNames = [];

for (let i = 1; dogNames.length < 6; i++) {
    dogNames.push(prompt(`Anna ${i}. koiran nimi.`))
}
dogNames.sort();
dogNames.reverse();

dogNames.forEach(dog => {
    const li = document.createElement("li");
    li.textContent = dog;
    document.querySelector("#list").append(li);
})