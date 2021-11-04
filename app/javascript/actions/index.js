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

    try {
        const response = await axios.get('http://localhost:3000/api/teams')
        return batch(() => {
            dispatch({ type: 'FETCH_TEAMS', payload: {all_teams: response.data.all_teams, others_teams: response.data.others_teams} })
            dispatch({ type: 'FETCH_LED_TEAMS', payload: response.data })
        })
    }
    catch {
        throw new Error('API is unresponsive')
    }
}

export const createTeam = (name) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('http://localhost:3000/api/teams', { name: name })
    .then((data) => {
        dispatch(toggleModal(false, null))
        dispatch({ type: 'SET_IS_LOADING' })
        dispatch(handleTeamCreation(data.data.id, data.data.name))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
    })
}

export const fetchProjects = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    try {
        const response = await axios.get('http://localhost:3000/api/projects')
        return batch(() => {
            dispatch({ type: 'FETCH_PROJECTS', payload: {all_projects: response.data.all_projects, others_projects: response.data.others_projects} })
            dispatch({ type: 'FETCH_LED_PROJECTS', payload: response.data })
        })
    }
    catch {
        throw new Error('API is unresponsive')
    }
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
        dispatch(toggleModal(false, null))
        dispatch({ type: 'SET_IS_LOADING' })
        dispatch(handleProjectCreation(data.data.id, data.data.name))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
    })
}

export const fetchUI = () => async (dispatch) => {
    dispatch({ type: 'FETCH_UI' })
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' })
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

    try {
        const response = await axios.get('http://localhost:3000/api/tasks')
        dispatch({ type: 'FETCH_TASKS', payload: response.data })
    }
    catch {
        throw new Error('API is unresponsive')
    }
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
    .then((data) => {
        dispatch(handleTaskCreation(data.data.id, data.data.name))
        dispatch(toggleModal(false, null))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
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

export const patchTeam = (team) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/teams/${team.id}`, { 
        name: team.name,
        lead_id: team.lead_id,
    })
    .then(() => {
        dispatch({ type: 'SET_IS_LOADING' })
        dispatch(handleTeamPatch(team.id, team.name))
        dispatch(toggleModal(false, null))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
    })
}

export const patchProject = (project) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/projects/${project.id}`, { 
        name: project.name,
        description: project.description,
        lead_id: project.lead_id,
        team_id: project.team_id,
    })
    .then((data) => {
        dispatch({ type: 'SET_IS_LOADING' })
        dispatch(handleProjectPatch(project.id, project.name))
        dispatch(toggleModal(false, null))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
    })
}

export const patchTask = (task) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/tasks/${task.id}`, { 
        title: task.title,
        description: task.description,
        due_date: task.due_date, 
        assignee_id: task.assignee_id
    })
    .then((data) => {
        dispatch({ type: 'SET_IS_LOADING' })
        dispatch(handleTaskPatch(task.id, task.name))
        dispatch(toggleModal(false, null))
    })
    .catch((error) => {
        if (error.response.data) {
            dispatch({type: 'CREATE_ERRORS', payload: error.response.data})
        }
    })
}

export const toggleTaskComplete = (task_id, bool) => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.patch(`http://localhost:3000/api/tasks/${task_id}`, { 
        completed: bool
    })
    .then(() => {
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
    .then(() => {
        dispatch(fetchAll())
        dispatch(toggleModal(false, null))
    })
}

export function handleTeamCreation(team_id, team_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch({ type: 'UNSET_IS_LOADING' })
                dispatch({ type: 'RESET_UI' })
                dispatch(amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name}))
            })
        })
        .catch(() => {
            return batch(() => {
                dispatch({ type: 'UNSET_IS_LOADING' })
                dispatch({ type: 'RESET_UI' })
                dispatch(amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name}))
                throw new Error('Something went wrong')
            })
        })
    }
}

export function handleProjectCreation(project_id, project_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch(fetchProjects())
                dispatch({ type: 'UNSET_IS_LOADING' })
                dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
                throw new Error('Something went wrong')
            })
        })
        .catch(() => {
            return batch(() => {
                dispatch({ type: 'UNSET_IS_LOADING' })
                dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: {project_id: project_id, project_name: project_name} })
                throw new Error('Something went wrong')
            })
        })
    }
}

export function handleTaskCreation(task_id, task_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch(fetchProjects())
                dispatch(fetchTasks())
                dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
            })
        })
        .catch(() => {
            dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
            dispatch({ type: 'UNSET_IS_LOADING' })
            throw new Error('Something went wrong')
        })
    }
}

export function handleTeamPatch(team_id, team_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch(amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name}))
                dispatch({ type: 'UNSET_IS_LOADING' })
            })
        })
        .catch(() => {
            return batch(() => {
                dispatch(amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name}))
                dispatch({ type: 'UNSET_IS_LOADING' })
                throw new Error('Something went wrong')
            })
        })
    }
}

export function handleProjectPatch(project_id, project_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch(fetchProjects())
                dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: { project_id: project_id, project_name: project_name }})
                dispatch({ type: 'UNSET_IS_LOADING' })
            })
        })
        .catch(() => {
            return batch(() => {
                dispatch({ type: 'AMEND_ACTIVE_PROJECT', payload: { project_id: project_id, project_name: project_name }})
                dispatch({ type: 'UNSET_IS_LOADING' })
                throw new Error('Something went wrong')
            })
        })
    }
}

export function handleTaskPatch(task_id, task_name) {
    return (dispatch) => {
        return dispatch(fetchTeams())
        .then(() => {
            return batch(() => {
                dispatch(fetchProjects())
                dispatch(fetchTasks())
                dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
                dispatch({ type: 'UNSET_IS_LOADING' })
            })
        })
        .catch(() => {
            return batch(() => {
                dispatch({ type: 'AMEND_ACTIVE_TASK', payload: {task_id: task_id, task_name: task_name} })
                dispatch({ type: 'UNSET_IS_LOADING' })
                throw new Error('Something went wrong')
            })
        })
    }
} 