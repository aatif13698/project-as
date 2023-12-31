import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aos from "aos";
// import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
import Private from "./Component/Common/Private";
import CreactProfileForMedical from "./Component/CreactProfileForMedical/CreactProfileForMedical";
import Public from "./Component/Common/Public";
import CreatShopDetailsMedical from "./Component/CreateShopDetailsMedical/CreatShopDetailsMedical";
import CreateInstituteDetail from "./Component/CreatInstituteDetail/CreateInstituteDetail";
import AddDoctor from "./Component/AddDoctor/AddDoctor";
import AddTeacher from "./Component/AddTeacher/AddTeacher";
import AddBatches from "./Component/AddBatches/AddBatches";
import AddUpcommingBatch from "./Component/AddUpcommingBatch/AddUpcommingBatch";
import UpcommingEvents from "./Component/UpcommingEvents/UpcommingEvents";
import Democard from "./Component/DemoCard/Democard";
import DisCountMedicine from "./Component/DisCountMedicine/DisCountMedicine";
import HomeMedical from "./Component/HomeMedical/HomeMedical";
import HomeInstitute from "./Component/HomeInstitute/HomeInstitute";
import HomeShop from "./Component/HomeShop/HomeShop";
import DemoSitePharmacy from "./Component/DemoSitePharmacy/DemoSitePharmacy";
import Landing from "./Component/Pages/Landing/Landing";

function App() {
  const { theme } = useContext(ThemeContext);

  console.log("apptheme", theme);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {}, []);

  // testing

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`App `} id={theme}>
        <ToastContainer />
        <BrowserRouter>
          <LoadingPage />

          <Routes>
            <Route element={<Public />}>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Landing />} />
              <Route index path="login" element={<Login />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="ConfirmMail/:email" element={<ConfirmMail />} />
              <Route path="emailVerify/:id/:OTP" element={<VerifyMail />} />
              <Route path="forgetPassword" element={<ForgetPassword />} />
              <Route path="resetPassword/:email" element={<ResetPassword />} />
            </Route>

            <Route element={<Private />}>
              <Route path="dashboard" element={<DashboardMain />}>
                <Route index element={<UserHome />} />
                <Route path="home" element={<UserHome />} />
                <Route path="todo" element={<Todo />} />
                <Route path="todo/doneTodo" element={<DoneTodo />} />
                <Route path="todo/notdonetodo" element={<NotDoneTodo />} />
                <Route
                  path="CreatProfile"
                  element={<CreactProfileForMedical />}
                />

                {/* Medical */}
                <Route
                  path="CreatMedicalShop"
                  element={<CreatShopDetailsMedical />}
                />
                <Route path="addDoctor" element={<AddDoctor />} />
                <Route path="democard" element={<Democard />} />
                <Route path="demoSitePharmacy" element={<DemoSitePharmacy />} />
                <Route
                  path="discountOnMedicine"
                  element={<DisCountMedicine />}
                />
                <Route path="homeMedical" element={<HomeMedical />} />

                {/* Institute */}

                <Route path="homeInstitute" element={<HomeInstitute />} />
                <Route
                  path="CreatInstituteDetail"
                  element={<CreateInstituteDetail />}
                />
                <Route path="addTeacher" element={<AddTeacher />} />
                <Route path="addBatches" element={<AddBatches />} />
                <Route
                  path="addUpcommingBatch"
                  element={<AddUpcommingBatch />}
                />
                {/* <Route path="addUpcommingEvents" element={<UpcommingEvents />} /> */}

                {/* Shop */}
                <Route path="homeShop" element={<HomeShop />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
