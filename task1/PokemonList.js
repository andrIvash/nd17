const Pokemon = require('./Pokemon');

class PokemonList extends Array {

  add (name, level) {
    this.push(new Pokemon(name, level));
  }

  show () {
    // this.forEach(item => {
    //   console.log(item.show());
    // });
    // console.log(`Total: ${this.length}`);
    return {pokemons:this, total: this.length};
  }

  max () {
    return this.reduce((max, item) => (item > max) ? item : max);
  }
}

module.exports = PokemonList;