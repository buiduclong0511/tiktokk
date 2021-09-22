import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import styles from './SuggestAccount.module.scss'
import AccountItem from './AccountItem'
import Loader from '~/packages/duclong-loader'

export default function SuggestAccount({ 
    accountsList = [], 
    onSeeToggle = () => {},
    onLoadMore,
    expandedTitle = 'Xem thêm',
    collapsedTitle = 'Thu gọn',
    isExpanded = false,
    isMinimize = true,
    hideSeeBtn = false,
    title = '',
    isLoading = true,
    onClickFollow,
    type
}) {
    const minimize = {
        height: 'calc(64px * 5)'
    }
    return (
        <div className={styles.wrapper}>
            <p className={styles.heading}>{title}</p>
            <div className={styles.listAccount} style={isMinimize ? minimize : {}}>
                {accountsList.map((account, index) => (
                    <AccountItem 
                        isLastItem={index === accountsList.length - 1 && isExpanded}
                        onLoadMore={onLoadMore}
                        key={account.id}
                        account={account}
                        onClickFollow={onClickFollow}
                        type={type}
                    />
                ))}
            </div>
            {isLoading ? <Loader /> : <></>}
            {!hideSeeBtn && (
                <div className={styles.viewAll} onClick={onSeeToggle}>
                    <span className={styles.body}>{!isMinimize ? collapsedTitle : expandedTitle}</span>
                    <FontAwesomeIcon icon={!isMinimize ? faChevronUp : faChevronDown} className={styles.icon} />
                </div>
            )}
        </div>
    )
}