import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar/Sidebar";
import "./DashboardMain.css";
import Content from "./layout/Content/Content";
import { SidebarProvider } from "../context/sidebarContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useNavigate } from "react-router-dom";


const DashboardMain = ({ children }) => {

  const [activeLink, setActiveLink] = useState(1);
  const navigate = useNavigate()

  const STORE = useSelector((state) => state);
  const err = useSelector((state) => state.getErrorPage.Err);
  const dispatch = useDispatch()

  const token = localStorage.getItem("token");
  
  console.log("tokne", token);
  console.log("errrr", err);

  console.log("pageERR", STORE.getErrorPage.Err);




  console.log("DashErr", STORE );

  useEffect(()=>{
    if(token == null){
      dispatch({ type : "GOT_ERROR"})
    }else{
      dispatch({ type : "NO_ERROR"})
    }
  },[])


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
