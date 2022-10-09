import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import { getPokemon } from '../../services/pokemon';
import styles from './Pokemon.module.sass';

const Pokemon = ({ pokemon }) => {
    const [item, setItem] = useState({});

    useEffect(() => {
        getPokemon(pokemon.url).then((resp) => {
            setItem(() => resp.data);
            console.log('Pokemon ', pokemon)
        });
    }, []);

    const image = !item.sprites
        ? <ReactLoading type="spin" color="#ccc" />
        : <img src={item.sprites?.front_default} alt={item.name} />

    return (
        <li className={styles.PokemonItemContainer}>
            <div className={styles.Pokemon}>
                <div className={styles.ImageContainer}>
                    {image}
                </div>
                <p className={styles.PokemonTitle}>{pokemon.name}</p>
            </div>
        </li>
    )
};

export default React.memo(Pokemon);
