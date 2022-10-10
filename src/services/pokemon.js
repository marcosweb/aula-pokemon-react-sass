import axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const localStorageKey = 'pokemons-cart';

function get(url) {
    return axios.get(url || baseUrl);
}

function getCart() {
    const storageData = localStorage.getItem(localStorageKey);
    if (storageData) return JSON.parse(storageData);
    return [];
}

function save(newPokemon) {
    const pokemons = getCart();

    const exists = pokemons.filter((item) => { // [{}]
        return item.name === newPokemon.name;
    });

    if (exists.length === 0) {
        pokemons.push(newPokemon);
        localStorage.setItem(localStorageKey, JSON.stringify(pokemons));
    }
}

function cartRemove(pokemonToRemove) {
    const pokemons = getCart();

    const filtered = pokemons.filter(item => {
        return item.name !== pokemonToRemove.name
    });

    localStorage.setItem(localStorageKey, JSON.stringify(filtered));
}

export default { get, getCart, save, cartRemove }