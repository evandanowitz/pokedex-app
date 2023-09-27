let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#myModal');

    function showModal(title, text, imgSrc) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
    }

    async function loadList() {
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        } catch (e) {
            console.error(e);
        }
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');

        let colDiv = document.createElement('div');
        colDiv.classList.add('col-xl-2', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'mb-4');
       
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'mx-auto');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons', 'btn', 'btn-primary', 'btn-sm');
        
        button.style.width = '150px';
        button.style.height = '40px';

        button.setAttribute('data-target', '#myModal');
        button.setAttribute('data-toggle', 'modal');

        listItem.appendChild(button);
        colDiv.appendChild(listItem);
        pokemonList.appendChild(colDiv);
        
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = '';
            
            let modalContent = document.createElement('div');
            modalContent.innerHTML = `
                <h1>${pokemon.name}</h1>
                <p>Height: ${pokemon.height} decimetres</p>
                <p>Type(s): ${pokemon.types.join(', ')}</p> <!-- Display types as a comma-separated list -->
                <img src='${pokemon.imgUrl}' alt='${pokemon.name}'>`;

            modalBody.appendChild(modalContent);
        });
    }

    async function loadDetails(item) {
    let url = item.detailsUrl;
        
        try {
            const response = await fetch(url);
            const details = await response.json();
            
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map(type => type.type.name);
        } catch (e) {
            console.error(e);
        }
    }

    return {
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
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});