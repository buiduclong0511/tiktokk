
import styles from './Content.module.scss'
import PostInfor from '../PostInfor'
import Comment from '../Comment'

export default function Content({
    post,
    user,
    onLike,
    onShare,
    onFollow,
    onCopy,
    comments,
    onChangeCommentText,
    onClickLike,
    inputValue,
    onSendComment,
    onLikeComment,
    isLoadingPost,
    isLoadingComment,
    onClickFollow,
    onKeyUp,
    onGetSendBtnRef,
    type,
    onShowLoginModal,
    onDeleteComment,
    onClickShare,
    onGetListCommentRef
}) {
    return (
        <div className={styles.wrapper}>
            <PostInfor 
                post={post}
                user={user}
                onLike={onLike}
                onShare={onShare}
                onFollow={onFollow}
                onCopy={onCopy}
                onClickLike={onClickLike}
                isLoadingPost={isLoadingPost}
                onClickFollow={onClickFollow}
                type={type}
                onShowLoginModal={onShowLoginModal}
                onClickShare={onClickShare}
            />
            <Comment 
                authorId={user.id}
                comments={comments}
                onChangeCommentText={onChangeCommentText}
                inputValue={inputValue}
                onSendComment={onSendComment}
                onLikeComment={onLikeComment}
                isLoadingComment={isLoadingComment}
                onKeyUp={onKeyUp}
                onGetSendBtnRef={onGetSendBtnRef}
                onShowLoginModal={onShowLoginModal}
                onDeleteComment={onDeleteComment}
                onGetListCommentRef={onGetListCommentRef}
            />
        </div>
    )
}