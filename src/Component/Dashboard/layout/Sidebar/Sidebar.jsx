import { useEffect, useState } from "react";
import { personsImgs } from "../../../../utils/images";
import { navigationLinks } from "../../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../../context/sidebarContext";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../ApiCalling/api";
import { getUserData } from "../../../Action";
import activeLinkContext from "../../../context/activeLinkContext";

const Sidebar = () => {
  // const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);


  const  {activeLink, setActiveLink}  = useContext(activeLinkContext)

  const dispatch = useDispatch()
  const user = useSelector((state) => state?.getUserData?.userData?.user);

  // console.log("sidebarUser", user);


  function getData(data) {
    dispatch(getUserData(data));
  }


  useEffect(() => {
    getUser(getData);
  }, []);



  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);






  return (
    <div className={`sidebar ${sidebarClass}`}>

      <div className="user-info">
          <div className="info-img img-fit-cover">
            <img src={personsImgs.avatar} alt="profile image" />
          </div>
          <span className="info-name">{user?.name}</span>
        </div>
      <div className="sidebar_container">
        
        <nav className="navigation">
          <ul className="nav-list" style={{ paddingLeft: "0px" }}>
            {navigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                <Link
                onClick={()=> setActiveLink(navigationLink.id)}
                  to={navigationLink.to}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0px 10px",
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
