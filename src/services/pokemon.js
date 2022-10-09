import axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const localStorageKey = 'pokemons-cart';

export function get(url) {
    return axios.get(url || baseUrl)
}

export function getCart() {
    const storageData = localStorage.getItem(localStorageKey);
    if (storageData.length) return JSON.parse(storageData);
    return [];
}

export function save(pokemons) {
    localStorage.setItem(localStorageKey, JSON.stringify(pokemons));
}

export default get