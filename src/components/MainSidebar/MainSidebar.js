import { useSelector } from 'react-redux'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import { selectors as userSelectors } from '~/state/user'

import TopSidebar from './TopSidebar'
import SuggestAccount from './SuggestAccount'
import Footer from './Footer'
import styles from './MainSidebar.module.scss'

export default function MainSidebar({ 
    onLogin, 
    suggestedAccounts, 
    followingAccounts,
    onSeeToggleSuggestedAccount,
    onSeeToggleFollowingAccount,
    onLoadMore,
    isExpanded,
    hideSeeBtn,
    isFollowingPage,
    isHomePage,
    isMinimize,
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    isLoadingSuggested,
    isLoadingFollowing,
    onClickFollow
}) {
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    return (
        <OverlayScrollbarsComponent 
            className={styles.wrapper} 
            style={{
                position: 'fixed',
                top: '60px',
                width: '260px'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            options={{
                scrollbars: {
                    autoHide: 'leave',
                    autoHideDelay: 0
                }
            }}

        >
            <TopSidebar 
                onLogin={onLogin}
            />
            {isHomePage || !isFollowingPage ? (
                <SuggestAccount 
                    accountsList={suggestedAccounts} 
                    onSeeToggle={onSeeToggleSuggestedAccount}
                    isExpanded={isExpanded}
                    hideSeeBtn={hideSeeBtn}
                    onLoadMore={onLoadMore}
                    title={'Tài khoản được đề xuất'}
                    isMinimize={isMinimize}
                    isLoading={isLoadingSuggested}
                    onClickFollow={onClickFollow}
                />
            ) : (
                <></>
            )}
            {isAuthenticated ? (
                <SuggestAccount 
                    accountsList={followingAccounts} 
                    onSeeToggle={onSeeToggleFollowingAccount}
                    isExpanded={isExpanded}
                    hideSeeBtn={hideSeeBtn}
                    title={'Tài khoản hàng đầu của bạn'}
                    isLoading={isLoadingFollowing}
                />
            ) : <></>}
            <Footer />
        </OverlayScrollbarsComponent>
    )
}