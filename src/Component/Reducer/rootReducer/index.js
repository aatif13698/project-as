import { combineReducers } from "redux";
import getUserData from "../getUserData";
import getUserTodo from "../getUserTodo";
import getDoneList from "../getDoneList";
import progress from "../progress";




const rootReducer = combineReducers({getUserData,getUserTodo, getDoneList, progress});

export default rootReducer;