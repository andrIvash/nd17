const expect = require('chai').expect;
const assert = require('chai').assert;

const Pokemon = require('../task1/Pokemon');

describe('Pokemon:', () => {
  let chikorita;

  before(()=> {
    chikorita = new Pokemon('Chikorita', 152);
  });

  it('должен создаваться экземпляр класса Pokemon', () => {
    expect(chikorita, 'экземпляр не создан').is.instanceof(Pokemon);
  });
  it('обьект Pokemon должен содержать определенные св-ва', () => {
    assert.deepEqual(chikorita, {name: 'Chikorita', level: 152},'свойства не совпадают');
  });
  it('проверка метода Pokemon.show()', () => {
    expect(chikorita.show(), 'show() не возвращает строку').to.be.a('string');
  });
});

