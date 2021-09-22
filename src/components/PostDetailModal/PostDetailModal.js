import { Row, Column } from '@mycv/mycv-grid'

import VideoPlayer from './VideoPlayer'
import Content from './Content'
import styles from './PostDetailModal.module.scss'
import Account from 'containers/entities/Account'
import LoginAndRegisterModal from '~/containers/LoginAndRegisterModal'

export default function PostDetailModal({
    post,
    isLogin,
    onLike,
    onShare,
    onFollow,
    onCopy,
    comments,
    onChangeCommentText,
    onRequestClose,
    onNext,
    onPrev,
    showNext,
    showPrev,
    getVideoModal,
    onClickLike,
    inputValue,
    onSendComment,
    onLikeComment,
    getVideo,
    onClickVolumn,
    isMuted,
    isPlaying,
    onClickPlayPause,
    isLoadingPost,
    isLoadingComment,
    onClickFollow,
    onKeyUp,
    onGetSendBtnRef,
    type,
    onShowLoginModal,
    isShowLoginModal = false,
    onDeleteComment,
    onClickShare,
    onGetListCommentRef
}) {
    return (
        <div className={styles.wrapper}>
            <Row>
                <Column sizeDesktop={7}>
                    <VideoPlayer 
                        video={post.fileUrl} 
                        onRequestClose={() => onRequestClose(post.id)} 
                        ratio={post.ratio}
                        onNext={onNext}
                        onPrev={onPrev}
                        showNext={showNext}
                        showPrev={showPrev}
                        getVideoModal={getVideoModal}
                        getVideo={getVideo}
                        onClickVolumn={onClickVolumn}
                        isMuted={isMuted}
                        isPlaying={isPlaying}
                        onClickPlayPause={onClickPlayPause}
                        isLoadingPost={isLoadingPost}
                    />
                </Column>
                <Column sizeDesktop={5}>
                    <Content 
                        post={post}
                        user={Account.create(post.user)}
                        isLogin={isLogin}
                        onLike={onLike}
                        onShare={onShare}
                        onFollow={onFollow}
                        onCopy={onCopy}
                        comments={comments}
                        onChangeCommentText={onChangeCommentText}
                        onClickLike={onClickLike}
                        inputValue={inputValue}
                        onSendComment={onSendComment}
                        onLikeComment={onLikeComment}
                        isLoadingPost={isLoadingPost}
                        isLoadingComment={isLoadingComment}
                        onClickFollow={onClickFollow}
                        onKeyUp={onKeyUp}
                        onGetSendBtnRef={onGetSendBtnRef}
                        type={type}
                        onShowLoginModal={onShowLoginModal}
                        onDeleteComment={onDeleteComment}
                        onClickShare={onClickShare}
                        onGetListCommentRef={onGetListCommentRef}
                    />
                </Column>
            </Row>

            {isShowLoginModal ? <LoginAndRegisterModal onCloseRequest={onShowLoginModal} /> : <></>}
        </div>
    )
}