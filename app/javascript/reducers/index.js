import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import settingsReducer from "./settingsReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
    teams: teamsReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    settings: settingsReducer
})