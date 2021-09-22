import { Row, Column } from '@mycv/mycv-grid'
import { Waypoint } from 'react-waypoint'

import styles from './SuggestedUsers.module.scss'
import SuggestedUserItem from '../SuggestedUserItem'
import Loader from '~/packages/duclong-loader'

export default function SuggestedUsers({ 
    suggestedUsers = [],
    getVideoRefs,
    getVideoId = () => {},
    isLoading = true,
    onEnter = () => {},
    onShowLoginModal
}) {
    return (
        <div className={styles.wrapper}>
            <Row>
                {suggestedUsers.map((user, index) => {
                    if (index === suggestedUsers.length - 1) {
                        return (
                            <Column
                                key={user.id}
                                size={4}
                                sizeDesktop={4}
                                sizeTablet={4}
                            >
                                <Waypoint
                                    onEnter={onEnter}
                                    bottomOffset={305}
                                >
                                    <div>
                                        <SuggestedUserItem 
                                            user={user}
                                            getVideoRefs={video => getVideoRefs(user.id, video)}
                                            getVideoId={() => getVideoId(user.id)}
                                            onShowLoginModal={onShowLoginModal}
                                        />
                                    </div>
                                </Waypoint>
                            </Column>
                        )
                    }
                    return (
                        <Column
                            key={user.id}
                            size={4}
                            sizeDesktop={4}
                            sizeTablet={4}
                        >
                            <SuggestedUserItem 
                                user={user}
                                getVideoRefs={video => getVideoRefs(user.id, video)}
                                getVideoId={() => getVideoId(user.id)}
                                onShowLoginModal={onShowLoginModal}
                            />
                        </Column>
                    )
                })}
            </Row>
            {isLoading ? <Loader /> : <></>}
        </div>
    )
}