class Pokemon {

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    show () {
        console.log(`name: ${this.name}, level: ${this.level}`);
    }
    valueOf () {
        return `name: ${this.name}, level: ${this.level}`;
    }
}

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

let chikorita = new Pokemon('Chikorita', 152);
let beirifu = new Pokemon('Beirifu', 153);
let meganiumu = new Pokemon('Meganiumu', 154);
let pupurin = new Pokemon('Pupurin', 174);
let togepi = new Pokemon('Togepi', 175);


let lost = new PokemonList(chikorita, beirifu, meganiumu);
let found = new PokemonList(pupurin, togepi);

//lost.show();
found.add('Hinoarashi', 155);
//found.show();
let elem = lost.pokemons.splice(lost.indexOf(lost.find(item => item.name === 'Beirifu')), 1);
found.pokemons.push(elem[0]);

lost.show();
found.show();
console.log(found.max().valueOf());
