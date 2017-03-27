import Hidenseek from './hidenseek';
import Pokemon from './pokemon';
import PokemonList from './pokemonlist';


let chikorita = new Pokemon('Chikorita', 152);
let beirifu = new Pokemon('Beirifu', 153);
let meganiumu = new Pokemon('Meganiumu', 154);

let lost = new PokemonList(chikorita, beirifu, meganiumu);


let p = Hidenseek.hide('./task2/field', lost);
p.then((pokemons)=> {
    //console.log(pokemons);
    Hidenseek.seek('./task2/field').then((pokemons) => {
        console.log(pokemons);
    })
});




