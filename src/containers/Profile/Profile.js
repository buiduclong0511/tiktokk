import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import ProfileComponent from '~/components/Profile'
import ProfileUser from '~/containers/entities/ProfileUser'
import Post from '~/containers/entities/Post'
import Loader from '~/packages/duclong-loader'
import AppPromotion from '~/containers/AppPromotion'

export default function Profile() {
    const { nickname } = useParams()
    const [isVideoDisplay, setIsVideoDisplay] = useState(true)
    const [user, setUser] = useState(null)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    })
    const [likedPosts, setLikedPosts] = useState([])
    const [videoId, setVideoId] = useState('')
    const [showDetail, setShowDetail] = useState(false)
    useEffect(() => {
        setUser(null)
        axios.get(`/api/users/@${nickname}`)
            .then(res => {
                setUser(ProfileUser.create(res.data))
                setIsVideoDisplay(true)
            })
            .catch(err => console.log(err))
    }, [nickname])

    useEffect(() => {
        setUser(null)
        axios.get(`/api/users/${pagination.currentPage}/liked-posts`)
            .then(res => {
                const newLikedPosts = [...likedPosts, ...Post.createFromList(res.data)]
                setLikedPosts(newLikedPosts)
            })
    }, [])

    const handleClickFollow = async account => {
        try {
            const res = await axios.post(`/api/users/${account.id}/${account.is_followed ? 'unfollow' : 'follow'}`)
            const newUser = ProfileUser.create({
                ...user,
                is_followed: res.data.is_followed
            })
            setUser(newUser)
        } catch(err) {
            console.log(err)
        }
    }

    const handleClickTab = type => {
        if (type === 'video') {
            setIsVideoDisplay(true)
        }
        if (type === 'video-like') {
            setIsVideoDisplay(false)
        }
    }

    const handleShowLoginModal = () => {
        setIsShowLoginModal(!isShowLoginModal)
    }

    const handleShowDetail = (nickname, uuid) => {
        window.history.pushState(null, document.title, `/@${nickname}/video/${uuid}`)
        setVideoId(uuid)
        setShowDetail(true)
    }


    const handleRequestClose = () => {
        // window.history.back()
        setShowDetail(false)
    }
    
    if (!user) {
        return (
            <div style={{
                paddingTop: '60px'
            }}>
                <Loader />
            </div>
        )
    }
    return (
        <div>
            <ProfileComponent
                user={user}
                isVideoDisplay={isVideoDisplay}
                isPrivateLiked={true}
                posts={Post.createFromList(user.posts)}
                onClickFollow={handleClickFollow}
                onClickTab={handleClickTab}
                onShowLoginModal={handleShowLoginModal}
                isShowLoginModal={isShowLoginModal}
                likedPosts={likedPosts}
                onShowDetail={handleShowDetail}
                onRequestClose={handleRequestClose}
                videoId={videoId}
                showDetail={showDetail}
            />
            <AppPromotion />
        </div>
    )
}