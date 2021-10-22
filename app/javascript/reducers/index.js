import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import uiReducer from "./uiReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
    teams: teamsReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    UI: uiReducer,
})