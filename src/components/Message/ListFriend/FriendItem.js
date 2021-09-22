import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import Tippy from '@tippyjs/react/headless'

import Avatar from '~/components/Avatar'
import styles from './ListFriend.module.scss'
import Menu from './Menu'

function FriendItem({
    avatar = '',
    name = '',
    lastMessage = '',
    time = '',
}) {
    const menuBtnRef = useRef()
    return (
        <div 
            className={styles.item} 
            onMouseEnter={() => menuBtnRef.current.style.display = 'inline-block'}
            onMouseLeave={() => menuBtnRef.current.style.display = 'none'}
        >
            <Avatar src={avatar} dimension={56} />
            <div className={styles.body}>
                <p className={styles.name}>{name}</p>
                <p className={styles.lastMessage}>
                    <span className={styles.message}>{lastMessage}</span>
                    <span className={styles.time}>{time}</span>
                </p>
                <Tippy
                    render={() => <Menu />}
                    interactive
                    trigger={'click'}
                    placement={'bottom'}
                >
                    <button className={styles.menu} ref={menuBtnRef}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                </Tippy>
            </div>
        </div>
    )
}

export default FriendItem