import axios from 'axios'
import { batch } from 'react-redux'

export function fetchInitial() {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return dispatch(fetchProjects())
        })
        .then(() => {
            return dispatch(fetchTasks())
        })
        .then(() => {
            return dispatch(fetchUI())
        })
    }
}

export const fetchAll = () => async (dispatch) => {
    return batch(() => {
        dispatch(fetchTeams())
        dispatch(fetchProjects())
        dispatch(fetchTasks())
    })
}

export const fetchTeams = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/teams')
    return batch(() => {
        dispatch({ type: 'FETCH_TEAMS', payload: {all_teams: response.data.all_teams, others_teams: response.data.others_teams} })
        dispatch({ type: 'FETCH_LED_TEAMS', payload: response.data })
    })
}

export const createTeam = (name) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/teams', { name: name })
    .then( (data) => {
        return batch(() => {
            dispatch({ type: 'RESET_UI' })
            dispatch(amendActiveWorkspace({workspace_id: data.data.id, workspace_name: data.data.name}))
            dispatch(fetchAll())
        })
    })
}

export const fetchProjects = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/projects')
    return batch(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: {all_projects: response.data.all_projects, others_projects: response.data.others_projects} })
        dispatch({ type: 'FETCH_LED_PROJECTS', payload: response.data })
    })
}

export const createProject = (name, description, team_id) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/projects', { 
        name: name,
        description: description,
        team_id: team_id
    })
    .then( (data) => {
        return batch(() => {
            dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: data.data.id, project_name: data.data.name} })
            dispatch(fetchAll())
        })
    })
}

export const fetchUI = () => async (dispatch) => {
    dispatch({ type: 'FETCH_UI' })
}

export const amendActiveWorkspace = (workspace) => async (dispatch) => {
    return batch(() => {
        dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: '' })
        dispatch({ type: 'AMEND_ACTIVE_TASK', payload: '' })
        dispatch({ type: 'AMEND_ACTIVE_WORKSPACE', payload: workspace })
        dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: workspace.workspace_name })
    })
}

export const amendActiveSidebar = (sidebarOption) => async (dispatch) => {
    return batch(() => {
        if (sidebarOption === 'Dashboard' || 'My Tasks') {
            dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: '' })
        }
        dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: sidebarOption })
    })
}

export const amendActiveProject = (project_id, project_name, workspace) => async (dispatch) => {
    return batch(() => {
        dispatch({ type: 'AMEND_ACTIVE_WORKSPACE', payload: workspace })
        dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: workspace.workspace_name })
        dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
        dispatch({ type: 'AMEND_ACTIVE_TASK', payload: '' })
    })
}

export const resetUI = () => async (dispatch) => {
    dispatch({ type: 'RESET_UI' })
}

export const resetLoad = () => async (dispatch) => {
    dispatch({ type: 'RESET_LOAD' })
}

export const fetchTasks = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/tasks')
    dispatch({ type: 'FETCH_TASKS', payload: response.data })
}

export const createTask = (title, description, team_id, project_id, completed, due_date, assignee_id) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/tasks', { 
        title: title,
        description: description,
        team_id: team_id,
        project_id: project_id,
        completed: completed,
        due_date: due_date, 
        assignee_id: assignee_id
    })
    .then( (data) => {
        return batch(() => {
            dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: data.data.id, task_name: data.data.name} })
            dispatch(fetchAll())
        })
    })
}

export const amendActiveTask = (task_id, task_name, project_id, project_name, workspace) => async (dispatch) => {
    return batch(() => {
        dispatch({ type: 'AMEND_ACTIVE_WORKSPACE', payload: workspace })
        dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: workspace.workspace_name })
        dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
        dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
    })
}

export const toggleModal = (bool, option) => async (dispatch) => {
    return batch(() => {
        if (bool === false) {
            dispatch({ type: 'TOGGLE_MODAL', payload: {isModalOpen: false, modalOption: null} })
        } else {
            dispatch({ type: 'TOGGLE_MODAL', payload: {isModalOpen: true, modalOption: option} })
        }
    })
}

export const patchProject = (project) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/projects/${data.id}`, { 
        data: project
    })
    .then( () => {
        dispatch(fetchAll())
    })
}

export const patchTask = (task) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/tasks/${data.id}`, { 
        data: task
    })
    .then( () => {
        dispatch(fetchAll())
    })
}

export const toggleTaskComplete = (task_id, bool) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/tasks/${task_id}`, { 
        completed: bool
    })
    .then( () => {
        dispatch(fetchAll())
    })
}

export const addUserToTeam = (user_id, team_id) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/add_user_to_team', { 
        id: team_id,
        user_id: user_id
    })
    .then( () => {
        dispatch(fetchAll())
    })
}