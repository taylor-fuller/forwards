import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import teamsReducer from "./teamsReducer";

export default combineReducers({
    teams: teamsReducer,
    projects: projectsReducer
})