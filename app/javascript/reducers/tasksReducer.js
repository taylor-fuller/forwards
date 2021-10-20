export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_TASKS':
            return action.payload.tasks
        case 'CREATE_TASK':
            return action.payload.tasks
        default:
            return state
    }
}