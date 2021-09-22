import { useRef } from 'react'

import styles from './Avatar.module.scss'

export default function Avatar({
    src = '',
    alt = '',
    dimension = 48,
    shortName = ''
}) {
    const imgRef = useRef(null)
    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.shortName}
                style={{
                    width: `${dimension}px`,
                    height: `${dimension}px`,
                    lineHeight: `${dimension}px`,
                    fontSize: `calc(${dimension}rem / 2 / 10)`
                }}
            >
                {shortName}
                <img 
                    src={src} 
                    alt={alt} 
                    className={styles.avatar} 
                    style={{
                        width: `${dimension}px`,
                        height: `${dimension}px`
                    }}
                    ref={imgRef}
                    onError={() => {
                        imgRef.current.style.display = 'none'
                    }}
                    onLoad={() => {
                        imgRef.current.style.display = 'inline-block'
                    }}
                />
            </div>
            
        </div>
    )
}