import { Row, Column, Grid } from '@mycv/mycv-grid'

import styles from './Message.module.scss'
import ListFriend from './ListFriend'
import MessageContainer from './MessageContainer'

function Message({
    messageContent,
    onChangeMessageContent
}) {
    return (
        <div className={styles.wrapper}>
            <Grid maxWidth={1100}>
                <Row>
                    <Column sizeDesktop={4}>
                        <ListFriend />
                    </Column>
                    <Column sizeDesktop={8}>
                        <div className={styles.right}>
                            <MessageContainer 
                                messageContent={messageContent}
                                onChangeMessageContent={onChangeMessageContent}
                            />
                        </div>
                    </Column>
                </Row>
            </Grid>
        </div>
    )
}

export default Message