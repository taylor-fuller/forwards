import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import uiReducer from "./uiReducer";
import tasksReducer from "./tasksReducer";
import teamsLedReducer from "./teamsLedReducer";
import projectsLedReducer from "./projectsLedReducer";

export default combineReducers({
    teams: teamsReducer,
    teams_led: teamsLedReducer,
    projects: projectsReducer,
    projects_led: projectsLedReducer,
    tasks: tasksReducer,
    UI: uiReducer,
})