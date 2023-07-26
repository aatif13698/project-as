import React, { createContext, useState } from "react";
import Sidebar from "./layout/Sidebar/Sidebar";
import "./DashboardMain.css";
import Content from "./layout/Content/Content";
import { SidebarProvider } from "../context/sidebarContext";
import { Provider } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";


const DashboardMain = ({ children }) => {

  const [activeLink, setActiveLink] = useState(1);

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
