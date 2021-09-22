import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

import styles from './PostItem.module.scss'

export default function PostItem({
    fileUrl = '',
    viewsCount = 0,
    onShowDetail = () => {}
}) {

    let videoRef = useRef(null)
    return (
        <div onClick={onShowDetail} className={styles.wrapper}>
            <video 
                src={fileUrl} 
                className={styles.video}
                ref={videoRef}
                muted
                onMouseEnter={() => {
                    videoRef.current.play()
                }}
                onMouseLeave={() => {
                    videoRef.current.currentTime = 0
                    videoRef.current.pause()
                }}
            ></video>
            <div className={styles.viewsCount}>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faPlay} />
                </span>
                <span className={styles.number}>{viewsCount}</span>
            </div>
        </div>
    )
}