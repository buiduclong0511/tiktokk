import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import { selectors as userSelectors } from '~/state/user'

import styles from './Comment.module.scss'
import Button from '~/packages/duclong-button'
import CommentItem from './CommentItem'
import Loader from '~/packages/duclong-loader'

export default function Comment({ 
    comments = [],
    onChangeCommentText = () => {},
    inputValue = '',
    onSendComment = () => {},
    onLikeComment,
    isLoadingComment = true,
    authorId,
    onKeyUp = () => {},
    onGetSendBtnRef = () => {},
    onShowLoginModal = () => {},
    onDeleteComment,
    onGetListCommentRef = () => {}
}) {
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    const listCommentsRef = useRef(null)
    
    if (isAuthenticated) {
        return (
            <div className={styles.wrapperLogin}>
                {isLoadingComment ? <Loader /> : (
                    <div className={styles.listComments} ref={listCommentsRef}>
                        {comments.map(comment => <CommentItem 
                            key={comment.id}
                            comment={comment}
                            onLikeComment={onLikeComment}
                            onReply={comment.onReply}
                            onShowMenu={comment.onShowMenu}
                            authorId={authorId}
                            onDeleteComment={() => onDeleteComment(comment.id)}
                        />)}
                    </div>
                )}

                <div className={styles.typeComment}>
                    <div className={styles.sendWrapper}>
                        <input type="text" onChange={onChangeCommentText} value={inputValue} onKeyUp={onKeyUp} />
                        <span className={styles.tag}>@</span>
                        <span className={styles.emoji}>
                            <FontAwesomeIcon icon={faSmile} />
                        </span>
                    </div>
                    <button 
                        className={styles.btnSend} 
                        style={!inputValue.trim() ? {color: '#ccc'} : {color: 'var(--primary-color)'}}
                        onClick={() => {
                            onSendComment()
                            if (listCommentsRef.current) {
                                listCommentsRef.current.scrollTop = 0
                            }
                        }}
                        ref={onGetSendBtnRef}
                    >
                        Đăng
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapperUnLogin}>
                <h3 className={styles.heading}>Đăng nhập để xem bình luận</h3>
                <p className={styles.subHeading}>Đăng nhập để xem bình luận và thích video</p>
                <Button title="Đăng nhập" size="l" onClick={onShowLoginModal} />
                <p className={styles.signUp}>
                    Bạn không có tài khoản?
                    <span>Đăng ký</span>
                </p>
            </div>
        )
    }
}