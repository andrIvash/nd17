const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

const Pokemon = require('../task1/Pokemon');
const PokemonList = require('../task1/PokemonList');


describe('PokemonList:', () => {
  let beirifu,
    chikorita,
    pokemonsList;

  before(()=> {
    beirifu = new Pokemon('Beirifu', 153);
    chikorita = new Pokemon('Chikorita', 152);
    pokemonsList = new PokemonList(chikorita, beirifu);
  });

  it('должен добавляться покемон в список add()', () => {
    pokemonsList.add('Pupurin', 174);
    assert.deepEqual(
      pokemonsList,
      [
        {name: 'Chikorita', level: 152},
        {name: 'Beirifu', level: 153},
        {name: 'Pupurin', level: 174}
      ],
      'покемон не добавлен');
  });
  it('должен возвращаться список покемонов в виде массива и его длинна show()', () => {
    let result = pokemonsList.show();
    assert.deepEqual(result,
      {
        pokemons:[
          {name: 'Chikorita', level: 152},
          {name: 'Beirifu', level: 153},
          {name: 'Pupurin', level: 174}
        ],
        total: 3
      },
      'свойства не совпадают');
  });
  it('должен возвращаться покемон максимального уровня из списка max()', () => {
    assert.deepEqual(pokemonsList.max(),
      {name: 'Pupurin', level: 174},
      'не находит максимального покемона');
  });
});

