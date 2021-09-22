
import styles from './VideoPlayer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes, 
    faChevronRight,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

import {
    Volumn as VolumnIcon,
    Mute as MuteIcon,
    PlayLarge as PlayIcon
} from '~/packages/duclong-icon'
import Loader from '~/packages/duclong-loader'

function VideoPlayer({
    video = '', 
    onRequestClose = () => {},
    ratio = 0.5,
    // currentTime = 0,
    onNext = () => {},
    onPrev = () => {},
    showNext = false,
    showPrev = false,
    getVideoModal = () => {},
    getVideo = () => {},
    onClickVolumn = () => {},
    isMuted = true,
    isLoadingPost = true
}) {
    const screenV = {
        height: '100%'
    }
    const screenH = {
        width: '100%'
    }

    const playIconRef = useRef(null)

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.button} ${styles.close}`} onClick={onRequestClose}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className={`${styles.button} ${styles.volume}`} onClick={onClickVolumn}>
                {isMuted ? <MuteIcon /> : <VolumnIcon />}
            </div>
            {showNext ?
            <div 
                className={`${styles.button} ${styles.next}`} 
                onClick={() => {
                    onNext()
                    playIconRef.current.style.display = 'none'
                }}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </div> :
            <></>}
            {showPrev ? 
            <div 
                className={`${styles.button} ${styles.prev}`} 
                onClick={() => {
                    onPrev()
                    playIconRef.current.style.display = 'none'
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </div> :
            <></>}
            <div className={styles.playIcon} ref={playIconRef}>
                <PlayIcon />
            </div>
            {isLoadingPost ? <Loader /> : (
                <video 
                    src={video} 
                    className={styles.video}
                    muted={isMuted}
                    loop
                    style={ratio <= 1 ? screenV : screenH} 
                    ref={ref => {
                        getVideoModal(ref) 
                        getVideo(ref)
                    }}
                    onClick={e => {
                        if (e.target.paused) {
                            e.target.play()
                            playIconRef.current.style.display = 'none'
                        } else {
                            e.target.pause()
                            playIconRef.current.style.display = 'block'
                        }
                    }}
                />
            )}
        </div>
    )
}

export default VideoPlayer