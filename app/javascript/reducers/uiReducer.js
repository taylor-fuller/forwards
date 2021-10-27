export default (state = {activeWorkspace: '', activeSidebarOption: 'Dashboard', activeProject: '', activeTask: '', isModalOpen: false, modalOption: null, initialLoad: true}, action) => {
    switch(action.type) {
        case 'FETCH_UI':
            return {...state, initialLoad: false}
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
        case 'RESET_UI':
            state = {...state, activeWorkspace: '', activeSidebarOption: 'Dashboard', activeProject: '', activeTask: '', initialLoad: true}
            return state
        case 'TOGGLE_MODAL':
            state = {...state, isModalOpen: action.payload.isModalOpen, modalOption: action.payload.modalOption}
            return state
        default:
            return state
    }
}