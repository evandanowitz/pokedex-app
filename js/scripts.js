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
    function loadList() {
        // GET complete list of Pokemon from API
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
   function loadDetails(item) {
    // GET Pokémon details using URL from Pokémon object in parameter (item)
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    // Now we add the details to the item
    }).then(function (details) {
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
   }

    return {
        // All returns from IIFE with matching keywords and values
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// calls .add Pokémon
pokemonRepository.add({name: 'Charmander', height: 4, types: ['Poison']});
// calls array to console
console.log(pokemonRepository.getAll());

// forEach() loop
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});