import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import styles from './PreviewAccount.module.scss'
import Button from '~/packages/duclong-button'
import Avatar from '~/components/Avatar'
import Tick from '~/components/Tick'

function FollowButton({
    account,
    onClickFollow
}) {
    const currentUser = useSelector(userSelectors.getCurrentUser)
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)

    if (isAuthenticated) {
        if (currentUser.id === account.id) {
            return null
        } else {
            return (
                <div className={styles.btnFollow}>
                    <Button 
                        title={account.is_followed ? 'Following' : 'Follow'} 
                        type="border" 
                        actived={account.is_followed}
                        onClick={() => onClickFollow(account)}
                    />
                </div>
            )
        }
    } else {
        return (
            <div className={styles.btnFollow}>
                <Button 
                    title='Following'
                    type="border"
                    onClick={() => {}}
                />
            </div>
        )
    }
}

function PreviewAccount({
    account = {},
    onClickFollow = () => {}
}) {
    return (
        <div className={styles.wrapper}>
            <Link to={`/@${account.nickname}`} className={styles.top}>
                <Avatar src={account.avatar} alt={account.nickname} shortName={account.shortName} />
                <h3 className={styles.nickname}>
                    <strong>{account.nickname}</strong>
                    {account.tick ? <Tick /> : <></>}
                </h3>
                <p className={styles.name}>{account.name}</p>
                <p className={styles.interactiveCount}>
                    <span className={styles.number}>{account.followers_count}</span><span className={styles.text}>Follower</span>
                    <span className={styles.number}>{account.likes_count}</span><span className={styles.text}>Thích</span>
                </p>
            </Link>
            <FollowButton 
                account={account}
                onClickFollow={onClickFollow}
            />
        </div>
    )
}

export default PreviewAccount