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
        //console.log(items);
        return createInnerDirs(pathTo, dirNumber);
    }, () => {
        throw new  Error('cannot create main dir');
    }).then((dirList) => {
        let randomNumber = random(1, dirList.length < pokemonAmount ? dirList.length : pokemonAmount);
        return hidePokemons(randomNumber, pokemonList, dirList)
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
        findOne(pathTo).then(data => {
            let count = 0;
            for (let i in data) {
                let arr = data[i].split('|');
                let pokemon = new Pokemon(arr[0], arr[1]);
                pokemonList.push(pokemon);
                count++;
            }
            //console.log(pokemonList);
            resolve(new PokemonList(...pokemonList));

        }, err => {
            console.log(err);
        })
    });
}

function hidePokemons(randomNumber, pokemonList, dirList) {
    return new Promise((resolve, reject) => {
        console.log(randomNumber);
        let i = 0;
        let pokemons = [];
        while ( i < randomNumber ) {
            let randomDir = random(1, dirList.length);
            let randomPokemon = pokemonList[random(1, pokemonList.length)];
            pokemons.push(randomPokemon);
            fs.access(`${dirList[randomDir]}/pokemon.txt`, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.writeFileSync(`${dirList[randomDir]}/pokemon.txt`, randomPokemon, 'utf-8', function (err) {
                        if (err) {
                            console.log('failed to save');
                            return;
                        }
                        console.log('save');
                    });

                }
            });
            i++;
        }
        resolve(pokemons);
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
            console.log(items);
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


function findOne(pathTo) {
    return new Promise(function (resolve, reject) {
        fs.readdir(pathTo, function (err, files) {
            if (err) throw err;
            let result = {};
            let p = files.map(function (name) {
                return new Promise(function (resolve, reject) {
                    fs.stat(path.join(pathTo, name), function (err, stats) {
                        if (err) throw err;
                        let obj = {};
                        if (stats.isFile()) {
                            fs.readFile(path.join(pathTo, name), (err, data) => {
                                if (err) throw err;
                                let arr = data.toString().split('|');
                                obj[arr[0]] = data.toString();
                                result = Object.assign(result, obj);
                                resolve(result);
                            });
                        } else {
                            findOne(path.join(pathTo, name)).then(data => {
                                resolve(data);
                            });
                        }
                    });
                });
            });

            Promise.all(p).then(data => {
                let result = {};
                for (let i of data) {
                    Object.assign(result, i);
                }
                resolve(result);
            })
                .catch(err => {
                    console.log(err);
                });
        });
    });
}


function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    max = Math.floor(Math.random() * (max - min + 1));
    return max + min;
}




module.exports = {hide, seek};
