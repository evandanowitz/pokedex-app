// // Pokémon array in IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            // Pokémon's details logged to the console upon clicking its button
            console.log(pokemon);
        });
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
            // add click event listener to button
            button.addEventListener('click', function(event) {
                showDetails(pokemon);
            })
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }
   return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

// calls .add Pokémon
pokemonRepository.add({name: 'Charmander', height: 4, types: ['Poison']});
// calls array to console
console.log(pokemonRepository.getAll());

// forEach() loop
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});