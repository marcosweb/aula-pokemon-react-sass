import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import PokemonService from '../../services/pokemon';
import styles from './Pokemon.module.sass';

const Pokemon = ({ pokemon, handleClick }) => {
    const [item, setItem] = useState({});

    useEffect(() => {
        PokemonService.get(pokemon.url).then((resp) => {
            setItem(() => resp.data);
        });
    }, []);

    const image = !item.sprites
        ? <ReactLoading type="spin" color="#ccc" />
        : <img src={item.sprites?.front_default} alt={item.name} />

    return (
        <li className={styles.PokemonItemContainer}>
            <a href='#' className={styles.Pokemon} onClick={() => handleClick(item)}>
                <div className={styles.ImageContainer}>
                    {image}
                </div>
                <p className={styles.PokemonTitle}>{pokemon.name}</p>
            </a>
        </li>
    )
};

export default React.memo(Pokemon);
