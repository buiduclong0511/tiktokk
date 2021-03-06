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
                        ????ng
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapperUnLogin}>
                <h3 className={styles.heading}>????ng nh???p ????? xem b??nh lu???n</h3>
                <p className={styles.subHeading}>????ng nh???p ????? xem b??nh lu???n v?? th??ch video</p>
                <Button title="????ng nh???p" size="l" onClick={onShowLoginModal} />
                <p className={styles.signUp}>
                    B???n kh??ng c?? t??i kho???n?
                    <span>????ng k??</span>
                </p>
            </div>
        )
    }
}