export default (state = null, action) => {
    switch(action.type) {
        case 'CREATE_ERRORS':
            return action.payload
        case 'CLEAR_ERRORS':
            return null
        default:
            return state
    }
}