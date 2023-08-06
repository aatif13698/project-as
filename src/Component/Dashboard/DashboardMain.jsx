import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar/Sidebar";
import "./DashboardMain.css";
import Content from "./layout/Content/Content";
import { SidebarProvider } from "../context/sidebarContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useNavigate } from "react-router-dom";
import { getAllBatchesOfParticularInstitute, getAllDoctosOfParticularMedical, getAllTeachersOfParticularInstitute, getAllUpcommingBatchesOfParticularInstitute, getInstituteProfile, getProfileData, getShopProfile, getUser, verifyByToken } from "../ApiCalling/api";
import { getBatchList, getDoctorList, getShopData, getTeacherList, getUpcommingBatchList, getUserData, getUserProfile } from "../Action";
import { toast } from "react-toastify";


const DashboardMain = ({ children }) => {

  const [activeLink, setActiveLink] = useState(1);
  const navigate = useNavigate()

  const STORE = useSelector((state) => state);
  // const err = useSelector((state) => state.getErrorPage.Err);
  const dispatch = useDispatch()

  const token = localStorage.getItem("token");

  const user = useSelector((state)=> state?.getUserData?.userData?.user);


  // console.log("userDash", user);
  
  // console.log("tokne", token);
  // console.log("errrr", err);
  // console.log("pageERR", STORE.getErrorPage.Err);
  // console.log("DashErr", STORE );
  console.log("StoreDash", STORE);

  useEffect(()=>{

    if(token == null){
      dispatch({ type : "GOT_ERROR"})
    }else if(token){

      const data = {token : token}

      verifyByToken(data, verifyByTokenCallback)

    }
    
    else{
    //   dispatch({ type : "NO_ERROR"})
    //   getUser(getData);
    //   getInstituteProfile(getInstituteProfileCallBack);
    //   getShopProfile( getShopProfileCallBack )
    //   getProfileData(getProfileCallBack)
    //   getAllDoctosOfParticularMedical(getAllDoctorsCallback);
    //   getAllTeachersOfParticularInstitute(getAllTeachersCallback);
    //   getAllBatchesOfParticularInstitute(getAllBatchesCallback);
    // getAllUpcommingBatchesOfParticularInstitute(getAllUpcommingBatchesCallback);


      
    }
  },[])

  function verifyByTokenCallback(errorCode, message){

    if(errorCode == 200){
      toast.success(message);
      dispatch({ type : "NO_ERROR"})
      getUser(getData);
      getInstituteProfile(getInstituteProfileCallBack);
      getShopProfile( getShopProfileCallBack )
      getProfileData(getProfileCallBack)
      getAllDoctosOfParticularMedical(getAllDoctorsCallback);
      getAllTeachersOfParticularInstitute(getAllTeachersCallback);
      getAllBatchesOfParticularInstitute(getAllBatchesCallback);
    getAllUpcommingBatchesOfParticularInstitute(getAllUpcommingBatchesCallback);

      
    }else if(errorCode == 404 || errorCode == 401){


      toast.warning(message)

      localStorage.clear("token");

      navigate('/login')
      // dispatch({ type : "GOT_ERROR"})

    }

  }

  
  function getData(data) {
    dispatch(getUserData(data));
  }
  


  function  getProfileCallBack(data) {

    dispatch(getUserProfile(data))    
    
  }


  function getAllDoctorsCallback(data) {
    
    dispatch(getDoctorList(data))
  }


  function getAllTeachersCallback(data) {
  
    dispatch(getTeacherList(data));
  }


  function getAllBatchesCallback(data) {
  
    dispatch(getBatchList(data));
  }

  function getAllUpcommingBatchesCallback(data) {
    dispatch(getUpcommingBatchList(data));
  }



  // useEffect(()=>{
  //   if(user?.userType == "instituteOwner"){


  //     console.log("222");
  //     getInstituteProfile(getInstituteProfileCallBack);

  //   }else if(user?.userType == "medicalOwner"){

  //     getShopProfile( getShopProfileCallBack )

  //   }

  // },[user])


  function getInstituteProfileCallBack(data) {
    dispatch(getShopData(data));
  }



  function getShopProfileCallBack(data){

    dispatch(getShopData(data))

  }

  useEffect(()=>{
    if (STORE.getErrorPage.Err == true) {
      navigate('/login')
    }

  },[STORE])

  return (
    <SidebarProvider>
      <activeLinkContext.Provider value={{activeLink, setActiveLink }}>
      <div className="app">
        <Sidebar />

        <Content children={children} />
      </div>

      </activeLinkContext.Provider>
      
    </SidebarProvider>
  );
};

export default DashboardMain;
