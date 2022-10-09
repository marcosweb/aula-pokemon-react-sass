import React from 'react';
import styles from './Pagination.module.sass';

const Pagination = ({ data: { next, previous }, updateList }) => {
    return (
        <div className={styles.Pagination}>
            {previous && <button onClick={() => updateList(previous)} > &lt; </button>}
            {next && <button onClick={() => updateList(next)} > &gt; </button>}
        </div>
    )
};

export default React.memo(Pagination);
