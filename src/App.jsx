/**
 * Criando componentes:
 * npx generate-react-cli component Box
 */
import React from 'react';
import styles from './App.module.sass';

import getPokemons, { save, getCart, cartRemove } from './services/pokemon';
import { useCallback, useEffect, useState } from 'react';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';
import Cart from './components/Cart/Cart';

function App() {
    const [apiData, setApiData] = useState({});
    const [error, setError] = useState('');
    const [cartData, setCartData] = useState([]);

    const updateList = useCallback((url) => (getData(url)), [setApiData]);

    const savePokemon = (pokemon) => {
        save(pokemon);
        setCartData(getCart());
    };

    const removeCart = (pokemon) => {
        cartRemove(pokemon);
        setCartData(getCart());
    }

    const getData = (url) => {
        setCartData(getCart());
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
                                handleClick={savePokemon}
                            />
                        )
                    })}
                </ul>
                <div className={styles.PaginationContainer}>
                    <Pagination data={apiData} handleClick={updateList} />
                </div>
            </li>
            <li className={styles.CartContainer}>
                <Cart data={cartData} remove={removeCart} />
            </li>
        </ul>
    );
}


export default React.memo(App);
