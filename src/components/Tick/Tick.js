import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './Tick.module.scss'

export default function Tick() {
    return (
        <FontAwesomeIcon icon={faCheckCircle} className={styles.tick} />
    )
}