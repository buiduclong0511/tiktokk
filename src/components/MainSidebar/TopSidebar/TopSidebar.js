import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectors as userSelectors } from '~/state/user'

import styles from './TopSidebar.module.scss'
import config from '~/config'
import Button from '~/packages/duclong-button'

export default function TopSidebar({ 
    onLogin = () => {}
}) {
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)
    
    return (
        <div className={styles.wrapper}>
            <NavLink exact to={config.routes.home} className={styles.nav} activeClassName={styles.active}>
                <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
                <span>Dành cho bạn</span>
            </NavLink>
            <NavLink to={config.routes.following} className={styles.nav} activeClassName={styles.active}>
                <FontAwesomeIcon icon={faUsers} className={styles.navIcon} />
                <span>Đang Follow</span>
            </NavLink>
            
            {isAuthenticated ? <></> : (
                <>
                    <p>Đăng nhập để follow các tác giả, thích video và xem bình luận.</p>

                    <Button title="Đăng nhập" size="l" type="border" onClick={onLogin} />
                </>
            )}
        </div>
    )
}