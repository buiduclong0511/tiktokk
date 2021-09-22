
import styles from './MessageItem.module.scss'
import Avatar from '~/components/Avatar'

function MessageItem({ 
    message = {},
    sender = 'me' 
}) {
    if (sender === 'me') {
        return (
            <div className={styles.wrapperMe}>
                <img className={styles.warning} src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/fail-df8ff72a51798fa217a3b078c0bf5bf9.svg" alt="warning"/>
                <p className={styles.content}>{message.content}</p>
                <Avatar 
                    src={message.avatar} 
                    dimension={32} 
                    alt="avatar"
                />
            </div>
        )
    }
    return (
        <div className={styles.wrapperYou}>
            <Avatar 
                src={message.avatar} 
                dimension={32} 
                alt="avatar"
            />
            <p className={styles.content}>{message.content}</p>
            {/* <img className={styles.warning} src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/fail-df8ff72a51798fa217a3b078c0bf5bf9.svg" alt="warning"/> */}
        </div>
    )
}

export default MessageItem