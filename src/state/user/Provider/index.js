import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { actions } from '~/state/user'

function Provider() {
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => {
                dispatch(actions.setCurrentUser(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    }, [dispatch])

    return null
}

export default Provider
