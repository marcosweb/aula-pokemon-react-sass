import styles from './Cart.module.sass'

export default function Cart({ data, remove }) {
    return (
        <ul className={styles.CartList}>
            {data.map(item => {
                return (
                    <li className={styles.CartItem} key={item.name}>
                        <div className={styles.CartImage}>
                            <img src={item.sprites.front_default} />
                        </div>
                        <div className={styles.Info}>
                            <span>{item.name}</span>
                            <span className={styles.DeleteButton}>
                                <button onClick={() => remove(item)}> X </button>
                            </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}