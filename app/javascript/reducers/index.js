import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import uiReducer from "./uiReducer";
import tasksReducer from "./tasksReducer";
import teamsLedReducer from "./teamsLedReducer";

export default combineReducers({
    teams: teamsReducer,
    teams_led: teamsLedReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    UI: uiReducer,
})