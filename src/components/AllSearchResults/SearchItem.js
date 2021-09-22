import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import config from '~/config'

import styles from './SearchItem.module.scss'
import Avatar from '~/components/Avatar'

export default function SearchItem({
    avatar = '',
    nickname = '',
    name = '',
    followersCount = 0,
    tick = false,
    shortName = ''
}) {
    return (
        <Link to={`${config.routes.home}@${nickname}`} className={styles.wrapper}>
            <Avatar 
                src={avatar} 
                alt={nickname} 
                shortName={shortName}
            />
            <div className={styles.body}>
                <p className={styles.nickname}>
                    <span>{nickname}</span>
                    {tick ? (
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.tick} />
                    ) : <></>}
                </p>
                <h2 className={styles.name}>
                    <span>{name}</span> · 
                    <p className={styles.followersCount}>
                        <span className={styles.number}>{followersCount}</span> Follower
                    </p>
                </h2>
            </div>
        </Link>
    )
}