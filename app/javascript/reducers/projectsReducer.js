export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_PROJECTS':
            return action.payload
        case 'CREATE_PROJECT':
            return action.payload
        default:
            return state
    }
}