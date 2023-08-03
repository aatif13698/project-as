import { combineReducers } from "redux";
import getUserData from "../getUserData";
import getUserTodo from "../getUserTodo";
import getDoneList from "../getDoneList";
import progress from "../progress";
import startLoading from "../StartLoading";
import getErrorPage from "../getErrorPage";
import getShopDetailsM from "../getShopDetailsM";
import getUserProfile from "../getUserProfile";



const rootReducer = combineReducers({getUserData,getUserTodo, getDoneList, progress, startLoading, getErrorPage, getShopDetailsM, getUserProfile});

export default rootReducer;