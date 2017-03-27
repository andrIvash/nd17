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
    var results = [];
    var findFilesInDir = function (startPath,filter){
        fs.readdir(startPath, function(err, items) {
            for (let i=0; i<items.length; i++) {
                let filename = path.join(startPath, items[i]);
                let stat = fs.lstatSync(filename);
                if (stat.isDirectory()){
                    findFilesInDir(filename, filter); //recurse
                }
                else if (filename.indexOf(filter) >= 0) {
                    var result = fs.readFileSync(filename, "utf8");
                    console.log(result);
                    results.push(result);

                }
            }
        });
    };

    findFilesInDir(pathTo ,'pokemon.txt');
    console.log('res', results);
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





function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    max = Math.floor(Math.random() * (max - min + 1));
    return max + min;
}




module.exports = {hide, seek};
