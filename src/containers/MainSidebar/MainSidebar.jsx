import { useEffect, useState } from 'react'
import axios from 'axios'

import MainSidebarComponent from '~/components/MainSidebar'
import Account from '~/containers/entities/Account'
import LoginAndRegisterModal from '../LoginAndRegisterModal'

function MainSidebar() {
    const [suggestedAccounts, setSuggestedAccounts] = useState([])
    const [followingAccounts, setFollowingAccounts] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isMinimize, setIsMinimize] = useState(true)
    const [showLoginAndRegisterModal, setShowLoginAndRegisterModal] = useState(false)
    const [suggestedPage, setSuggestedPage] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0
    })
    const [followingPage, setFollowingPage] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0
    })
    const [isLoadingSuggested, setIsLoadingSuggested] = useState(true)
    const [isLoadingFollowing, setIsLoadingFollowing] = useState(true)

    const handleSeeToggleSuggestedAccount = () => {
        if (!isExpanded) {
            setSuggestedPage({
                ...suggestedPage,
                currentPage: suggestedPage.currentPage + 1
            })
            setIsExpanded(true)
            setIsMinimize(false)
        } else {
            setIsMinimize(!isMinimize)
        }
    }

    const handleLoadMore = () => {
        if (suggestedPage.currentPage < suggestedPage.totalPages) {
            setSuggestedPage({
                ...suggestedPage,
                currentPage: suggestedPage.currentPage + 1
            })
        }
    }

    const handleSeeToggleFollowingAccount = () => {
        setFollowingPage({
            ...suggestedPage,
            currentPage: suggestedPage.currentPage + 1
        })
    }

    const getSuggestedAccounts = () => {
        setIsLoadingSuggested(true)
        axios.get(`/api/users/suggested?page=${suggestedPage.currentPage}`)
            .then(res => {
                const AccountRes = Account.createFromList(res.data)
                setSuggestedPage({
                    ...suggestedPage,
                    total: res.meta.pagination.total,
                    perPage: res.meta.pagination.per_page,
                    totalPages: res.meta.pagination.total_pages
                })
                setSuggestedAccounts([...suggestedAccounts, ...AccountRes])
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingSuggested(false)
            })
    }
    
    const getFollowingAccount = () => {
        setIsLoadingFollowing(true)
        axios.get(`/api/me/followings?page=${followingPage.currentPage}`)
            .then(res => {
                const AccountRes = Account.createFromList(res.data)
                setFollowingPage({
                    ...suggestedPage,
                    total: res.meta.pagination.total,
                    perPage: res.meta.pagination.per_page,
                    totalPages: res.meta.pagination.total_pages
                })
                setFollowingAccounts([...suggestedAccounts, ...AccountRes])
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingFollowing(false)
            })
    }
    // console.log(suggestedPage, suggestedAccounts)

    useEffect(getSuggestedAccounts, [suggestedPage.currentPage])
    useEffect(getFollowingAccount, [followingPage.currentPage])
    
    const handleMouseEnter = () => {
        document.querySelector('body').style.overflowY = 'hidden';
    }

    const handleMouseLeave = () => {
        document.querySelector('body').style.overflowY = 'overlay';
    }

    const handleClickFollow = async account => {
        try {
            const res = await axios.post(`/api/users/${account.id}/${account.is_followed ? 'unfollow' : 'follow'}`)
            const accountIndex = suggestedAccounts.findIndex(item => item.id === account.id)
            const newAccount = Account.create(res.data)
            suggestedAccounts.splice(accountIndex, 1, newAccount)
            setSuggestedAccounts(suggestedAccounts.slice(0))
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <MainSidebarComponent
                onLogin={() => setShowLoginAndRegisterModal(true)}
                suggestedAccounts={suggestedAccounts}
                followingAccounts={followingAccounts}
                onLoadMore={handleLoadMore}
                onSeeToggleSuggestedAccount={handleSeeToggleSuggestedAccount}
                onSeeToggleFollowingAccount={handleSeeToggleFollowingAccount}
                hideSeeBtn={suggestedPage.totalPages === 1}
                isExpanded={isExpanded}
                isMinimize={isMinimize}
                isLogin={true}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isLoadingSuggested={isLoadingSuggested}
                isLoadingFollowing={isLoadingFollowing}
                onClickFollow={handleClickFollow}
            />
            {showLoginAndRegisterModal ? (
                <LoginAndRegisterModal 
                    onCloseRequest={() => setShowLoginAndRegisterModal(false)}
                />
            ) : <></>}
        </>
    )
}

export default MainSidebar