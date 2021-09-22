import { Row, Column } from '@mycv/mycv-grid'
import { useRef, useEffect } from 'react'

import styles from './Main.module.scss'
import closeBtn from '~/assets/img/closeBtnUpload.svg'
import tagNameIcon from '~/assets/img/tagNameIcon.svg'
import hashTagIcon from '~/assets/img/hashTagIcon.svg'
import Button from '~/packages/duclong-button'

function Main({
    videoUrl = '',
    onGetVideoUrl = () => {},
    showInstructure = true,
    onClose = () => {},
    inputValue = '',
    onChangeInputValue = () => {},
    showWarning = false,
    onVideoChangeURL = () => {},
    thumbnails = [],
    onClearThumbnails = () => {},
    onChangeCurrentTimeOfThumbnail = () => {},
    onUpload = () => {},
    onChangeViewMode = () => {},
    onChangeAllows = () => {},
    viewMode = 'public',
    allows = [],
}) {

    const inputFileRef = useRef(null)
    const isDraggable = useRef(null);
    const thumbnailVideoWrapperRef = useRef(null)
    const thumbnailVideoRef = useRef(null)
    const translateX = useRef(null)
    const prevClientX = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        wrapperRef.current.onmousemove = e => {
            if (isDraggable.current) {
                const distant = e.clientX - prevClientX.current
                prevClientX.current = e.clientX
                translateX.current += distant
                if (translateX.current <= 462) {
                    thumbnailVideoWrapperRef.current.style.transform = `translateX(${translateX.current <= 0 ? 0 : translateX.current}px) translateY(-50%)`
                    
                    if (thumbnailVideoRef.current) {
                        thumbnailVideoRef.current.currentTime = thumbnailVideoRef.current.duration / 462 * translateX.current
                        onChangeCurrentTimeOfThumbnail(thumbnailVideoRef.current.currentTime)
                    }
                }
                wrapperRef.current.onmouseup = () => {
                    isDraggable.current = false
                }
            }
        }
    }, [wrapperRef.current])

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <Row>
                <Column sizeDesktop={4}>
                    <div className={styles.left} onClick={() => {
                        if (!videoUrl) {
                            inputFileRef.current.click()
                        }
                    }}>
                        {showInstructure ? (
                            <div className={styles.instructureWrapper}>
                                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/cloud_icon-6e07be44878e69ee3f7bff3b78405b76.svg" alt="icon" className={styles.icon}/>
                                <p className={styles.instructure}>Chọn video để tải lên</p>
                                <p className={styles.subInstructure}>Hoặc kéo và thả tập tin</p>
                                <br/>
                                <ul className={styles.conditions}>
                                    <li>MP4 hoặc WebM</li>
                                    <li>Độ phân giải 720x1280 trở lên</li>
                                    <li>Tối đa 180 giây</li>
                                </ul>
                            </div>
                        ) : (
                            <button className={styles.closeBtn} onClick={() => {
                                inputFileRef.current.value = null
                                inputFileRef.current.click()
                                onClose()
                                onClearThumbnails()
                            }}>
                                <img src={closeBtn} alt="close"/>
                            </button>
                        )}
                        <div className={styles.previewVideo} >
                            <video 
                                src={videoUrl} 
                                muted 
                                autoPlay 
                                ref={onVideoChangeURL}
                                controls={!!videoUrl}
                                loop
                            />
                        </div>
                    </div>
                    <input 
                        className={styles.inputFile} type="file" 
                        ref={inputFileRef} 
                        onChange={e => {
                            onGetVideoUrl(e)
                            e.target.value = null
                        }} 
                    />
                </Column>
                <Column sizeDesktop={8}>
                    <div className={styles.right}>
                        <div className={styles.caption}>
                            <p className={styles.heading}>
                                <span>Chú thích</span>
                                <span className={styles.numberOfLetter}><span>{inputValue.length}</span> / 150</span>
                            </p>
                            <div className={`${styles.inputText} ${showWarning ? styles.warning : ''}`}>
                                <input type="text" value={inputValue} onChange={onChangeInputValue} />
                            </div>
                        </div>
                        <div className={styles.thumbnailsWrapper}>
                            <p className={styles.heading}>Ảnh bìa</p>
                            <div className={styles.thumbnails}>
                                {thumbnails.map(thumbnail => (
                                    <img src={thumbnail} />
                                ))}
                                {thumbnails.length ? (
                                    <div 
                                        ref={ref => {
                                            thumbnailVideoWrapperRef.current = ref
                                            translateX.current = 0
                                        }}
                                        className={styles.thumbnail}
                                        onMouseDown={e => {
                                            isDraggable.current = true
                                            prevClientX.current = e.clientX
                                        }}
                                        onMouseUp={() => {
                                            isDraggable.current = false
                                        }}
                                        
                                    >
                                        <video src={videoUrl} ref={thumbnailVideoRef} ></video>
                                    </div>
                                ) : <></>}
                            </div>
                        </div>

                        <div className={styles.modifier}>
                            <div className={styles.modifierGroup}>
                                <p className={styles.heading}>Ai có thể xem video này</p>
                                <div className={styles.groupItems}>
                                    <div className={styles.item}>
                                        <input type="radio" id="public" value='public' name="permision" checked={viewMode === 'public'} onChange={onChangeViewMode} />
                                        <label htmlFor="public">Công khai</label>
                                    </div>
                                    <div className={styles.item}>
                                        <input type="radio" id="friends" value='friends' name="permision" checked={viewMode === 'friends'} onChange={onChangeViewMode} />
                                        <label htmlFor="friends">Bạn bè</label>
                                    </div>
                                    <div className={styles.item}>
                                        <input type="radio" id="private" value='private' name="permision" checked={viewMode === 'private'} onChange={onChangeViewMode} />
                                        <label htmlFor="private">Riêng tư</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modifierGroup}>
                                <p className={styles.heading}>Cho phép người dùng</p>
                                <div className={styles.groupItems}>
                                    <div className={styles.item}>
                                        <input type="checkbox" id="comment" name="permision" value='comment' checked={allows.includes('comment')} onChange={onChangeAllows} />
                                        <label htmlFor="comment">Bình luận</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonSubmit}>
                            <Button
                                title="Hủy bỏ"
                                size="l"
                                type="boder"
                                actived
                                onClick={() => {
                                    inputFileRef.current.value = null
                                    inputFileRef.current.click()
                                    onClose()
                                    onClearThumbnails()
                                }}
                            />
                            <Button
                                title="Đăng"
                                size="l"
                                onClick={onUpload}
                            />
                        </div>
                    </div>
                </Column>
            </Row>
        </div>
    )
}

export default Main