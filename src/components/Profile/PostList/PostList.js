import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Row, Column } from '@mycv/mycv-grid'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import styles from './PostList.module.scss'
import PostItem from '../PostItem'

function LikedVideo({
    nickname,
    likedPosts,
    onShowDetail,
    userId
}) {
    const currentUser = useSelector(userSelectors.getCurrentUser)
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    if (isAuthenticated && currentUser.id === userId) {
        return (
            <Row noGutters>
                {likedPosts.map(post => <Column
                    key={post.id}
                    size={4}
                    sizeTablet={4}
                    sizeDesktop={4}
                >
                    <PostItem 
                        fileUrl={post.fileUrl}
                        viewsCount={post.viewsCount}
                        onShowDetail={() => onShowDetail(nickname, post.uuid)}
                    />
                </Column>)}
            </Row>
        )
    } else {
        return (
            <>
                <p style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    paddingTop: '20px'
                }}>Video đã thích của người dùng này ở trạng thái riêng tư</p>
                <p style={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    paddingTop: '20px'
                }}>Các video được thích bởi h231996 hiện đang ẩn</p>
            </>
        )
    }
}

export default function PostList({
    isVideoDisplay = true,
    isPrivateLiked = true,
    nickname = '',
    posts = [],
    onClickTab = () => {},
    likedPosts = [],
    onShowDetail,
    userId = 0,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <p className={`${styles.headingItem} ${styles.videoHeading} ${isVideoDisplay ? styles.active : ''}`} onClick={() => onClickTab('video')}>
                    Video
                </p>
                <p className={`${styles.headingItem} ${styles.likedHeading} ${!isVideoDisplay ? styles.active : ''}`} onClick={() => onClickTab('video-like')}>
                    {isPrivateLiked ?(
                        <span className={styles.iconLock}>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                    ) : <></>}
                    Đã thích
                </p>
            </div>
            <div className={styles.main}>
                {isVideoDisplay ? (
                    <Row noGutters>
                        {posts.map(post => <Column
                            key={post.id}
                            size={4}
                            sizeTablet={4}
                            sizeDesktop={4}
                        >
                            <PostItem 
                                fileUrl={post.fileUrl}
                                viewsCount={post.viewsCount}
                                onShowDetail={() => onShowDetail(nickname, post.uuid)}
                            />
                        </Column>)}
                    </Row>
                ) : (
                    <LikedVideo
                        nickname={nickname}
                        likedPosts={likedPosts}
                        onShowDetail={onShowDetail}
                        userId={userId}
                    />
                )}
            </div>
        </div>
    )
}