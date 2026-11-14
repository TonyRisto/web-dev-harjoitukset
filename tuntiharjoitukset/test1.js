async function fetchData(address) {
    try {
        const response = await fetch(address);

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error(`Virhe: ${response.status}`);
        }
    } catch (error) {
        console.log(`Virhe: ${error}`)
    }
}

async function handlePokemonClick(event, address) {
    let pokemonData = await fetchData(address);
    let pokemonDiv = event.target.parentElement;
    for (let type of pokemonData.types) {
        let typeText = document.createElement("p");
        typeText.textContent = type.type.name;
        pokemonDiv.appendChild(typeText);
    }
}

async function createPokemonView() {
    let promise = await fetchData("https://pokeapi.co/api/v2/pokemon/");
    const pokemonDiv = document.querySelector("#pokemons");

    for (let pokemon of promise.results) {
        let pokemonText = document.createElement("p");
        let onePokemonDiv = document.createElement("div");
        pokemonText.textContent = pokemon.name;

        pokemonText.addEventListener("click", (event) => handlePokemonClick(event, pokemon.url))
        onePokemonDiv.appendChild(pokemonText);
        pokemonDiv.appendChild(onePokemonDiv);
    }

}

createPokemonView();