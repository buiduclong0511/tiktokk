import { Waypoint } from 'react-waypoint'

import styles from './Home.module.scss'
import PostItem from '~/components/PostItem'
import PostDetailModal from '~/containers/PostDetailModal'
import Loader from '~/packages/duclong-loader'
import AppPromotion from '~/containers/AppPromotion'
import LoginAndRegisterModal from '~/containers/LoginAndRegisterModal'

function Home({
    posts = [],
    postDetail = null,
    videoId,
    onShowDetail,
    onRequestClose,
    showDetail = false,
    onClickLike,
    getVideoModal,
    onEnter = () => {},
    wayPointProps = {},
    onVideoRef,
    currentTime,
    onNext,
    onPrev,
    showNext,
    showPrev,
    onClickFollow,
    onLoadMore = () => {},
    onClickVolumn,
    onClickPlayPause,
    isMuted,
    isPlaying,
    setIsPlaying,
    isLoading = true,
    type,
    onShowLoginModal,
    onClickShare,
    isShowLoginModal
}) {
    if (!!postDetail) {
        return (
            <div className={styles.wrapper}>
                {isShowLoginModal ? <LoginAndRegisterModal onCloseRequest={onShowLoginModal} /> : <></>}
                <PostItem
                    key={postDetail.id}
                    post={postDetail}
                    onShowDetail={onShowDetail}
                    onVideoRef={onVideoRef}
                    wayPointProps={wayPointProps}
                    onEnter={onEnter}
                    onClickLike={() => onClickLike(postDetail)}
                    onComment={() => {alert('comment')}}
                    onShare={() => {alert('share')}}
                    onClickFollow={() => onClickFollow(postDetail)}
                    onClickVolumn={onClickVolumn}
                    onClickPlayPause={onClickPlayPause}
                    isMuted={isMuted}
                    type={type}
                    onShowLoginModal={onShowLoginModal}
                    onClickShare={onClickShare}
                />
                <h2 className={styles.browserMore}>Tìm hiểu thêm video Dành cho bạn</h2>
                {posts.map((post, index) => {
                    if (index === posts.length - 1) {
                        return (
                            <Waypoint
                                onEnter={onLoadMore}
                                key={post.id}
                            >
                                <div>
                                    <PostItem
                                        post={post}
                                        onShowDetail={onShowDetail}
                                        onVideoRef={onVideoRef}
                                        wayPointProps={wayPointProps}
                                        onEnter={onEnter}
                                        onClickLike={() => onClickLike(post)}
                                        onComment={() => {alert('comment')}}
                                        onShare={() => {alert('share')}}
                                        onClickFollow={() => onClickFollow(post)}
                                        onClickVolumn={onClickVolumn}
                                        onClickPlayPause={onClickPlayPause}
                                        isMuted={isMuted}
                                        type={type}
                                        onShowLoginModal={onShowLoginModal}
                                        onClickShare={onClickShare}
                                    />
                                </div>
                            </Waypoint>
                        )
                    }
                    return (
                        <PostItem 
                            key={post.id}
                            post={post}
                            onShowDetail={onShowDetail}
                            onVideoRef={onVideoRef}
                            wayPointProps={wayPointProps}
                            onEnter={onEnter}
                            onClickLike={() => onClickLike(post)}
                            onComment={() => {alert('comment')}}
                            onShare={() => {alert('share')}}
                            onClickFollow={() => onClickFollow(post)}
                            onClickVolumn={onClickVolumn}
                            onClickPlayPause={onClickPlayPause}
                            isMuted={isMuted}
                            isPlaying={isPlaying}
                            type={type}
                            onShowLoginModal={onShowLoginModal}
                            onClickShare={onClickShare}
                        />
                    )
                })}

                {showDetail && <PostDetailModal 
                    videoId={videoId}
                    onRequestClose={onRequestClose}
                    currentTime={currentTime}
                    onNext={onNext}
                    onPrev={onPrev}
                    showNext={showNext}
                    showPrev={showPrev}
                    getVideoModal={getVideoModal}
                    onClickVolumn={onClickVolumn}
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    type={type}
                    onShowLoginModal={onShowLoginModal}
                />}
                {isLoading ? <Loader /> : <></>}

                <AppPromotion />
            </div>
        )
    }
    return (
        <div className={styles.wrapper}>
            {isShowLoginModal ? <LoginAndRegisterModal onCloseRequest={onShowLoginModal} /> : <></>}
            {posts.map((post, index) => {
                if (index === posts.length - 1) {
                    return (
                        <Waypoint
                            onEnter={onLoadMore}
                            key={post.id}
                        >
                            <div>
                                <PostItem
                                    post={post}
                                    onShowDetail={onShowDetail}
                                    onVideoRef={onVideoRef}
                                    wayPointProps={wayPointProps}
                                    onEnter={onEnter}
                                    onClickLike={() => onClickLike(post)}
                                    onComment={() => {alert('comment')}}
                                    onShare={() => {alert('share')}}
                                    onClickFollow={() => onClickFollow(post)}
                                    onClickVolumn={onClickVolumn}
                                    onClickPlayPause={onClickPlayPause}
                                    isMuted={isMuted}
                                    type={type}
                                    onShowLoginModal={onShowLoginModal}
                                    onClickShare={onClickShare}
                                />
                            </div>
                        </Waypoint>
                    )
                }
                return (
                    <PostItem 
                        key={post.id}
                        post={post}
                        onShowDetail={onShowDetail}
                        onVideoRef={onVideoRef}
                        wayPointProps={wayPointProps}
                        onEnter={onEnter}
                        onClickLike={() => onClickLike(post)}
                        onComment={() => {alert('comment')}}
                        onShare={() => {alert('share')}}
                        onClickFollow={() => onClickFollow(post)}
                        onClickVolumn={onClickVolumn}
                        onClickPlayPause={onClickPlayPause}
                        isMuted={isMuted}
                        isPlaying={isPlaying}
                        type={type}
                        onShowLoginModal={onShowLoginModal}
                        onClickShare={onClickShare}
                    />
                )
            })}

            {showDetail && <PostDetailModal 
                videoId={videoId}
                onRequestClose={onRequestClose}
                currentTime={currentTime}
                onNext={onNext}
                onPrev={onPrev}
                showNext={showNext}
                showPrev={showPrev}
                getVideoModal={getVideoModal}
                onClickVolumn={onClickVolumn}
                isMuted={isMuted}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                type={type}
                onShowLoginModal={onShowLoginModal}
            />}
            {isLoading ? <Loader /> : <></>}

            <AppPromotion />
        </div>
    )
}

export default Home