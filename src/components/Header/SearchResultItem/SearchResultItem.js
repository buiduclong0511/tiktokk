import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './SearchResultItem.module.scss'

export default function SearchResultItem(
    {
        nickname = '',
        name = '',
        tick = false,
        showProfile = () => {},
        clearText = () => {}
    }
) {
    return (
        <div className={styles.wrapper} onClick={() => {
            showProfile(nickname)
            clearText()
        }}>
            <p className={`${styles.title} ${tick ? styles.ticked : ''}`}>
                <span className={styles.body}>{nickname}</span>
                <span className={styles.tick}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </span>
            </p>
            <p className={styles.description}>{name}</p>
        </div>
    )
}