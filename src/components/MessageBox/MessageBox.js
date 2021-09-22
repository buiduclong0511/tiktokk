import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './MessageBox.module.scss'

export default function MessageBox({
    title = '',
    message = '',
    type = 'error',
    onClose = () => {}
}) {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <p className={`${styles.heading} ${styles[type]}`}><FontAwesomeIcon className={styles.icon} icon={faExclamationCircle} />{title}</p>
                <p className={styles.message}>{message}
                </p>
                <p className={styles.btnClose}><button className={styles[type]} onClick={onClose}>OK</button></p>
            </div>
        </div>
    )
}