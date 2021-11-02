import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import uiReducer from "./uiReducer";
import tasksReducer from "./tasksReducer";
import teamsLedReducer from "./teamsLedReducer";
import projectsLedReducer from "./projectsLedReducer";
import _ from 'lodash'

export default combineReducers({
    teams: teamsReducer,
    teams_led: teamsLedReducer,
    projects: projectsReducer,
    projects_led: projectsLedReducer,
    tasks: tasksReducer,
    UI: uiReducer,
})

export const selectTeam = (teams, team_id) => {
    const Team = teams.find((team) => team.id === team_id)
    return Team
}