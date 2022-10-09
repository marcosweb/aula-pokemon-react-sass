/**
 * Criando componentes:
 * npx generate-react-cli component Box
 */
import React from 'react';
import styles from './App.module.sass';

import getPokemons from './services/pokemon';
import { useCallback, useEffect, useState } from 'react';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';

function App() {
    const [apiData, setApiData] = useState({});
    const [error, setError] = useState('');

    const updateList = useCallback((url) => (getData(url)), [setApiData]);

    const getData = (url) => {
        getPokemons(url)
            .then((resp) => (setApiData(resp.data)))
            .catch(error => (setError({ error: error.message })));
    }

    useEffect(() => (getData()), []);
    useEffect(() => (console.log(apiData)), [apiData]);

    return (
        <ul className={styles.Main}>
            <li className={styles.PokemonsContainer}>
                {error.length > 0 && <div className={styles.Error}>{error}</div>}
                <ul className={styles.PokemonList}>
                    {apiData.results?.map((pokemon) => {
                        return (
                            <Pokemon
                                key={pokemon.name}
                                pokemon={pokemon}
                            />
                        )
                    })}
                </ul>
                <div className={styles.PaginationContainer}>
                    <Pagination data={apiData} handleClick={updateList} />
                </div>
            </li>
            <li className={styles.CartContainer}>
                <Cart />
            </li>
        </ul>
    );
}


const Cart = () => <h2 className={styles.Cart}>Cart</h2>

export default React.memo(App);
