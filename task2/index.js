const Hidenseek = require('./hidenseek');
const Pokemon = require('./pokemon');
const PokemonList  = require('./pokemonlist');


let chikorita = new Pokemon('Chikorita', 152);
let beirifu = new Pokemon('Beirifu', 153);
let meganiumu = new Pokemon('Meganiumu', 154);

let lost = new PokemonList(chikorita, beirifu, meganiumu, chikorita, beirifu, meganiumu);

let p = Hidenseek.hide('field', lost);
p.then((pokemons)=> {
    //console.log(pokemons);
    Hidenseek.seek('field').then((poks) => {
        console.log(poks.show());
    })
});




