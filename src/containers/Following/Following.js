import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import FollowingComponent from '~/components/Following'
import FollowingAccount from '~/containers/entities/FollowingAccount'
import HomeContainer from '~/containers/Home'

function Following() {
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    })
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    useEffect(() => {
        // eslint-disable-next-line
        setIsLoading(true)
        axios.get(`/api/users/suggested?page=${pagination.currentPage}&per_page=12`)
            .then(res => {
                const newSuggestedUsers = [...suggestedUsers, ...FollowingAccount.createFromList(res.data)]
                setSuggestedUsers(newSuggestedUsers)
                setIsLoading(false)
                const newPagination = {
                    ...pagination,
                    totalPages: res.meta.pagination.total_pages
                }
                setPagination(newPagination)
            })
            .catch(err => console.log(err))
    }, [pagination.currentPage])
    
    const videoRefs = useRef({})

    const getVideoRefs = (videoId, video) => {
        videoRefs.current[videoId] = video
    }

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const oldId = useRef(null)

    const getVideoId = async id => {
        if (oldId.current && oldId.current !== id) {
            videoRefs.current[oldId.current].currentTime = 0
            await sleep(1)
            videoRefs.current[oldId.current].pause()
        }
        videoRefs.current[id].play()
        oldId.current = id
    }

    const handleLoadMore = () => {
        if (pagination.currentPage < pagination.totalPages) {
            const newPagination = {
                ...pagination,
                currentPage: pagination.currentPage + 1
            }
            setPagination(newPagination)
        }
    }

    const handleShowLoginModal = () => {
        setIsShowLoginModal(!isShowLoginModal)
    }

    const isAuthenticated = useSelector(userSelectors.isAuthenticated)

    if (!suggestedUsers) {
        return null
    }

    return (isAuthenticated ? (
        <HomeContainer type="following" />
    ) : (
        <FollowingComponent 
            suggestedUsers={suggestedUsers}
            getVideoRefs={getVideoRefs}
            getVideoId={getVideoId}
            isLoading={isLoading}
            onEnter={handleLoadMore}
            onShowLoginModal={handleShowLoginModal}
            isShowLoginModal={isShowLoginModal}
        />
    ))
}

export default Following