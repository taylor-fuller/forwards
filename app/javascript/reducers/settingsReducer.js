export default (state = {activeWorkspace: '', activeSidebarOption: 'Dashboard', activeProject: '', activeTask: 'Task'}, action) => {
    switch(action.type) {
        case 'FETCH_SETTINGS':
            if (state.activeWorkspace === '') {
                state = {...state, activeSidebarOption: 'My Tasks'}
            }
            return state
        case 'AMEND_ACTIVE_WORKSPACE':
            state = {...state, activeWorkspace: action.payload}
            return state
        case 'AMEND_ACTIVE_SIDEBAR':
            state = {...state, activeSidebarOption: action.payload}
            return state
        case 'AMEND_ACTIVE_PROJECT':
            state = {...state, activeProject: action.payload}
            return state
        default:
            return state
    }
}