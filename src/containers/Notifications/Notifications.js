import { useState } from 'react'

import NotificationsComponent from '~/components/Notifications'

function Notifications() {
    const [indexActived, setIndexActived] = useState(0)

    const handleClickTag = tagIndex => {
        setIndexActived(tagIndex)
    }

    // console.log(indexActived)

    return (
        <NotificationsComponent 
            indexActived={indexActived}
            onClickTag={handleClickTag}
        />
    )
}

export default Notifications