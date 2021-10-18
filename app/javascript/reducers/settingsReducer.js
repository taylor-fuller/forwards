export default (state = {activeWorkspace: {'': null}, activeSidebarOption: 'dashboard'}, action) => {
    switch(action.type) {
        case 'FETCH_SETTINGS':
            return state
        case 'AMEND_ACTIVE_WORKSPACE':
            state = {...state, activeWorkspace: action.payload}
            return state
        case 'AMEND_ACTIVE_SIDEBAR':
            state = {...state, activeSidebarOption: action.payload}
            return state
        default:
            return state
    }
}