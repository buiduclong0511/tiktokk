import { Link } from 'react-router-dom'
import React from 'react'

import styles from './SuggestedUserItem.module.scss'
import Button from '~/packages/duclong-button'
import config from '~/config'
import Tick from '~/components/Tick'
import Avatar from '~/components/Avatar'

function SuggestedUserItem({
    user = {},
    getVideoRefs = () => {},
    getVideoId = () => {},
    onShowLoginModal = () => {}
}) {
    // console.log(user)
    return (
        <div className={styles.wrapper} onMouseEnter={getVideoId}>
            <Link  to={`${config.routes.home}@${user.nickname}`} className={styles.main}>
                <video 
                    src={user.popular_post.file_url} 
                    className={styles.video}
                    ref={getVideoRefs}
                    muted
                ></video>
                <div className={styles.userInfor}>
                    <Avatar src={user.avatar} alt={user.nickname} shortName={user.short_name} />
                    <h3 className={styles.name}>{user.name}</h3>
                    <p className={styles.nickname}>
                        <span>{user.nickname}</span>
                        {user.tick ? <Tick /> : <></>}
                    </p>
                </div>
            </Link>
            <div className={styles.followBtn}>
                <Button title="Follow" size="l" onClick={onShowLoginModal} />
            </div>
        </div>
    )
}

export default React.memo(SuggestedUserItem, (prevProps, nextProps) =>{
    return prevProps.user === nextProps.user
})