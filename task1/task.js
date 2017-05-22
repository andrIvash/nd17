const Pokemon = require('./Pokemon');
const PokemonList = require('./PokemonList');


let chikorita = new Pokemon('Chikorita', 152);
let beirifu = new Pokemon('Beirifu', 153);
let meganiumu = new Pokemon('Meganiumu', 154);
let pupurin = new Pokemon('Pupurin', 174);
let togepi = new Pokemon('Togepi', 175);


let lost = new PokemonList(chikorita, beirifu, meganiumu);
let found = new PokemonList(pupurin, togepi);

console.log(chikorita.valueOf());

//lost.show();

found.push(lost.find((elem) => {
  return elem.name === 'Beirifu';
}));

let ndx = lost.findIndex((elem) => {
  return elem.name === 'Beirifu';
});
if (ndx > 0) {
  lost.splice(ndx,1);
} else {
  console.log('pokemon not found');
}
console.log(lost.show());
console.log(found.show());

console.log(found.max().show());
