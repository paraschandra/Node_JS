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