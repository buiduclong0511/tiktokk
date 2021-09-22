import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { Waypoint } from 'react-waypoint'
import { useSelector } from 'react-redux'
import React from 'react'

import { selectors as userSelectors } from '~/state/user'

import styles from './PostItem.module.scss'
import Button from '~/packages/duclong-button'
import Avatar from '../Avatar'
import SharePopper from './SharePopper'
import { 
    Mute as MuteIcon,
    Pause as PauseIcon,
    Play as PlayIcon,
    Volumn as VolumnIcon
} from '~/packages/duclong-icon'
import Tick from '~/components/Tick'
import PreviewAccount from '~/components/PreviewAccount'

function FollowButton({
    isAuthenticated = false,
    currentUser = null,
    type = 'for-you',
    postUserId = null,
    onShowLoginModal,
    postAuthor = null,
    onClickFollow
}) {

    if (isAuthenticated) {
        if (type === 'following' || currentUser.id === postUserId) {
            return null
        }
        return (
            <div className={styles.buttonFollow}>
                <Button 
                    title={postAuthor.is_followed ? "Following" : "Follow"}
                    type="border" 
                    size="s" 
                    actived={postAuthor.is_followed} 
                    onClick={onClickFollow} 
                />
            </div>
        )
    } else {
        return (
            <div className={styles.buttonFollow}>
                <Button 
                    title="Follow"
                    type="border" 
                    size="s" 
                    onClick={onShowLoginModal}
                />
            </div>
        )
    }
}

function PostItem({
    post = {},
    wayPointProps = {},
    onEnter = () => {},
    onClickLike = () => {},
    onComment = () => {},
    onShowDetail = () => {},
    onVideoRef = () => {},
    onClickFollow = () => {},
    onClickVolumn = () => {},
    onClickPlayPause = () => {},
    isMuted = true,
    isPlaying = true,
    type,
    onShowLoginModal = () => {},
    onClickShare = () => {}
}) {
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    const currentUser = useSelector(userSelectors.getCurrentUser)
    const screenH = {
        width: `calc(400px + ((100vw - 768px) / 1152) * 100)`,
        height: `calc((400px + ((100vw - 768px) / 1152) * 100) / 1.78)`
    }

    const screenV = {
        width: `calc(${post.ratio} * (400px + ((100vw - 768px) / 1152) * 100))`,
    }

    if (!post) {
        return null
    }
    return (
        <div className={styles.wrapper}>
            <Link to={`@${post.author.nickname}`}>
                <Avatar 
                    src={post.author.avatar}
                    alt={post.author.nickname} 
                    shortName={post.author.shortName}
                />
            </Link>
            <div className={styles.mainPost}>
            <Tippy
                    placement="bottom"
                    interactive
                    offset={[-100, 0]}
                    delay={[600, 300]}
                    appendTo={() => document.body}
                    render={() => <PreviewAccount account={post.user} onClickFollow={onClickFollow} />}
                >
                    <Link to={`@${post.author.nickname}`}>
                        <div className={styles.user}>
                            <h3 className={styles.nickname}>{post.author.nickname}{post.user.tick ? <Tick /> : <></>}</h3>
                            <span className={styles.username}>{post.author.name}</span> - <span className={styles.fromNow}>{post.relativeTime}</span>
                        </div>
                    </Link>
                </Tippy>
                <p className={styles.body}>{post.description}</p>
                <p className={styles.music}>{post.music}</p>
                <div className={styles.post}>
                    <div className={styles.video}>
                        <video 
                            ref={ref => onVideoRef(ref, post.id)}
                            src={post.file_url}
                            loop
                            className={styles.video} 
                            onClick={() => onShowDetail(post.author.nickname, post.uuid, post.id)}
                            muted={isMuted}
                            style={post.ratio <= 1 ? screenV : screenH} 
                        />
                        <div className={styles.volumnIcon} onClick={onClickVolumn}>
                            {isMuted ? <MuteIcon /> : <VolumnIcon />}
                        </div>
                        <div className={styles.playPauseIcon} onClick={() => onClickPlayPause(post.id)}>
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </div>
                    </div>
                    <Waypoint
                        {...wayPointProps}
                        onEnter={() => onEnter(post.id)}
                    >
                        <div className={styles.wayPoint}></div>
                    </Waypoint>
                    <div className={styles.interactive}>
                        <div className={styles.heart} onClick={onClickLike}>
                            <div className={`${styles.iconWrapper} ${post.is_liked ? styles.liked : ''}`}>
                                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                            </div>
                            <p className={styles.number}>{post.likes_count}</p>
                        </div>
                        <div className={styles.comment} onClick={onComment}>
                            <div className={styles.iconWrapper}>
                                <FontAwesomeIcon icon={faComment} className={styles.icon} />
                            </div>
                            <p className={styles.number}>{post.comments_count}</p>
                        </div>
                        <Tippy
                            interactive
                            offset={[70, 10]}
                            delay={[0, 200]}
                            render={() => <SharePopper onClickShare={(type) => onClickShare(type, post)} />}
                        >
                            <div className={styles.share}>
                                <div className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={faShare} className={styles.icon} />
                                </div>
                                <p className={styles.number}>{post.shares_count}</p>
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
            <FollowButton
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                type={type}
                postUserId={post.user.id}
                onShowLoginModal={onShowLoginModal}
                postAuthor={post.user}
                onClickFollow={onClickFollow}
            />
        </div>
    )
}

export default React.memo(PostItem, (prevProps, nextProps) => {
    return prevProps.post === nextProps.post &&
            prevProps.isMuted === nextProps.isMuted &&
            prevProps.isPlaying === nextProps.isPlaying &&
            prevProps.type === nextProps.type
})

// export default PostItem