export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_TEAMS':
            return action.payload
        case 'RECIEVE_TEAMS':
            return state
        default:
            return state
    }
}