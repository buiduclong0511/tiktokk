import { Link } from 'react-router-dom'

import SearchResultItem from '../SearchResultItem'
import styles from './SearchResult.module.scss'
import config from '~/config'

export default function SearchResult({ 
    data = [],
    searchKey = '',
    showProfile,
    clearText
}) {
    return (
        <div className={styles.wrapper}>
            {data.map(account => {
                return <SearchResultItem
                            key={account.id}
                            nickname={account.nickname}
                            name={account.name}
                            tick={account.tick}
                            showProfile={showProfile}
                            clearText={clearText}
                        />
            })}
            <Link to={`${config.routes.allSearchResults}?q=${searchKey}`} onClick={clearText} className={styles.showAllResult}>{`Xem tất cả kết quả dành cho '${searchKey}'`}</Link>
        </div>
    )
}