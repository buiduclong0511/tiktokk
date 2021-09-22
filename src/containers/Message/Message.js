import { useState } from 'react'

import MessageComponent from '~/components/Message'

function Message() {
    const [messageContent, setMessageContent] = useState('')
    const handleChangeMessageContent = e => {
        setMessageContent(e.target.value)
    }

    return (
        <MessageComponent
            messageContent={messageContent}
            onChangeMessageContent={handleChangeMessageContent}
        />
    )
}

export default Message