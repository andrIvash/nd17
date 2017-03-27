import Hidenseek from './hidenseek';
let p = Hidenseek.hide('./task2/field', ['Charmander|100', 'Charmander|200', 'Charmander|300']);
p.then((pokemons)=> {
    //console.log(pokemons);
    Hidenseek.seek('./task2/field');
});




