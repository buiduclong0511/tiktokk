import styles from './CommentItem.module.scss'

function Menu({title = 'Báo cáo', onClickBtn = () => {}}) {
    return (
        <div className={styles.menuWrapper}>
            <button>{title}</button>
        </div>
    )
}

export default Menu