import styles from './Message.module.scss'

function Message({
    message = '',
    type = 'success',
}) {
    return (
        <div className={`${styles.wrapper} ${styles[type]}`}>
            <p className={styles.message}>{message}</p>
        </div>
    )
}

export default Message