export default (state = {activeWorkspace: '', activeSidebarOption: 'Dashboard', activeProject: '', activeTask: ''}, action) => {
    switch(action.type) {
        case 'FETCH_SETTINGS':
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
        case 'AMEND_ACTIVE_TASK':
            state = {...state, activeTask: action.payload}
            return state
        case 'RESET_SETTINGS':
            state = {...state, activeWorkspace: '', activeSidebarOption: 'Dashboard', activeProject: '', activeTask: ''}
            return state
        default:
            return state
    }
}