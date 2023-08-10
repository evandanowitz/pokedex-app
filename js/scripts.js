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

   return {
        getAll: getAll,
        add: add,
    }
})();

// calls .add Pokémon
pokemonRepository.add({name: 'Charmander', height: 4, types: ['Poison']});
// calls array to console
console.log(pokemonRepository.getAll());

// forEach() loop
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 3) {
        document.write(pokemon.name + ' (Height: ' + pokemon.height + ' feet' + '),' + ' (Type: ' + pokemon.types + ')' + ' - Wow, that\'s big!' + '<br><br>');
    } else {
        document.write(pokemon.name + ' (Height: ' + pokemon.height + ' feet' + '),' + ' (Type: ' + pokemon.types + ')' + '<br><br>');
    }
});