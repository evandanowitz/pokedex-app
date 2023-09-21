let pokemonRepository = (function () {
    let pokemonList = [];
    // Pokémon array in IIFE
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // The URL to fetch Pokémon data from
    let modalContainer = document.querySelector('#myModal');
    // Reference to the HTML element for displaying a modal

    function showModal(title, text, imgSrc) { // Displays a modal with specified title and text and image
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let titleElement = document.createElement('h1');
        titleElement.innerHTML = title; // Set the modal title here
    
        let contentElement = document.createElement('p');
        contentElement.innerHTML = text; // Set the modal content here

        let imgElement = document.createElement('img');
        imgElement.src = imgSrc; // Set the modal Pokemon image here
        imgElement.alt = title; // Set alt text for the image here
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
    }
    
    function hideModal() { // Hides modal by removing "is-visible" class
        modalContainer.classList.remove('is-visible');
    }

        window.addEventListener('keydown', (e) => { // Closes modal when "Escape" key is pressed
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();  
            }
        });

        modalContainer.addEventListener('click', (e) => { // Closes modal when modal overlay is clicked
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

    async function loadList() { // Fetches list of Pokemon and adds them to the pokemonList
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

    function add(pokemon) { // Adds a Pokemon object to the pokemonList
        pokemonList.push(pokemon);
    }

    function getAll() { // Returns the pokemonList
        return pokemonList;
    }

    function addListItem(pokemon) { // Adds a Pokemon to the HTML list of Pokemon
        let pokemonList = document.querySelector('.pokemon-list');

        // Create a div element for the column
        let colDiv = document.createElement('div');

        // Use Bootstrap responsive grid classes to set the number of items per row
        colDiv.classList.add('col-xl-2', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'mb-4');
       
        // Create the list item element
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'mx-auto');

        // Create the button element
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-buttons', 'btn', 'btn-primary', 'btn-sm');
        
        // Set fixed width and height for the buttons
        button.style.width = '150px';
        button.style.height = '40px';

        // Set data attributes to trigger the modal
        button.setAttribute('data-target', '#myModal');
        button.setAttribute('data-toggle', 'modal');

        // Append the button to the list item
        listItem.appendChild(button);
        
        // Append the list item to the column div
        colDiv.appendChild(listItem);
        
        // Append the column div to the row
        pokemonList.appendChild(colDiv);
        
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) { // Displays Pokemon details in modal
        loadDetails(pokemon).then(function () {
            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = ''; // Clear previous content
            
            let modalContent = document.createElement('div');
            modalContent.innerHTML = `
                <h1>${pokemon.name}</h1>
                <p>Height: ${pokemon.height} decimetres</p>
                <img src='${pokemon.imgUrl}' alt='${pokemon.name}'>`;

            modalBody.appendChild(modalContent);

            // Open / Close modal
            $('#myModal').modal('show');
            console.log(pokemon);
        });
    }

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

pokemonRepository.loadList().then(function() { // Called to fetch Pokemon data and initialize the Pokemon list in HTML
    pokemonRepository.getAll().forEach(function(pokemon) { // forEach() loop
        pokemonRepository.addListItem(pokemon); // Call to add list item
    });
});