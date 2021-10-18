import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
    teams: teamsReducer,
    projects: projectsReducer,
    settings: settingsReducer
})