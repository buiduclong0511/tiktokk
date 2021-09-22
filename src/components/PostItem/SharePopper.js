import styles from './SharePopper.module.scss'
import {
    Facebook as FacebookIcon,
    Reddit as RedditIcon,
    Pinterest as PinterestIcon,
    Twitter as TwitterIcon,
    Whatsapp as WhatsappIcon
} from '~/packages/duclong-icon'

export default function SharePopper({
    onClickShare = () => {}
}) {
    return (
        <div className={styles.wrapper}>
            <button className={styles.interactiveItem} onClick={() => onClickShare('facebook')}>
                <span className={styles.icon}>
                    <FacebookIcon />
                </span>
                <span className={styles.text}>Chia sẻ với Facebook</span>
            </button>
            <button className={styles.interactiveItem} onClick={() => onClickShare('reddit')}>
                <span className={styles.icon}>
                    <RedditIcon />
                </span>
                <span className={styles.text}>Chia sẻ với Reddit</span>
            </button>
            <button className={styles.interactiveItem} onClick={() => onClickShare('pinterest')}>
                <span className={styles.icon}>
                    <PinterestIcon />
                </span>
                <span className={styles.text}>Chia sẻ với Pinterest</span>
            </button>
            <button className={styles.interactiveItem} onClick={() => onClickShare('twitter')}>
                <span className={styles.icon}>
                    <TwitterIcon />
                </span>
                <span className={styles.text}>Chia sẻ với Twitter</span>
            </button>
            <button className={styles.interactiveItem} onClick={() => onClickShare('whatsapp')}>
                <span className={styles.icon}>
                    <WhatsappIcon />
                </span>
                <span className={styles.text}>Chia sẻ với Whatsapp</span>
            </button>
        </div>
    )
}