/**
 * Criando componentes:
 * npx generate-react-cli component Box
 */
import React from 'react';
import styles from './App.module.sass';

import PokemonService from './services/pokemon';
import { useCallback, useEffect, useState } from 'react';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';
import Cart from './components/Cart/Cart';

function App() {
    const [apiData, setApiData] = useState({});
    const [error, setError] = useState('');
    const [cartData, setCartData] = useState([]);

    const updateList = (url) => getData(url);

    const savePokemon = (item) => {
        PokemonService.save(item);
        setCartData(PokemonService.getCart());
    };

    const removeCart = (pokemonToRemove) => {
        PokemonService.cartRemove(pokemonToRemove);
        setCartData(PokemonService.getCart());
    }

    const getData = (url) => {
        PokemonService.get(url)
            .then((resp) => (setApiData(resp.data)))
            .catch((error) => (setError(error.message)));
    }

    useEffect(() => {
        setCartData(PokemonService.getCart());
        getData();
    }, []);

    useEffect(() => (console.log(apiData)), [apiData]);

    return (
        <div className={styles.Main}>

            <div className={styles.PokemonsContainer}>
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
            </div>

            <div className={styles.CartContainer}>
                <Cart data={cartData} remove={removeCart} />
            </div>

        </div>
    );
}

export default React.memo(App);
