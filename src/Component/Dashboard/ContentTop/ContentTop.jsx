import { iconsImgs } from "../../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  function logOutFunc  (){
    // localStorage.removeItem("token");

    // dispatch({ type : "GOT_ERROR"})

    // navigate("/signUp")
  }



  return (
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
                <img className="topBarIcons" src={ iconsImgs.menu1 } alt="" />
            </button>
            <h3 className="content-top-title" style={{margin:"0px"}}>Dashboard</h3>
        </div>
        <div className="content-top-btns">
            <button type="button" className="search-btn content-top-btn">
                <img className="topBarIcons" src={ iconsImgs.search } alt="" />
            </button>
            <button className="notification-btn content-top-btn" onClick={logOutFunc}>
                <img className="topBarIcons" src={ iconsImgs.bell1 } />
                <span className="notification-btn-dot"></span>
            </button>
        </div>
    </div>
  )
}

export default ContentTop
