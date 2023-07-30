import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useEffect } from "react";

import Home from "./Component/Home";
import Login from "./Component/Pages/Login";
import SignUp from "./Component/Pages/SignUp";
import Todo from "./Component/Pages/Todo";
import DoneTodo from "./Component/DoneTodo/DoneTodo";
import NotDoneTodo from "./Component/NotDoneTodo/NotDoneTodo";
import ConfirmMail from "./Component/Pages/ConfirmMail/ConfirmMail";
import VerifyMail from "./Component/Pages/VerifyMail/VerifyMail";
import CreatProfile from "./Component/Pages/CreactProfile/CreatProfile";
import DashboardMain from "./Component/Dashboard/DashboardMain";
import ContentMain from "./Component/Dashboard/ContentMain/ContentMain";
import UserHome from "./Component/UserHome/UserHome";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import LoadingPage from "./Component/Common/LoadiingPage/LoadingPage";
import { ThemeContext } from "./Component/context/ThemeContext";

function App() {

  const { theme } = useContext(ThemeContext);

  console.log("apptheme", theme);



  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className={`App `} id={theme}> 
      <ToastContainer />
      <BrowserRouter>

        <LoadingPage/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route index path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="ConfirmMail/:email/:token" element={<ConfirmMail />} />
          <Route path="emailVerify/:id/:token" element={<VerifyMail />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route  path="resetPassword/:email" element={<ResetPassword/>}/>

          <Route path="dashboard" element={<DashboardMain />}>

            <Route index  element={<UserHome />} />
            <Route path="home" element={<UserHome />} />
            <Route path="CreatProfile" element={<CreatProfile />} />
            <Route path="todo" element={<Todo />} />
            <Route path="todo/doneTodo" element={<DoneTodo />} />
            <Route path="todo/notdonetodo" element={<NotDoneTodo />} />

           
          </Route>




          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
