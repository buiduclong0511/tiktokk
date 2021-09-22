import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faLink } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import Tippy from '@tippyjs/react/headless'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { selectors as userSelectors } from '~/state/user'

import styles from './PostInfor.module.scss'
import Button from '~/packages/duclong-button'
import config from '~/config'
import Avatar from '~/components/Avatar'
import Tooltip from '~/components/Tooltip'
import {
    Facebook as FacebookIcon,
    Reddit as RedditIcon,
    Pinterest as PinterestIcon,
    Twitter as TwitterIcon,
    Whatsapp as WhatsappIcon
} from '~/packages/duclong-icon'
import Loader from '~/packages/duclong-loader'
import Tick from '~/components/Tick'
import PreviewAccount from '~/components/PreviewAccount'

function FollowButton({
    isAuthenticated = false,
    currentUser = null,
    postUserId = null,
    onShowLoginModal = () => {},
    postAuthor = null,
    onClickFollow = () => {}
}) {

    if (isAuthenticated) {
        if (currentUser.id === postUserId) {
            return null
        }
        return (
            <div className={styles.btnFollow}>
                <Button 
                    title={postAuthor.is_followed ? "Following" : "Follow"}
                    type="border" 
                    size="s" 
                    actived={postAuthor.is_followed} 
                    onClick={() => onClickFollow(postAuthor)} 
                />
            </div>
        )
    } else {
        return (
            <div className={styles.btnFollow}>
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

const defaultFn = () => {}

export default function PostInfor({ 
    post = {},
    user = {},
    isLogin = false,
    onCopy = defaultFn,
    onClickLike= defaultFn,
    isLoadingPost = true,
    onClickFollow,
    type,
    onShowLoginModal,
    onClickShare = () => {}
}) {
    const notify = () => toast.dark('Sao chép thành công', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    })
    const currentUser = useSelector(userSelectors.getCurrentUser)
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    return (
        <div className={styles.wrapper}>
            {isLoadingPost ? <Loader /> : (
                <>
                    <Tippy
                        offset={[-150, 0]}
                        delay={300}
                        interactive
                        render={() => <PreviewAccount account={user} onClickFollow={onClickFollow}/>}
                    >
                        <div className={styles.user}>
                            <Avatar src={user.avatar} alt={user.nickname} shortName={post.shortName}/>
                            <Link to={`${config.routes.home}@${user.nickname}`} className={styles.name}>
                                <p className={styles.nickname}>{user.nickname}{user.tick ? <Tick /> : <></>}</p>
                                <p className={styles.username}>{user.name}</p>
                            </Link>
                            <span className={styles.fromNow}>{post.relativeTime}</span>
                        </div>
                    </Tippy>
                    <p className={styles.body}>{post.description}</p>
                    <p className={styles.music}>{post.music}</p>
                    <FollowButton
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                        type={type}
                        postUserId={user.id}
                        onShowLoginModal={onShowLoginModal}
                        postAuthor={user}
                        onClickFollow={onClickFollow}
                    />  

                    <div className={styles.interactive}>
                        <div className={`${styles.interactiveItem} ${styles.like}`}>
                            <div 
                                className={`${styles.iconWrapper} ${post.is_liked ? styles.liked : ''}`} 
                                onClick={isLogin ? () => onClickLike(post) : () => {}}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <span className={styles.number}>{post.likes_count}</span>
                        </div>
                        <div className={`${styles.interactiveItem} ${styles.comment}`}>
                            <div className={styles.iconWrapper}>
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <span className={styles.number}>{post.comments_count}</span>
                        </div>
                        <div className={styles.shareGroup}>
                            <span>Chia sẻ với</span>
                            <Tooltip content="Chia sẻ lên Facebook" interactive>
                                <button className={styles.icon} onClick={() => onClickShare('facebook', post)}>
                                    <FacebookIcon />
                                </button>
                            </Tooltip>
                            <Tooltip content="Chia sẻ lên Reddit" interactive>
                                <button className={styles.icon} onClick={() => onClickShare('reddit', post)}>
                                    <RedditIcon />
                                </button>
                            </Tooltip>
                            <Tooltip content="Chia sẻ lên Pinterest" interactive>
                                <button className={styles.icon} onClick={() => onClickShare('pinterest', post)}>
                                    <PinterestIcon />
                                </button>
                            </Tooltip>
                            <Tooltip content="Chia sẻ lên Twitter" interactive>
                                <button className={styles.icon} onClick={() => onClickShare('twitter', post)}>
                                    <TwitterIcon />
                                </button>
                            </Tooltip>
                            <Tooltip content="Chia sẻ lên Whatsapp" interactive>
                                <button className={styles.icon} onClick={() => onClickShare('whatsapp', post)}>
                                    <WhatsappIcon />
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    <p className={styles.copyLinkContainer}>
                        <span className={styles.link}>{window.location.href}</span>
                        <span className={styles.copy} onClick={onCopy}>
                            <FontAwesomeIcon icon={faLink} className={styles.icon} />
                            <CopyToClipboard 
                                text={window.location.href}
                            >
                                <span onClick={notify}>Sao chép liên kết</span>
                            </CopyToClipboard>
                            <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable={false}
                                pauseOnHover={false}
                            />
                        </span>
                    </p>
                </>
            )}
        </div>
    )
}