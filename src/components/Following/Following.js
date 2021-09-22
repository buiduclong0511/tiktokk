import SuggestedUsers from './SuggestedUsers'
import styles from './Following.module.scss'
import AppPromotion from '~/containers/AppPromotion'
import LoginAndRegisterModal from '~/containers/LoginAndRegisterModal'

export default function Following ({
    suggestedUsers,
    getVideoRefs,
    getVideoId,
    isLoading,
    onEnter,
    onShowLoginModal,
    isShowLoginModal = false
}) {
    return (
        <div className={styles.wrapper}>
            <SuggestedUsers 
                suggestedUsers={suggestedUsers}
                getVideoRefs={getVideoRefs}
                getVideoId={getVideoId}
                isLoading={isLoading}
                onEnter={onEnter}
                onShowLoginModal={onShowLoginModal}
            />

            <AppPromotion />

            {isShowLoginModal ? <LoginAndRegisterModal onCloseRequest={onShowLoginModal} /> : <></>}
        </div>
    )
}