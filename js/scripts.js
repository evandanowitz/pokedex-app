// Creates an empty array
let pokemonList = [
    {name: 'Pikachu', height: 1, types: ['Electric']},
    {name: 'Bulbasaur', height: 2, types: ['Grass','Poison']},
    {name: 'Charizard', height: 5, types: ['Fire','Flying']}
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i]) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + (pokemonList[i].height > 3 ? ' - Wow, that\'s big!' : '') + '<br><br>');
    }
}

function divide (dividend, divisor) {
    if (divisor === 0) {
        return 'You\'re trying to divide by zero.'
    } else {
        let result = dividend / divisor;
        return result;
    }
}