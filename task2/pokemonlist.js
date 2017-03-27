const Pokemon = require('./pokemon');

class PokemonList extends Array {

    constructor(...pokemons) {
        super(...pokemons);
        this.pokemons = pokemons;
    }

    add (name, level) {
        this.pokemons.push(new Pokemon(name, level));
    }

    show () {
        this.pokemons.map(item => {
            item.show();
        });
        console.log(`Total: ${this.pokemons.length}`);
    }

    max () {
        return this.pokemons.reduce((max, item) => (item.level > max.level) ? item : max);
    }
}

module.exports = PokemonList;