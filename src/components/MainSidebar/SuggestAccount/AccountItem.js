import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { Waypoint } from 'react-waypoint'

import styles from './SuggestAccount.module.scss'
import config from '~/config'
import Tick from '~/components/Tick'
import Avatar from '~/components/Avatar'
import PreviewAccount from '~/components/PreviewAccount'

export default function AccountItem({
    account = {},
    onLoadMore = () => {},
    isLastItem = false,
    onClickFollow,
    type = 'suggested-account'
}) {
    if (type === 'suggested-account') {
        return (
            <Waypoint
                onEnter={isLastItem ? onLoadMore : () => {}}
                bottomOffset={300}
            >
                <div>
                    <Tippy
                        placement="bottom"
                        interactive
                        offset={[0, -10]}
                        delay={[600, 300]}
                        appendTo={() => document.body}
                        render={() => <PreviewAccount account={account} onClickFollow={onClickFollow} />}
                    >
                        <Link to={`${config.routes.home}@${account.nickname}`} className={styles.accountWrapper}>
                            <Avatar 
                                src={account.avatar}
                                alt={account.nickname}
                                shortName={account.shortName}
                            />
                            <div className={styles.body}>
                                <h3 className={styles.nickname}>
                                    <span className={styles.nicknameBody}>{account.nickname}</span>
                                    {account.tick ? <Tick /> : <></>}
                                </h3>
                                <p className={styles.name}>{account.name}</p>
                            </div>
                        </Link>
                    </Tippy>
                </div>
            </Waypoint>
        )
    }
    return (
        <Waypoint
            onEnter={isLastItem ? onLoadMore : () => {}}
            bottomOffset={300}
        >
            <div>
                <Link to={`${config.routes.home}@${account.nickname}`} className={styles.accountWrapper}>
                    <Avatar 
                        src={account.avatar}
                        alt={account.nickname}
                        shortName={account.shortName}
                    />
                    <div className={styles.body}>
                        <h3 className={styles.nickname}>
                            <span className={styles.nicknameBody}>{account.nickname}</span>
                            {account.tick ? <Tick /> : <></>}
                        </h3>
                        <p className={styles.name}>{account.name}</p>
                    </div>
                </Link>
            </div>
        </Waypoint>
    )
}