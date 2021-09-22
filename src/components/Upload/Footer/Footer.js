import { Row, Column, Grid } from '@mycv/mycv-grid'

import logoText from '~/assets/img/logo-text-light.svg'
import logoMusic from '~/assets/img/logo-music-note-light.svg'
import styles from './Footer.module.scss'

function Footer() {
    return (
        <div className={styles.wrapper}>
            <Grid maxWidth={1100}>
                <Row>
                    <Column sizeDesktop={4}>
                        <img src={logoMusic} alt="logomusic"/>
                        <img src={logoText} alt="logotext"/>
                    </Column>
                    <Column sizeDesktop={2}>
                        <p className={styles.heading}>Công ty</p>
                        <ul>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Giới thiệu</a></li> 
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Bảng tin</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Liên hệ</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Sự nghiệp</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">ByteDance</a></li>
                        </ul>
                    </Column>
                    <Column sizeDesktop={2}>
                        <p className={styles.heading}>Chương trình</p>
                        <ul>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Tiktok for Good</a></li> 
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Advertise</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Developers</a></li>
                        </ul>
                    </Column>
                    <Column sizeDesktop={2}>
                        <p className={styles.heading}>Hỗ trợ</p>
                        <ul>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Trung tâm trợ giúp</a></li> 
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Trung tâm an toàn</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Creator Portal</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Hướng dẫn cộng đồng</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Minh bạch</a></li>
                        </ul>
                    </Column>
                    <Column sizeDesktop={2}>
                        <p className={styles.heading}>Pháp lý</p>
                        <ul>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Tuân thủ pháp luật</a></li> 
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Điều khoản dịch vụ</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Liên hệ</a></li>
                            <li><a href="https://www.tiktok.com/about?lang=vi-VN">Chính sách quyền riêng tư</a></li>
                        </ul>
                    </Column>
                </Row>
            </Grid>
            <p className={styles.copyright}>© 2021 TikTok</p>
        </div>
    )
}

export default Footer