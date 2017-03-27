class Pokemon {

    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    show () {
        console.log(`name: ${this.name}, level: ${this.level}`);
    }
    valueOf () {
        return `${this.name}|${this.level}`;
    }
}

module.exports = Pokemon;