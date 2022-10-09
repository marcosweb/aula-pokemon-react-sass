import axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2';

export function getAll() {
    return axios.get(baseUrl + '/pokemon/');
}

export function getPokemon(url) {
    return axios.get(url)
}

export default { getAll, getPokemon }

