import styles from './MessageContainer.module.scss'
import avatar from '~/assets/img/avata.jpeg'
import Avatar from '~/components/Avatar'
import Tooltip from '~/components/Tooltip'
import MessageItem from './MessageItem'

function MessageContainer({
    messageContent = '',
    onChangeMessageContent = () => {},
    messages = [
        {
            avatar: avatar,
            content: 'tin nhắn'
        },
        {
            avatar: avatar,
            content: 'tin nhắn'
        }
    ]
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <Avatar src={avatar} />
                <div className={styles.body}>
                    <h3 className={styles.name}>name</h3>
                    <p className={styles.nickname}>nickname</p>
                </div>
            </div>
            <p className={styles.warning}>Chỉ bạn bè có thể gửi tin nhắn cho nhau</p>
            <div className={styles.messageBox}>
                {messages.map(message => (
                    <MessageItem 
                        message={message}
                        sender={'me'}
                    />
                ))}
                {messages.map(message => (
                    <MessageItem 
                        message={message}
                        sender={'you'}
                    />
                ))}
            </div>
            <div className={styles.typeMessage}>
                <div className={styles.inputWrapper}>
                    <input onChange={onChangeMessageContent} type="text" placeholder="Gửi tin nhắn..." value={messageContent} />
                    <Tooltip content="Nhấp để thêm emoji">
                        <button className={styles.emoji}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNCA2QzE0LjA1ODkgNiA2IDE0LjA1ODkgNiAyNEM2IDMzLjk0MTEgMTQuMDU4OSA0MiAyNCA0MkMzMy45NDExIDQyIDQyIDMzLjk0MTEgNDIgMjRDNDIgMTQuMDU4OSAzMy45NDExIDYgMjQgNlpNMiAyNEMyIDExLjg0OTcgMTEuODQ5NyAyIDI0IDJDMzYuMTUwMyAyIDQ2IDExLjg0OTcgNDYgMjRDNDYgMzYuMTUwMyAzNi4xNTAzIDQ2IDI0IDQ2QzExLjg0OTcgNDYgMiAzNi4xNTAzIDIgMjRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3IDIzQzE4LjY1NjkgMjMgMjAgMjEuMjA5MSAyMCAxOUMyMCAxNi43OTA5IDE4LjY1NjkgMTUgMTcgMTVDMTUuMzQzMSAxNSAxNCAxNi43OTA5IDE0IDE5QzE0IDIxLjIwOTEgMTUuMzQzMSAyMyAxNyAyM1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzEgMjNDMzIuNjU2OSAyMyAzNCAyMS4yMDkxIDM0IDE5QzM0IDE2Ljc5MDkgMzIuNjU2OSAxNSAzMSAxNUMyOS4zNDMxIDE1IDI4IDE2Ljc5MDkgMjggMTlDMjggMjEuMjA5MSAyOS4zNDMxIDIzIDMxIDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAyOC4zNDMxQzE2IDMxLjQ2NzMgMTkuNTgxNyAzNiAyNCAzNkMyOC40MTgzIDM2IDMyIDMxLjQ2NzMgMzIgMjguMzQzMUMzMiAyNS4yMTkgMTYgMjUuMjE5IDE2IDI4LjM0MzFaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" alt="emoji"/>
                        </button>
                    </Tooltip>
                </div>
                {messageContent ? (
                    <button className={styles.sendBtn}>
                        <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/send-746a8f86471316f51439701abc5d8750.svg" alt="senBtn"/>
                    </button>
                ) : <></>}
            </div>
        </div>
    )
}

export default MessageContainer