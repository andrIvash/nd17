const Pokemon = require('./pokemon');

class PokemonList extends Array {

    add (name, level) {
        this.push(new Pokemon(name, level));
    };

    show () {
        this.forEach(item => {
            item.show();
        });
        console.log(`Total: ${this.length}`);
    };

    max () {
        return this.reduce((max, item) => (item.level > max.level) ? item : max);
    }
}

module.exports = PokemonList;