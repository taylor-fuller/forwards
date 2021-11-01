export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_TEAMS':
            return action.payload
        case 'CREATE_TEAM':
            return action.payload
        default:
            return state
    }
}