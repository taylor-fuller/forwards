import axios from 'axios'

export const fetchTeams = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/teams')
    dispatch({ type: 'FETCH_TEAMS', payload: response.data })
}

export const createTeam = (name) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/teams', { name: name })
    .then( (data) => {
        dispatch(amendActiveWorkspace({workspace_id: data.data.id, workspace_name: data.data.name}))
        dispatch(fetchTeams())
    })
}

export const fetchProjects = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/projects')
    dispatch({ type: 'FETCH_PROJECTS', payload: response.data })
}

export const createProject = (name, description, team_id) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/projects', { 
        name: name,
        description: description,
        team_id: team_id
    })
    .then( () => {
        dispatch(fetchProjects())
    })
}

export const fetchSettings = () => async (dispatch) => {
    dispatch({ type: 'FETCH_SETTINGS' })
}

export const amendActiveWorkspace = (workspace) => async (dispatch) => {
    dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: '' })
    dispatch({ type: 'AMEND_ACTIVE_WORKSPACE', payload: workspace })
}

export const amendActiveSidebar = (sidebarOption) => async (dispatch) => {
    if (sidebarOption === 'Dashboard' || 'My Tasks') {
        dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: '' })
    }
    dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: sidebarOption })
}

export const amendActiveProject = (project_id, project_name) => async (dispatch) => {
    dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
}