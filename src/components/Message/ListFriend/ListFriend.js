import styles from './ListFriend.module.scss'
import avatar from '~/assets/img/avata.jpeg'
import FriendItem from './FriendItem'


function ListFriend({
    data = [
        {
            id: 0,
            avatar: avatar,
            name: 'name',
            lastMessage: 'tin nhắn',
            time: '7:00 PM'
        },
        {
            id: 1,
            avatar: avatar,
            name: 'name',
            lastMessage: 'quá nhiều từ để hiển thị',
            time: '7:00 PM'
        }
    ]
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h3>Tin nhắn</h3>
                <img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/setting-icon-a9c23d78ffb500df10b32dbcc6aa9b5e.svg" alt="setting"/>
            </div>
            <div className={styles.listFriend}>
                {data.map(item => (
                    <FriendItem 
                        key={item.id}
                        avatar={item.avatar}
                        lastMessage={item.lastMessage}
                        name={item.name}
                        time={item.time}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListFriend