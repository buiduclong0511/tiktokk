import { createStore } from 'redux'

import reducer from './reducer'

function storeConfig() {
    const store = createStore(reducer)

    return store
}

export default storeConfig