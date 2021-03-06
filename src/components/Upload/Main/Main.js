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
                                <p className={styles.instructure}>Ch???n video ????? t???i l??n</p>
                                <p className={styles.subInstructure}>Ho???c k??o v?? th??? t???p tin</p>
                                <br/>
                                <ul className={styles.conditions}>
                                    <li>MP4 ho???c WebM</li>
                                    <li>????? ph??n gi???i 720x1280 tr??? l??n</li>
                                    <li>T???i ??a 180 gi??y</li>
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
                                <span>Ch?? th??ch</span>
                                <span className={styles.numberOfLetter}><span>{inputValue.length}</span> / 150</span>
                            </p>
                            <div className={`${styles.inputText} ${showWarning ? styles.warning : ''}`}>
                                <input type="text" value={inputValue} onChange={onChangeInputValue} />
                            </div>
                        </div>
                        <div className={styles.thumbnailsWrapper}>
                            <p className={styles.heading}>???nh b??a</p>
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
                                <p className={styles.heading}>Ai c?? th??? xem video n??y</p>
                                <div className={styles.groupItems}>
                                    <div className={styles.item}>
                                        <input type="radio" id="public" value='public' name="permision" checked={viewMode === 'public'} onChange={onChangeViewMode} />
                                        <label htmlFor="public">C??ng khai</label>
                                    </div>
                                    <div className={styles.item}>
                                        <input type="radio" id="friends" value='friends' name="permision" checked={viewMode === 'friends'} onChange={onChangeViewMode} />
                                        <label htmlFor="friends">B???n b??</label>
                                    </div>
                                    <div className={styles.item}>
                                        <input type="radio" id="private" value='private' name="permision" checked={viewMode === 'private'} onChange={onChangeViewMode} />
                                        <label htmlFor="private">Ri??ng t??</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modifierGroup}>
                                <p className={styles.heading}>Cho ph??p ng?????i d??ng</p>
                                <div className={styles.groupItems}>
                                    <div className={styles.item}>
                                        <input type="checkbox" id="comment" name="permision" value='comment' checked={allows.includes('comment')} onChange={onChangeAllows} />
                                        <label htmlFor="comment">B??nh lu???n</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonSubmit}>
                            <Button
                                title="H???y b???"
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
                                title="????ng"
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