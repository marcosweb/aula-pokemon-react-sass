/**
 * Criando componentes:
 * npx generate-react-cli component Box
 */
import React from 'react';
import styles from './App.module.sass';

import { getAll, getPokemon } from './services/pokemon';
import { useCallback, useEffect, useState } from 'react';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        getAll().then((resp) => {
            setData(resp?.data)
        })
    }, []);

    const updateList = useCallback((url) => {
        getPokemon(url).then((resp) => {
            setData(resp.data)
        })
    }, [setData]);

    return (
        <>
            <ul className={styles.PokemonList}>
                {data.results?.map((pokemon) => {
                    return (
                        <Pokemon
                            key={pokemon.name}
                            pokemon={pokemon}
                        />
                    )
                })}

            </ul>
            <div className='pagination-container'>
                <Pagination data={data} updateList={updateList} />
            </div>
        </>
    );
}

export default React.memo(App);
