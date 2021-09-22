import styles from './AppPromotion.module.scss'
import toTopIcon from '~/assets/img/to-top-icon.svg'
import ModalDownload from './ModalDownload'

function AppPromotion({
    onGetWrapperRef = () => {},
    onScrollTop = () => {},
    value,
    onChangeValue,
    onGetModalDownload,
    onClickDownload = () => {},
    onCloseModalDownload
}) {

    return (
        <div className={styles.wrapper} ref={onGetWrapperRef}>
            <button className={styles.download} onClick={onClickDownload}>Tải ứng dụng</button>
            <div className={styles.onScrollTop}>
                <img src={toTopIcon} alt="to-top-icon" onClick={onScrollTop} />
            </div>

            <ModalDownload
                value={value}
                onChangeValue={onChangeValue}
                onGetModalDownload={onGetModalDownload}
                onCloseModalDownload={onCloseModalDownload}
            />
        </div>
    )
}

export default AppPromotion