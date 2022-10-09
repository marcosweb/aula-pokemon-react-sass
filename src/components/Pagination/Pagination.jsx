import React from 'react';
import styles from './Pagination.module.sass';

const Pagination = ({ data: { next, previous }, handleClick }) => {
    return (
        <div className={styles.Pagination}>
            {previous && <button onClick={() => handleClick(previous)} > &lt; </button>}
            {next && <button onClick={() => handleClick(next)} > &gt; </button>}
        </div>
    )
};

export default React.memo(Pagination);
