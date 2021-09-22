import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import styles from './CommentItem.module.scss'
import Avatar from '~/components/Avatar'
import Menu from './Menu'
import Tick from '~/components/Tick'

export default function CommentItem({
    comment = {},
    onLikeComment = () => {},
    onReply = () => {},
    authorId = 0,
    onDeleteComment = () => {}
}) {
    const currentUser = useSelector(userSelectors.getCurrentUser)
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Avatar 
                    src={comment.author.avatar} 
                    alt={comment.author.nickname}
                    dimension={40} 
                />
                <div className={styles.body}>
                    <p className={styles.username}>
                        {comment.author.nickname} 
                        {comment.author.tick ? <Tick /> : <></>}
                        {comment.author.id === authorId ? (
                            <span style={{
                                fontSize: '1.4rem',
                                color: 'rgb(254, 44, 85)',
                                fontWeight: 'lighter',
                                marginLeft: '4px'
                            }}>Tác giả</span>
                        ) : <></>}
                    </p>
                    <p className={styles.comment}>{comment.comment}</p>
                    <p className={styles.time}>
                        <span>{comment.relativeTime}</span>
                        <button className={styles.reply} onClick={onReply}>Trả lời</button>
                    </p>
                </div>
            </div>
            <div className={`${styles.interactive} ${comment.is_liked ? styles.liked : ''}`} onClick={() => onLikeComment(comment)}>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                <span>{comment.likes_count ? comment.likes_count : '0'}</span>
            </div>
            {currentUser.id === comment.author.id ? (
                <Tippy
                    interactive
                    render={() => <div onClick={onDeleteComment}><Menu title={'Xóa'} /></div>}
                    placement={'bottom'}
                    appendTo={() => document.body}
                >
                    <div className={styles.menu}>
                        <button><FontAwesomeIcon icon={faEllipsisV} /></button>
                    </div>
                </Tippy>
            ) : (
                <Tippy
                    interactive
                    render={() => <div><Menu/></div>}
                    placement={'bottom'}
                    appendTo={() => document.body}
                >
                    <div className={styles.menu}>
                        <button><FontAwesomeIcon icon={faEllipsisV} /></button>
                    </div>
                </Tippy>
            )}
        </div>
    )
}