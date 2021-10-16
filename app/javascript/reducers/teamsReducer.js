export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_TEAMS':
            return action.payload.teams
        case 'CREATE_TEAMS':
            return action.payload.teams
        default:
            return state
    }
}