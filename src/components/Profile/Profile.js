
import styles from './Profile.module.scss'
import UserInfor from './UserInfor'
import PostList from './PostList'
import LoginAndRegisterModal from '~/containers/LoginAndRegisterModal'
import PostDetailModal from '~/containers/PostDetailModal'

export default function Profile({
    user,
    isVideoDisplay,
    isPrivateLiked,
    posts,
    onClickFollow,
    onClickTab,
    onShowLoginModal,
    isShowLoginModal = false,
    likedPosts,
    onShowDetail,
    onRequestClose,
    videoId,
    showDetail = false
}) {
    return (
        <div className={styles.wrapper}>
            <UserInfor 
                user={user}
                onClickFollow={onClickFollow}
                onShowLoginModal={onShowLoginModal}
            />
            <PostList
                userId={user.id}
                isVideoDisplay={isVideoDisplay}
                isPrivateLiked={isPrivateLiked}
                posts={posts}
                nickname={user.nickname}
                onClickTab={onClickTab}
                likedPosts={likedPosts}
                onShowDetail={onShowDetail}
            />
            {isShowLoginModal ? <LoginAndRegisterModal onCloseRequest={onShowLoginModal} /> : <></>}
            {showDetail ? <PostDetailModal videoId={videoId} onRequestClose={onRequestClose} /> : <></>}
        </div>
    )
}