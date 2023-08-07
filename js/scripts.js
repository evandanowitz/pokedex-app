// Creates an empty array
let pokemonList = [
    {name: 'Pikachu'},
    {name: 'Bulbasaur'},
    {name: 'Charizard'}
];

// Create object using specific index
pokemonList[0] = {
    name: 'Pikachu',
    height: 1,
    types: ['Electric']
};
// Create object using specific index
pokemonList[1] = {
    name: 'Bulbasaur',
    height: 2,
    types: ['Grass','Poison']
};
// Create object using specific index
pokemonList[2] = {
    name: 'Charizard',
    height: 5,
    types: ['Fire','Flying']
};

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i]) {
        document.write([pokemonList[i].name] + ' (height: ' + [pokemonList[i].height] + ')<br><br>')
    }
    if (pokemonList[i].height > 3) {
        document.write([pokemonList[i].name] + ' (height: ' + [pokemonList[i].height] + ')' + ' - Wow, that\'s big!')
    }
}