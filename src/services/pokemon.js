import axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const localStorageKey = 'pokemons-cart';

export function get(url) {
    return axios.get(url || baseUrl)
}

export function getCart() {
    const storageData = localStorage.getItem(localStorageKey);
    if (storageData) return JSON.parse(storageData);
    return [];
}

export function save(pokemon) {
    const pokemons = getCart();
    const exists = pokemons.filter((item) => {
        console.log(item.name, pokemon.name)
        return item.name === pokemon.name;
    });
    console.log(exists)
    if (exists.length === 0) {
        pokemons.push(pokemon);
        localStorage.setItem(localStorageKey, JSON.stringify(pokemons));
    }
}

export function cartRemove(pokemon) {
    const pokemons = getCart();
    const filtered = pokemons.filter(item => {
        return item.name !== pokemon.name
    });
    console.log('pokemon ', pokemon);
    localStorage.setItem(localStorageKey, JSON.stringify(filtered));
}

export default get