let pokemonRepository = (function () {
    let pokemonList = [];
    // Pokémon array in IIFE
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // The URL to fetch Pokémon data from
    let modalContainer = document.querySelector('#modal-container');
    // Reference to the HTML element for displaying a modal

    }

    function add(pokemon) { // Adds a Pokemon object to the pokemonList
        pokemonList.push(pokemon);
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            // Pokémon's details logged to the console upon clicking its button
            console.log(pokemon);
        });

    function getAll() { // Returns the pokemonList
        return pokemonList;
    }

    function addListItem(pokemon) { // Adds a Pokemon to the HTML list of Pokemon
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
            button.addEventListener('click', function(event) {
            // add click event listener to button
                console.log('Button clicked:', pokemon.name);
                showDetails(pokemon);
            });
        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons');
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

    async function loadDetails(item) { // Fetches additional details for a Pokemon
    let url = item.detailsUrl; // GET Pokémon details using URL from Pokémon object in parameter (item)
        try {
            const response = await fetch(url);
            const details = await response.json();
            // Now we add the details to the item
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        } catch (e) {
            console.error(e);
        }
    }

    return { // IIFE returns object that exposes methods for interacting with the Pokemon data and modal functionality
    // All returns from IIFE with matching keywords and values
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal
    };
})();
    
pokemonRepository.loadList().then(function() {
// Called to fetch Pokemon data and initialize the Pokemon list in HTML
    pokemonRepository.getAll().forEach(function(pokemon) {
    // forEach() loop
        pokemonRepository.addListItem(pokemon);
        // Call to add list item
    });
});

document.querySelector('#show-modal').addEventListener('click', () => {
// When "Show Modal" button is clicked, showModal function is called to display modal
    pokemonRepository.showModal('Pokémon Modal', 'Details of all Pokémon can be found here!');
});