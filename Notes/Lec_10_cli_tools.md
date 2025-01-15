## Lecture_10: CLI Tools

CLI stands for Command Line Interface.

It is a program that you can run from the terminal.<br>
Ex: npm and git

### Building a Custom CLI Tool
First, create a project folder under which create a `package.json` file by running the command:
```bash
npm init --yes
```
Now, create an entry point file `index.js` with the hashbang:
```js
#!/usr/bin/env node

console.log('Node JS Pokedex');
```
Now, add bin field in `package.json`:
```json
...
  "bin": {
    "pokedex-cli": "index.js"
  },
...
```
Install the package as:
```bash
npm install -g
```
Now, run the command specified in bin field to run the tool:
```bash
> pokedex-cli
< Node JS Pokedex
```

### CLI Options
We can add options to CLI tools by manipulating argv.
```js
#!/usr/bin/env node

const yargs = require('yargs');
const { argv } = yargs(process.argv)

const printFiveMoves = async (pokemonName) => {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = await res.json();
    const moves = pokemon.moves.map(({move}) => move.name);
    console.log(moves.slice(0, 5));
};

printFiveMoves(argv.pokemon);
```
In terminal:
```bash
> pokedex-cli --pokemon=mew
[ 'pound', 'mega-punch', 'pay-day', 'fire-punch', 'ice-punch' ]
```

### Adding Interactivity in CLI Tools
We can use packages to add interactivity to our CLI tools like - `inquirer` package.
```js
#!/usr/bin/env node

const inquirer = require('inquirer');

const printFiveMoves = async (pokemonName) => {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = await res.json();
    const moves = pokemon.moves.map(({move}) => move.name);
    console.log(moves.slice(0, 5));
};

const prompt = inquirer.createPromptModule()
prompt([{
    type: "input",
    name: "pokemon",
    message: "Enter a pokemon name to view its 5 moves"
}]).then((ans) => {
    const pokemon = ans.pokemon;
    printFiveMoves(pokemon);
})
```
In terminal:
```bash
> pokedex-cli
? Enter a pokemon name to view its 5 moves mew
[ 'pound', 'mega-punch', 'pay-day', 'fire-punch', 'ice-punch' ]
```