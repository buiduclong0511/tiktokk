export function getCurrentUser(state) {
    return state.user.currentUser
}

export function isAuthenticated(state) {
    const currentUser = getCurrentUser(state)
    return !!currentUser
}