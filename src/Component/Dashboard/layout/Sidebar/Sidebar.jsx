import { useEffect, useRef, useState } from "react";
import { personsImgs } from "../../../../utils/images";
import { navigationLinksForInstitute } from "../../../data/data";
import {dataObj} from '../../../data/data'
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../../context/sidebarContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../ApiCalling/api";
import { deleteShopData, deleteUserProfile, getUserData } from "../../../Action";
import activeLinkContext from "../../../context/activeLinkContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  // const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarList, setSidebarList] = useState([])
  const { isSidebarOpen } = useContext(SidebarContext);

  const [display, setDisplay] = useState("none");

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { activeLink, setActiveLink } = useContext(activeLinkContext);
 const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.getUserData?.userData?.user);
  const profileImage = useSelector((state) => state?.getUserData?.userData?.user?.pdf);

  const userType = useSelector((state) => state?.getUserData?.userData?.user?.userType);


  // console.log("dataObj", dataObj);

  // console.log("sidebarUser", user);

  

  useEffect(()=>{

    if( userType == "medicalOwner"){

      setSidebarList(dataObj[1])

    }else if(userType == "instituteOwner"){

      setSidebarList(dataObj[2])

    }else if(userType == "shopOwne"){

      setSidebarList(dataObj[3])

    }else if(userType == "viewer"){

      setSidebarList(dataObj[4])

    }

  },[userType])

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  function settingMenu(ID) {
    if (ID == 0) {
      setDisplay((prev) => (prev == "none" ? "block" : "none"));
    } else {
      setDisplay("none");
    }
  }

  const hideMenu = () => {
    setDisplay('none');
  };

  function logOutFunc  (){

    localStorage.removeItem("token");
    localStorage.removeItem("reduxState")
    dispatch(deleteShopData())
    dispatch(deleteUserProfile())
    dispatch({ type : "GOT_ERROR"})

  }

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={    profileImage ? `http://localhost:8080/userImages/${profileImage}` : personsImgs.avatar} alt="profile image" />
        </div>
        <span className="info-name">{user?.name}</span>
      </div>
      <div className="sidebar_container">
        <nav className="navigation">
          <ul className="nav-list" style={{ paddingLeft: "0px" }}>
            { sidebarList &&  sidebarList.map((navigationLink) => (
              <li
                className="nav-item"
                key={navigationLink.id}
                onClick={() => settingMenu(navigationLink.id)}
                style={{ position: "relative" }}
              >
                <Link
                  onClick={() => setActiveLink(navigationLink.id)}
                  to={navigationLink.to}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0px 10px",
                    position:"relative"
                  }}
                  className={`nav-link ${
                    navigationLink.id === activeLink ? "active" : null
                  }`}
                >
                  <img
                    src={navigationLink.image}
                    className="nav-link-icon"
                    alt={navigationLink.title}
                  />

                  <span className="nav-link-text">{navigationLink.title}</span>

                  {navigationLink.subCategory ? (
                    <SettingMenu
                      toggleTheme={toggleTheme}
                      theme={theme}
                      menu={navigationLink.subCategory}
                      display={display}
                      hideMenu={hideMenu}
                      logOutFunc = {logOutFunc}

                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

function SettingMenu({ menu, display, toggleTheme, theme, hideMenu, logOutFunc }) {
 

  const menuRef = useRef(null);




  function handleFunction(ID) {
    if (ID == 1) {
      toggleTheme();
    }else if(ID == 2){
    
      logOutFunc()
    
    }
  }


  



    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        hideMenu(); 
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


  return (
    <ul
    ref={menuRef}
      style={{
        display: display,
        position: "absolute",
        top: "0px",
        left: "103%",
        background: `${theme == "dark" ? "#2a3a35" : "#3ce2ad"}`,
        padding: "10px 12px 10px 2px",
        borderRadius: "8px",
        transition: "all 2sec ease-in",
        zIndex: "999"
      }}
    >
      {menu &&
        menu.map((val) => {
          return (
            <li key={val.id}  style={{marginBottom:"7px"}}>
              <div className="d-flex justify-content-around align-items-center" onClick={() => handleFunction(val.id)}>
                
                {val.id == 1 ? <div  style={{margin:"0px 10px"}}> {theme == "dark" ? <MdLightMode /> : <MdOutlineLightMode/>}</div>  : null}

                {val.id == 2 ? <MdLogout  style={{margin:"0px 10px"}}/> : null}

                {val.id == 1 ? <span>{theme == "dark" ? "Light" : "Dark"}</span> : <span>{val.title}</span> }

                {/* {val.title} */}
              </div>
            </li>
          );
        })}
    </ul>
  );
}
