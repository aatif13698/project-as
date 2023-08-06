import { combineReducers } from "redux";
import getUserData from "../getUserData";
import getUserTodo from "../getUserTodo";
import getDoneList from "../getDoneList";
import progress from "../progress";
import startLoading from "../StartLoading";
import getErrorPage from "../getErrorPage";
import getShopDetailsM from "../getShopDetailsM";
import getUserProfile from "../getUserProfile";
import getAllDoctorsProfile from "../getAllDoctorsProfile";
import getAllTeachersProfile from "../getAllTeachersProfile";
import getBatchesProfile from "../getBatchesProfile";
import getUpcommingBatchesProfile from "../getUpcommingBatchProfile";



const rootReducer = combineReducers({getUserData,getUserTodo, getDoneList, progress, startLoading, getErrorPage, getShopDetailsM, getUserProfile, getAllDoctorsProfile, getAllTeachersProfile, getBatchesProfile, getUpcommingBatchesProfile });

export default rootReducer;