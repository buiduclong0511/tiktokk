import SearchItem from './SearchItem'
import styles from './AllSearchResults.module.scss'

export default function AllSearchResults({ searchResults = [] }) {
    return (
        <div className={styles.wrapper}>
            {searchResults.map(account => <SearchItem 
                key={account.id}
                avatar={account.avatar}
                nickname={account.nickname}
                shortName={account.shortName}
                name={account.name}
                followersCount={account.followers_count}
                tick={account.tick}
            />)}
        </div>
    )
}