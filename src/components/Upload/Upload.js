import { Grid } from '@mycv/mycv-grid'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { selectors as userSelectors } from '~/state/user'

import styles from './Upload.module.scss'
import Footer from './Footer'
import Main from './Main'
import LoginAndRegisterModal from '~/containers/LoginAndRegisterModal'
import Message from '~/components/Upload/Message'
import Loading from '~/packages/duclong-loader-upload'
import config from '~/config'

function Upload({
    videoUrl,
    onGetVideoUrl,
    showInstructure,
    onClose,
    inputValue,
    onChangeInputValue,
    showWarning,
    onVideoChangeURL,
    thumbnails,
    onClearThumbnails,
    onChangeCurrentTimeOfThumbnail,
    onUpload,
    onChangeViewMode,
    onChangeAllows,
    viewMode,
    allows,
    error = null,
    showErrorMessage = false,
    onCloseMessage,
    isLoading
}) {
    const history = useHistory()
    const isAuthenticate = useSelector(userSelectors.isAuthenticated)
    // if (!isAuthenticate) {
    //     history.push('/')
    // }
    if (true) {
        return (
            <div className={`${styles.wrapper} uploadWrapper`}>
                {isLoading ? <Loading /> : <></>}
                {showErrorMessage ? <Message 
                    message={error.message}
                    title={error.title}
                    type={error.type}
                /> : <></>}
                <Grid maxWidth={1100}>
                    <div className={styles.top}>
                        <p className={styles.heading}>Tải video lên</p>
                        <p className={styles.subHeading}>Video này sẽ được công bố cho @buiduclong0511</p>
                    </div>
    
                    <div className={styles.main}>
                        <Main 
                            videoUrl={videoUrl}
                            onGetVideoUrl={onGetVideoUrl}
                            showInstructure={showInstructure}
                            onClose={onClose}
                            inputValue={inputValue}
                            onChangeInputValue={onChangeInputValue}
                            showWarning={showWarning}
                            onVideoChangeURL={onVideoChangeURL}
                            thumbnails={thumbnails}
                            onClearThumbnails={onClearThumbnails}
                            onChangeCurrentTimeOfThumbnail={onChangeCurrentTimeOfThumbnail}
                            onUpload={onUpload}
                            onChangeViewMode={onChangeViewMode}
                            onChangeAllows={onChangeAllows}
                            viewMode={viewMode}
                            allows={allows}
                        />
                    </div>
                </Grid>
    
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <LoginAndRegisterModal />
            </div>
        )
    }
}

export default Upload