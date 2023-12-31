document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const pokemonNameOrId = searchInput.value.toLowerCase().replace(/♀/, '-f').replace(/♂/, '-m').replace(/\./g, '');
        if (pokemonNameOrId === 'red') {
            alert('Pokémon not found');
            return;
        }
        fetchPokemonData(pokemonNameOrId);
    });
});

async function fetchPokemonData(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
        if (!response.ok) throw new Error('Pokémon not found');

        const pokemonData = await response.json();
        displayPokemonData(pokemonData);
    } catch (error) {
        alert(error.message);
    }
}

function displayPokemonData(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;
    document.getElementById('hp').textContent = data.stats[0].base_stat;
    document.getElementById('attack').textContent = data.stats[1].base_stat;
    document.getElementById('defense').textContent = data.stats[2].base_stat;
    document.getElementById('special-attack').textContent = data.stats[3].base_stat;
    document.getElementById('special-defense').textContent = data.stats[4].base_stat;
    document.getElementById('speed').textContent = data.stats[5].base_stat;

    const typesElement = document.getElementById('types');
    typesElement.innerHTML = ''; // Clear any existing types

    // Iterate over each type and create a new div element for it
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('div');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typesElement.appendChild(typeElement);
    });

    const spriteElement = document.getElementById('sprite');
    spriteElement.src = data.sprites.front_default;
    spriteElement.style.display = 'block'; // Display the sprite image
}

