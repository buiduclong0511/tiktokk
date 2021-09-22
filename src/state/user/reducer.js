import { SET_CURRENT_USER } from './constants'

import Account from '~/containers/entities/Account'

const init = {
    currentUser: null
}

function reducer(state = init, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            const currentUser = action.payload
            return {
                ...state,
                currentUser: Account.create(currentUser)
            }
        default:
            return state
    }
}

export default reducer