import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import PostDetailModalComponent from '~/components/PostDetailModal'
import Post from '~/containers/entities/Post'
import Comment from '~/containers/entities/Comment'
import Account from 'containers/entities/Account'

export default function PostDetailModal({ 
    videoId,
    onRequestClose,
    currentTime = 0,
    onNext,
    onPrev,
    getVideoModal,
    showNext,
    showPrev,
    onClickVolumn,
    isMuted,
    isPlaying,
    setIsPlaying = () => {}
}) {
    const [post, setPost] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [comments, setComments] = useState([])
    const defaultFn = () => {}
    const videoRef = useRef(null)
    const [isLoadingPost, setIsLoadingPost] = useState(true)
    const [isLoadingComment, setIsLoadingComment] = useState(true)
    const sendBtnRef = useRef(null)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const listCommentsRef = useRef(null)

    const ENTER_KEY = 13

    useEffect(async () => {
        setIsLoadingPost(true)
        try {
            const res = await axios.get(`api/posts/${videoId}`)
            setPost(Post.create(res.data))
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoadingPost(false)
        }
    }, [videoId])

    useEffect(async () => {
        setIsLoadingComment(true)
        try {
            const res = await axios.get(`/api/posts/${videoId}/comments`)
            setComments(Comment.createFromList(res.data))
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoadingComment(false)
        }
    }, [videoId])

    // console.log(comments)

    const handleClickLike = async post => {
        try {
            const res = await axios.post(`/api/posts/${post.id}/${post.is_liked ? 'unlike' : 'like'}`)
            const newPost = Post.create(res.data)
            setPost(newPost)
        } catch(err) {
            console.log(err)
        }
    }

    const handleSendComment = async () => {
        if (inputValue.trim()) {
            try {
                const res = await axios.post(`/api/posts/${videoId}/comments`, {
                    comment: inputValue
                })
                const newComment = Comment.create(res.data)
                setComments([newComment, ...comments])
                setInputValue('')
            } catch(err) {
                console.log(err)
            }
        }
    }

    const handleLikeComment = async comment => {
        const res = await axios.post(`/api/comments/${comment.id}/${comment.is_liked ? 'unlike' : 'like'}`)
        const newComment = Comment.create(res.data)
        const index = comments.findIndex(comment => comment.id === newComment.id)
        const newComments = comments.slice(0)
        newComments.splice(index, 1, newComment)
        setComments(newComments)
    }

    const getVideo = video => {
        if (video) {
            videoRef.current = video
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime
        }
    }, [videoRef.current])

    const handleClickFollow = async account => {
        try {
            const res = await axios.post(`/api/users/${account.id}/${account.is_followed ? 'unfollow' : 'follow'}`)
            const newUser = Account.create(res.data)
            const newPost = Post.create({
                ...post,
                user: newUser
            })
            // console.log(newPost, post)
            setPost(newPost)
        } catch(err) {
            console.log(err)
        }
    }

    const handleKeyUp = e => {
        if (e.keyCode === ENTER_KEY && inputValue) {
            sendBtnRef.current.click()
        }
    }

    const handleGetSendBtnRef = ref => {
        sendBtnRef.current = ref
    }

    const hanldeShowLoginModal = () => {
        setIsShowLoginModal(!isShowLoginModal)
    }

    const handleDeleteComment = commentId => {
        axios.delete('/api/comments/' + commentId)
            .catch(err => console.log(err))
        const commentIndex = comments.findIndex(comment => comment.id === commentId)
        const newComments = comments.slice(0)
        newComments.splice(commentIndex, 1)
        setComments(newComments)
    }

    const fbShare = (url, title, winWidth, winHeight) => {
        const winTop = (window.screen.height / 2) - (winHeight / 2);
        const winLeft = (window.screen.width / 2) - (winWidth / 2);
        window.open('http://www.facebook.com/sharer.php?u=' + url +'&p[title]=' + title, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    }

    function prShare(url, title, winWidth, winHeight) {
        var winTop = (window.screen.height / 2) - (winHeight / 2);
        var winLeft = (window.screen.width / 2) - (winWidth / 2);
        window.open('http://pinterest.com/pin/create/button/?url=' + url +'&description=' + title, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    }

    function twShare(url, title, winWidth, winHeight) {
        var winTop = (window.screen.height / 2) - (winHeight / 2);
        var winLeft = (window.screen.width / 2) - (winWidth / 2);
        window.open('http://twitter.com/share?text=' + title +'&url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    }

    const handleClickShare = (type, post) => {
        switch (type) {
            case 'facebook':
                fbShare(window.location.href, post.description, 500, 500)
                break
            case 'pinterest':
                prShare(window.location.href, post.description, 500, 500)
                break
            case 'twitter':
                twShare(window.location.href, post.description, 500, 500)
                break
            default:
        }
    }

    const handleGetListCommentRef = ref => {
        listCommentsRef.current = ref
    }

    if (!post) {
        return null
    }

    return (
        <PostDetailModalComponent 
            post={post}
            isLogin={true}
            onLike={defaultFn}
            onShare={defaultFn}
            onFollow={defaultFn}
            onCopy={defaultFn}
            comments={comments}
            disable={false}
            onChangeCommentText={e => setInputValue(e.target.value)}
            onRequestClose={onRequestClose}
            onNext={onNext}
            onPrev={onPrev}
            showNext={showNext}
            showPrev={showPrev}
            getVideoModal={getVideoModal}
            onClickLike={handleClickLike}
            inputValue={inputValue}
            getVideo={getVideo}
            onSendComment={handleSendComment}
            onLikeComment={handleLikeComment}
            onClickVolumn={onClickVolumn}
            isMuted={isMuted}
            isPlaying={isPlaying}
            onClickPlayPause={setIsPlaying}
            isLoadingPost={isLoadingPost}
            isLoadingComment={isLoadingComment}
            onClickFollow={handleClickFollow}
            onKeyUp={handleKeyUp}
            onGetSendBtnRef={handleGetSendBtnRef}
            onShowLoginModal={hanldeShowLoginModal}
            isShowLoginModal={isShowLoginModal}
            onDeleteComment={handleDeleteComment}
            onClickShare={handleClickShare}
            onGetListCommentRef={handleGetListCommentRef}
        />
    )
}