import axios from 'axios'

export const fetchTeams = () => async (dispatch) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const response = await axios.get('http://localhost:3000/api/teams')
    dispatch({ type: 'FETCH_TEAMS', payload: response.data })
}

export const receiveTeams = () => async (dispatch) => {
    dispatch({ type: 'RECEIVE_TEAMS' })
}