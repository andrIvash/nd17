const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonlist');

const fs = require('fs');
const path = require('path');


function hide(pathTo, pokemonList) {
    let maxNumber = 10;
    let pokemons = pokemonList.length;
    let pokemonAmount = random(1, pokemons < maxNumber ? pokemons : maxNumber);
    let dirNumber = 10; // dir number

    let result = isDirCreate(pathTo).then((items)=> {
        return createInnerDirs(pathTo, dirNumber);
    }, () => {
        throw new  Error('cannot create main dir');
    }).then((dirList) => {
        let randomNumber = random(1, dirList.length < pokemonAmount ? dirList.length : pokemonAmount);
        return hidePokemons(randomNumber, pokemonList, dirList, pathTo)
    }, () => {
       throw new  Error('cannot create dir list');
    }).then((pokemons) => {
        console.log('hide pokemons');
        return new Promise(function(resolve, reject) {
            resolve(pokemons);
        })
    },() => {
        throw new  Error('cannot hide pokemons');
    }).catch((err) => {
        console.log(`Error: ${err.message}`);
    });

    return result;
}

function seek(pathTo) {
    return new Promise(function (resolve, reject) {
        let pokemonList = [];
        let p = findOne(pathTo).map(function (elem) {
            return new Promise(function (resolve, reject) {
                fs.readFile(elem, 'utf-8', (err, data) => {
                    if (err) reject();
                    let arr = data.toString().split('|');
                    let pokemon = new Pokemon(arr[0], arr[1]);
                    pokemonList.push(pokemon);
                    resolve(pokemon);
                });
            });
        });
        Promise.all(p).then(() => {
            console.log('find pokemons');
            resolve(new PokemonList(...pokemonList));
        })
    });
}

function hidePokemons(randomNumber, pokemonList, dirList, pathTo) {
    return new Promise((resolve, reject) => {
        let dirs = [];
        for (let i = 0; i < randomNumber; i++) {
            let res = random(1, dirList.length);
            dirs.push(res < 10 ? '0'+res : res);
        }
        let pokemons = [];
        let p = dirs.map(function (elem) {
            return new Promise(function (resolve, reject) {
                let randomPokemon = pokemonList[random(1, pokemonList.length)];
                pokemons.push(randomPokemon);
                fs.open(`${pathTo}/${elem}/pokemon.txt`, 'w', (err) => {
                    if (err) {
                        if (err.code === 'EEXIST') {
                            console.error('myfile already exists');
                            reject()
                        }
                    }
                    fs.writeFile(`${pathTo}/${elem}/pokemon.txt`, randomPokemon, 'utf-8', function (err) {
                        if (err) {
                            reject();
                        }
                        resolve();
                    });

                });
            });
        });

        Promise.all(p).then(() => {
            resolve(pokemons);
        })
    })
}

function createInnerDirs(pathTo, dirNumber) {
    return new Promise((resolve, reject) => {
        let dirList = [];
        for(let i = 1; i <= dirNumber; i++) {
            let dirName = (i < 10) ? path.join(pathTo, `0${[i]}`) : path.join(pathTo, `${[i]}`);
            fs.mkdirSync(dirName, err => {
                if (err) reject();
            });
            dirList.push(dirName);
        }
        resolve(dirList);
    });
}

function isDirCreate(pathTo) {
    return new Promise((resolve, reject) => {
        fs.readdir(pathTo, (err, items) => {
            deleteFolderRecursive(pathTo);
            fs.mkdir(pathTo, err => {
                if (err) reject(err);
            });
            resolve(items);
        });
    });
}

function deleteFolderRecursive (path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file, index){
            let curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


function findOne (pathTo) {
    return fs.readdirSync(pathTo).reduce((list, file) => {
        let name = path.join(pathTo, file);
        let isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? findOne(name) : [name]);
    }, []);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    max = Math.floor(Math.random() * (max - min + 1));
    return max + min;
}

module.exports = {hide, seek};
