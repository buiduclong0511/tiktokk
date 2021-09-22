import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import HeaderComponent from '~/components/Header'
import Account from '~/containers/entities/Account'
import LoginAndRegisterModal from '../LoginAndRegisterModal'
import { useDebounce } from '~/hooks'
import config from '~/config'

function Header() {
    const [searchText, setSearchText] = useState('')
    const [searchingStatus, setSearchingStatus] = useState(true)
    const [searchResult, setSearchResult] = useState([])
    const [showLoginAndRegisterModal, setShowLoginAndRegisterModal] = useState(false)
    const [isShowSearchResult, setIsShowSearchResult] = useState(false)
    const [isActived, setIsActived] = useState(false)
    const history = useHistory()
    const ENTER_KEY = 13

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const showSearchResult = () => {
        setIsShowSearchResult(true)
    }
    
    const hideSearchResult = async () => {
        await sleep(200)
        setIsShowSearchResult(false)
    }

    const handleSearchChange = (value) => {
        setSearchText(value)
        setSearchingStatus(true)
    }

    const showProfile = (nickname) => {
        history.push(`${config.routes.base}/@${nickname}`)
    }

    const clearText = () => {
        setSearchText('')
    }
    
    const handleScrollToTop = () => {
        if (window.scrollY > 100 && window.scrollY < 7300) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        } else {
            history.push('/')
            window.location.reload()
        }
    }

    const handleKeyUpSearchBox = e => {
        setIsShowSearchResult(true)
        if (e.keyCode === ENTER_KEY && searchText.trim()) {
            history.push(`${config.routes.base}${config.routes.allSearchResults}?q=${searchText}`)
            setIsShowSearchResult(false)
        }
    }

    const handleClickSearchBtn = () => {
        if (searchText.trim()) {
            history.push(`${config.routes.base}${config.routes.allSearchResults}?q=${searchText}`)
        }
    }

    useDebounce(async () => {
        try {
            const res = await axios.get(`/api/users/search?q=${searchText}&type=less&page=1`)
            setSearchResult(Account.createFromList(res.data))
            // await sleep(500)
            setSearchingStatus(false)
        } catch(err) {
            console.log(err)
        }
    }, 500, [searchText])

    // console.log(searchResult, searchingStatus)

    const handleLogout = () => {
        axios.post('/api/auth/logout')
            .then()
            .catch(err => console.log(err))
        window.localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <div>
            <HeaderComponent 
                searchValue={searchText}
                onSearchChange={handleSearchChange}
                isSearching={searchingStatus}
                data={searchResult}
                showProfile={showProfile}
                clearText={clearText}
                onLogin={() => {setShowLoginAndRegisterModal(true)}}
                onScrollToTop={handleScrollToTop}
                showSearchResult={showSearchResult}
                hideSearchResult={hideSearchResult}
                isShowSearchResult={isShowSearchResult}
                isLogin={true}
                onClickNotifications={() => setIsActived(!isActived)}
                isActived={isActived}
                onLogout={handleLogout}
                onKeyUpSearchBox={handleKeyUpSearchBox}
                onClickSearchBtn={handleClickSearchBtn}
            />

            {showLoginAndRegisterModal ? <LoginAndRegisterModal 
                onCloseRequest={() => {setShowLoginAndRegisterModal(false)}}
            /> : <></>}
        </div>
    )
}

export default Header