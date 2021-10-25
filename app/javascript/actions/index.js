import axios from 'axios'
import { batch } from 'react-redux'

export const fetchTeams = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/teams')
    return batch(() => {
        dispatch({ type: 'FETCH_TEAMS', payload: response.data })
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
            dispatch(fetchTeams())
        })
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
    .then( (data) => {
        return batch(() => {
            dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: data.data.id })
            dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: data.data.id, project_name: data.data.name} })
            dispatch(fetchTeams())
            dispatch(fetchProjects())
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

export const amendActiveProject = (project_id, project_name) => async (dispatch) => {
    dispatch({ type: 'AMEND_ACTIVE_TASK', payload: '' })
    dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: project_name })
    dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
}

export const resetUI = () => async (dispatch) => {
    dispatch({ type: 'RESET_UI' })
}

export const fetchTasks = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/tasks')
    dispatch({ type: 'FETCH_TASKS', payload: response.data })
}

export const createTask = (title, description, team_id, project_id, completed, due_date, assignee_id, parent_task_id) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/tasks', { 
        title: title,
        description: description,
        team_id: team_id,
        project_id: project_id,
        completed: completed,
        due_date: due_date, 
        assignee_id: assignee_id,
        parent_task_id: parent_task_id
    })
    .then( (data) => {
        return batch(() => {
            dispatch(fetchProjects())
            dispatch(fetchTasks())
        })
    })
}

export const amendActiveTask = (task_id, task_name, project_id, project_name) => async (dispatch) => {
    dispatch({ type: 'AMEND_ACTIVE_SIDEBAR', payload: project_name })
    dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
    dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
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