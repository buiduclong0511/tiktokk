import styles from './ListFriend.module.scss'

function Menu() {
    return (
        <div className={styles.menuWrapper}>
            <div className={styles.item}>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/mute-action-icon-c037f494b844b21beeeb5758bc35b3a8.svg" alt="mute"/>
                <p className={styles.text}>Tắt tiếng</p>
            </div>
            <div className={styles.item}>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/trash-bin-icon-26b568c312ef800c355d8a304e35aa50.svg" alt="delete"/>
                <p className={styles.text}>Xóa</p>
            </div>
            <div className={styles.item}>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/pin-top-icon-6e4d9912c3a3b189da00780ff8c17b7a.svg" alt="pin"/>
                <p className={styles.text}>Ghim lên đầu</p>
            </div>
            <div className={styles.item}>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/flag-icon-e35a4322f4132a16ac177b0355508c4e.svg" alt="report"/>
                <p className={styles.text}>Báo cáo</p>
            </div>
            <div className={styles.item}>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/block-icon-404229410a4f9c063ffb7cb19ffc41ce.svg" alt="block"/>
                <p className={styles.text}>Chặn</p>
            </div>
        </div>
    )
}

export default Menu