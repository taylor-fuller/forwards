export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_PROJECTS':
            return action.payload.projects
        case 'CREATE_PROJECT':
            return action.payload.projects
        default:
            return state
    }
}