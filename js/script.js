document.addEventListener("DOMContentLoaded", function () {
    const pesquisarBtn = document.getElementById("pesquisarBtn");
    const buttonPrev = document.querySelector('.btn-prev');
    const buttonNext = document.querySelector('.btn-next');
    const input = document.querySelector('.input__search');
    const pokemonImage = document.querySelector('.pokemon__image');
    const pokemonName = document.querySelector('.pokemon__name');
    const pokemonNumber = document.querySelector('.pokemon__number');
    const pokemonExperience = document.querySelector('.pokemon__experience');
    const pokemonAbilities = document.querySelector('.pokemon__abilities');
    const pokemonWeight = document.querySelector('.pokemon__weight');
    const pokemonHeight = document.querySelector('.pokemon__height');

    let searchPokemon = 1;

    pesquisarBtn.addEventListener("click", function (event) {
        event.preventDefault();
        buscarPokemon();
    });

    async function buscarPokemon() {
        const nomedoPokemon = input.value.toLowerCase().trim();
        if (nomedoPokemon) {
            await fetchPokemon(nomedoPokemon);
        } else {
            console.error("Por favor, digite o nome de um Pokémon válido.");
        }
    }

    async function fetchPokemon(pokemon) {
        const urlDoApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

        try {
            const resposta = await fetch(urlDoApi);

            if (!resposta.ok) {
                throw new Error("Não foi possível encontrar informações para o seu Pokémon informado.");
            }

            const data = await resposta.json();
            mostrarInfoDoPokemon(data);
        } catch (error) {
            console.error("Erro ao buscar as informações dos Pokémon", error);
            limparInfoDoPokemon();
        }
    }

    function mostrarInfoDoPokemon(pokemonData) {
        limparInfoDoPokemon();
        pokemonName.textContent = `Nome: ${pokemonData.name}`;
        pokemonNumber.textContent = ''
        pokemonExperience.textContent = `Experiência Base: ${pokemonData.base_experience}`;
        pokemonAbilities.textContent = `Habilidades: ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}`;
        pokemonWeight.textContent = `Peso: ${pokemonData.weight / 10} kg`;
        pokemonHeight.textContent = `Altura: ${pokemonData.height / 10} m`;
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonImage.alt = pokemonData.name;
        pokemonImage.style.display = 'block';
    }

    function limparInfoDoPokemon() {
        pokemonImage.style.display = 'none';
        pokemonName.textContent = '';
        pokemonNumber.textContent = '';
        pokemonExperience.textContent = '';
        pokemonAbilities.textContent = '';
        pokemonWeight.textContent = '';
        pokemonHeight.textContent = '';
    }

    buttonPrev.addEventListener('click', async () => {
        if (searchPokemon > 1) {
            searchPokemon -= 1;
            await fetchPokemon(searchPokemon);
        }
    });

    buttonNext.addEventListener('click', async () => {
        searchPokemon += 1;
        await fetchPokemon(searchPokemon);
    });
});
