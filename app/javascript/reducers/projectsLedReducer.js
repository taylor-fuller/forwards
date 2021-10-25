export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_LED_PROJECTS':
            return action.payload.projects_led
        default:
            return state
    }
}