// // Pokémon array in IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Pikachu', height: 1, types: ['Electric']},
        {name: 'Bulbasaur', height: 2, types: ['Grass', 'Poison']},
        {name: 'Charizard', height: 5, types: ['Fire', 'Flying']}
    ];
    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function showDetails(pokemon) {
        console.log(pokemon);
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