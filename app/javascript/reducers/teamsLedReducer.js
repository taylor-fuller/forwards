export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_LED_TEAMS':
            console.log(action.payload)
            return action.payload.teams_led
        default:
            return state
    }
}