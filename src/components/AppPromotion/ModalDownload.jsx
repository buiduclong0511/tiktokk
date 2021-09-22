import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import styles from './ModalDownload.module.scss'
import qrCodeWrapper from '~/assets/img/qr-code-wrapper.svg'
import qrCode from '~/assets/img/qr-code.png'
import Button from '~/packages/duclong-button'
import appStore from '~/assets/img/apple-store.svg'
import googlePlay from '~/assets/img/google-play.svg'
import closeBtn from '~/assets/img/closeBtn.svg'

function ModalDownload ({
    value = '',
    onChangeValue = () => {},
    onGetModalDownload = () => {},
    onCloseModalDownload = () => {}
}) {
    return (
        <div className={styles.wrapper} ref={onGetModalDownload}>
            <button className={styles.closeBtn} onClick={onCloseModalDownload}>
                <img src={closeBtn} alt="closeBtn" />
            </button>
            <p className={styles.heading}>Tải ứng dụng Tiktok</p>
            <p className={styles.subHeading}>Hướng máy ảnh của bạn về phía mã QR để tải về TikTok</p>
            <div className={styles.qrCode}>
                <img src={qrCodeWrapper} alt="qrCodeWrapper" className={styles.qrCodeWrapper} />
                <img src={qrCode} alt="QR Code" className={styles.qrCodeMain} />
            </div>
            <p className={styles.downloadText}>Gửi cho chính bạn liên kết để tải TikTok về</p>
            <div className={styles.downloadContainer}>
                <div className={styles.phoneInput}>
                    <PhoneInput 
                        international
                        defaultCountry="VN"
                        value={value}
                        onChange={e => onChangeValue(e)}
                        placeholder="Số điện thoại"
                    />
                    <Button 
                        title="Gửi"
                        size="s"
                    />
                </div>
                <div className={styles.policy}>
                Thông qua việc nhấp vào nút "gửi", bạn xác nhận rằng bạn đồng ý với <b>Điều khoản Sử dụng</b> của chúng tôi và rằng bạn đã đọc và hiểu <b>Chính sách Quyền riêng tư</b> của chúng tôi
                </div>

                <div className={styles.downloadApp}>
                    <a target="_blank" href="https://apps.apple.com/MY/app/id1235601864?mt=8"><img src={appStore} alt="appStore" /></a>
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=com.ss.android.ugc.trill&referrer=af_tranid%3DWGEoNc2rhiVGOb1zS6Q-9Q%26af_adset%3Dwebapp_reflow%26pid%3Dtiktokweb%26af_siteid%3Dpc%26c%3Dhomepage_hot%26af_ad%3Dclick_app_store%26af_ad_id%3Dno_referrer%26af_web_id%3Dc7d307ec-06ea-44f6-9847-315fef9b2f4e-c"><img src={googlePlay} alt="appStore" /></a>
                </div>
            </div>
        </div>
    )
}

export default ModalDownload