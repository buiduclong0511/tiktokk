
import styles from './LoadingBar.module.scss'

function LoadingBar({
    height = 2,
    progress = 0,
    transition = 500
}) {

    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.progress} 
                style={{
                    height: `${height}px`,
                    width: `${progress}%`,
                    transition: `${transition}ms`
                }}
            ></div>
        </div>
    )
}

export default LoadingBar