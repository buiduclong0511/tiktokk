import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import styles from './UserInfor.module.scss'
import Button from '~/packages/duclong-button'
import Avatar from '~/components/Avatar'

function FollowBtn({
    onShowLoginModal,
    user,
    onClickFollow
}) {
    const currentUser = useSelector(userSelectors.getCurrentUser)
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    if (isAuthenticated) {
        if (currentUser.id === user.id) {
            return null
        } else {
            return (
                <span className={styles.btnFollow}>
                    <Button 
                        title={user.is_followed ? 'Following' : 'Follow'}
                        size="l"
                        type={user.is_followed ? 'border' : 'primary'}
                        actived={user.is_followed ? 'Following' : 'Follow'}
                        onClick={() => onClickFollow(user)}
                    />
                </span>
            )
        }
    } else {
        return (
            <span className={styles.btnFollow}>
                <Button 
                    title='Follow'
                    size="l"
                    type='primary'
                    onClick={onShowLoginModal}
                />
            </span>
        )
    }
}

export default function UserInfor({
    user = {},
    onClickFollow = () => {},
    onShowLoginModal = () => {}
}) {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <Avatar 
                    src={user.avatar} 
                    alt={user.nickname}
                    dimension={116}
                    shortName={user.shortName}
                />
                <div className={styles.infor}>
                    <h2 className={styles.nickname}>{user.nickname}</h2>
                    <h1 className={styles.name}>{user.name}</h1>
                    <FollowBtn 
                        onShowLoginModal={onShowLoginModal}
                        user={user}
                        onClickFollow={onClickFollow}
                    />
                </div>
                <button className={styles.btnMore}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </div>
            <div className={styles.interactive}>
                <p className={styles.interactiveItem}><strong className={styles.number}>{user.followings_count}</strong><span>Đang Follow</span></p>
                <p className={styles.interactiveItem}><strong className={styles.number}>{user.followers_count}</strong><span>Follower</span></p>
                <p className={styles.interactiveItem}><strong className={styles.number}>{user.likes_count}</strong><span>Thích</span></p>
            </div>
            
            <p className={styles.bio}>{user.bio}</p>
        </div>
    )
}