import styles from './Loader.module.scss'
import loader from '~/assets/img/loader.gif'

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <img src={loader} alt="loader" />
        </div>
    )
}

export default Loader