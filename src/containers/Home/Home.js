// import { useHistory } from 'react-router-dom'
import {
    useEffect,
    useState,
    useRef
} from 'react'
import axios from 'axios'

import Post from '~/containers/entities/Post'
import HomeComponent from '~/components/Home'
import { useDebounce } from '~/hooks'
import storage from '~/utils/storage'

function Home({ type = 'for-you', except = null, postDetail }) {
    const [posts, setPosts] = useState([])
    const [videoId, setVideoId] = useState('')
    const [showDetail, setShowDetail] = useState(false)
    const [isScrollDown, setIsScrollDown] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [postId, setPostId] = useState(0)
    let prevScrollY = useRef(0)
    let oldVideoRef = useRef(null)
    const videoRefs = useRef({})
    const [currenPage, setCurrentPage] = useState(1)
    const videoModal = useRef(null)
    const [isMuted, setIsMuted] = useState(storage.get('isMuted', true))
    const [isPlaying, setIsPlaying] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/api/videos?type=${type}&page=${currenPage}${except ? '&except=' + except : ''}`)
            .then(res => {
                const newPosts = [...posts, ...Post.createFromList(res.data)]
                setPosts(newPosts)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
        window.onscroll = () => {
            if (window.scrollY > prevScrollY.current) {
                setIsScrollDown(true)
            } else if (window.scrollY < prevScrollY.current) {
                setIsScrollDown(false)
            }
            prevScrollY.current = window.scrollY
        }
    }, [currenPage])

    useEffect(() => {
        // eslint-disable-next-line
        window.history.scrollRestoration = 'manual'
        return () => {
            window.history.scrollRestoration = 'auto'
        }
    }, [])

    const wayPointProps = {}
    if (isScrollDown) {
        wayPointProps.bottomOffset = 220
    } else {
        wayPointProps.topOffset = 200
    }

    

    const handleEnter = _postId => {
        setPostId(_postId)
        setIsPlaying(true)
    }

    useDebounce(() => {
        if (oldVideoRef.current) {
            oldVideoRef.current.pause()
            oldVideoRef.current.currentTime = 0
        }
        oldVideoRef.current = videoRefs.current[postId]
        if (videoRefs.current[postId] && !showDetail) {
            videoRefs.current[postId].play()
        }
    }, 500, [postId])

    // console.log(posts)
    
    const handleShowDetail = (nickname, uuid, postId) => {
        window.history.pushState(null, document.title, `/@${nickname}/video/${uuid}`)
        if (videoRefs.current[postId]) {
            videoRefs.current[postId].pause()
            setCurrentTime(videoRefs.current[postId].currentTime)
        }
        setVideoId(uuid)
        setShowDetail(true)
    }


    const handleRequestClose = (postId) => {
        // videoModal.current.pause()
        if (videoRefs.current[postId]) {
            videoRefs.current[postId].currentTime = videoModal.current.currentTime
            videoRefs.current[postId].play()
            setIsPlaying(true)
        }
        window.history.back()
        setShowDetail(false)
    }

    const handleVideoRef = (video, postId) => {
        videoRefs.current[postId] = video
    }

    const currentPostIndex = () => {
        return posts.findIndex(post => post.uuid === videoId)
    }

    const scrollToPost = id => {
        const videoRef = videoRefs.current[id]
        if (videoRef) {
            videoRef.scrollIntoView({ block: 'center' })
        }
    }

    const changePost = (type = 'next') => {
        const currentIndex = currentPostIndex()
        let nextPost
        if (type === 'next') {
            nextPost = posts[currentIndex + 1]
        }
        if (type === 'prev') {
            nextPost = posts[currentIndex - 1]
        }
        window.history.replaceState(null, document.title, `/@${nextPost.user.nickname}/video/${nextPost.uuid}`)
        setVideoId(nextPost.uuid)
        scrollToPost(nextPost.id)
        // console.log(nextPost)
        
    }

    const likeFetchingIds = useRef([])

    const handleClickLike = async post => {
        if (likeFetchingIds.current.includes(post.id)) {
            return 
        }
        likeFetchingIds.current.push(post.id)
        try {
            const res = await axios.post(`/api/posts/${post.id}/${post.is_liked ? 'unlike' : 'like'}`)
            const postIndex = posts.findIndex(item => item.id === post.id)
            const newPost = Post.create(res.data)
            posts.splice(postIndex, 1, newPost)
            setPosts(posts.slice(0))
        } catch(err) {
            console.log(err)
        } finally {
            const index = likeFetchingIds.current.indexOf(post.id)
            likeFetchingIds.current.splice(index, 1)
        }
    }

    const handleClickFollow = async post => {
        try {
            const res = await axios.post(`/api/users/${post.user.id}/${post.user.is_followed ? 'unfollow' : 'follow'}`)
            const postIndex = posts.findIndex(item => item.id === post.id)
            const newPost = Post.create(posts[postIndex])
            newPost.user = res.data
            const newPosts = [...posts]
            newPosts.splice(postIndex, 1, newPost)
            setPosts(newPosts)
        } catch(err) {
            console.log(err)
        }
    }

    const getVideoModal = video => {
        if (video) {
            // video.currentTime = currentTime
            video.play()
            videoModal.current = video
        }
    }

    const handleNext = () => changePost()

    const handlePrev = () => changePost('prev')

    const handleLoadMore = () => {
        setCurrentPage(currenPage + 1)
    }

    const setMuted = () => {
        storage.set('isMuted', true)
    }

    useEffect(setMuted, [])

    const handleClickVolumn = () => {
        storage.set('isMuted', !isMuted)
        setIsMuted(storage.get('isMuted', true))
    }

    const handleClickPlayPause = postId => {
        if (videoRefs.current[postId].paused) {
            videoRefs.current[postId].play()
            setIsPlaying(true)
        } else {
            videoRefs.current[postId].pause()
            setIsPlaying(false)
        }
    }

    if (showDetail) {
        document.querySelector('body').style.overflowY = 'hidden'
    } else {
        document.querySelector('body').style.overflowY = 'overlay'
    }

    const handleShowLoginModal = () => {
        setIsShowLoginModal(!isShowLoginModal)
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

    return (
        <HomeComponent 
            posts={posts}
            postDetail={postDetail}
            videoId={videoId}
            onShowDetail={handleShowDetail}
            onRequestClose={handleRequestClose}
            showDetail={showDetail}
            onEnter={handleEnter}
            wayPointProps={wayPointProps}
            onVideoRef={handleVideoRef}
            currentTime={currentTime}
            onNext={handleNext}
            onPrev={handlePrev}
            getVideoModal={getVideoModal}
            showNext={currentPostIndex() < posts.length - 1}
            showPrev={currentPostIndex() > 0}
            onClickLike={handleClickLike}
            onClickFollow={handleClickFollow}
            onLoadMore={handleLoadMore}
            onClickVolumn={handleClickVolumn}
            onClickPlayPause={handleClickPlayPause}
            isMuted={isMuted}
            isPlaying={isPlaying}
            setIsPlaying={() => setIsPlaying(!isPlaying)}
            isLoading={isLoading}
            type={type}
            onShowLoginModal={handleShowLoginModal}
            onClickShare={handleClickShare}
            isShowLoginModal={isShowLoginModal}
        />
    )
}

export default Home