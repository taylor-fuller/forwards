export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_LED_TEAMS':
            return action.payload.teams_led
        default:
            return state
    }
}