import { iconsImgs } from "../../../utils/images";
import "./ContentTop.css";
import { useContext, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { personsImgs } from "../../../utils/images";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileImage = useSelector(
    (state) => state?.getUserData?.userData?.user?.pdf
  );
  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const [searchTogle, setSearchTogle] = useState(false);
  const [close, setClose] = useState(false);

  // function logOutFunc() {
  //   // localStorage.removeItem("token");
  //   // dispatch({ type : "GOT_ERROR"})
  //   // navigate("/signUp")
  // }

  function handleSearchExpand() {
    setSearchTogle(!searchTogle);
  }

  function toggleSidebarFnc() {
    toggleSidebar();
    setClose(!close);
  }

  function logOutFunc  (){

    localStorage.removeItem("token");
    localStorage.removeItem("reduxState")
    // dispatch(deleteShopData())
    // dispatch(deleteUserProfile())
    dispatch({ type : "GOT_ERROR"})

  }

  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebarFnc()}
        >
          {close ? (
            <img className="topBarIcons" src={iconsImgs.menu1} alt="" />
          ) : (
            <img className="topBarIcons" src={iconsImgs.closeIcon} alt="" />
          )}
        </button>
        {/* <h3 className="content-top-title" style={{ margin: "0px" }}>
          Dashboard
        </h3> */}
        <div
          className="d-flex align-items-center ms-3"
          style={{ position: "relative", cursor: "pointer" }}
        >
          <button
            type="button"
            className="d-flex justify-contenet-start content-top-btn seatrch"
            style={{ position: "absolute", left: "6px" }}
            onClick={handleSearchExpand}
          >
            <img className="topBarIcons" src={iconsImgs.search} alt="" />
          </button>
          <input
            type="text"
            placeholder="Search Here..."
            className={`search-btn ${searchTogle ? "search-btn-after" : ""}`}
          />
        </div>
      </div>

      <div className="d-flex align-items-center">
        <div className="content-top-btn me-3">
          <button
            className="notification-btn content-top-btn"
            // onClick={logOutFunc}
          >
            <img className="topBarIcons" src={iconsImgs.bell1} />
            <span className="notification-btn-dot"></span>
          </button>
        </div>

        <div className="user-info">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link" className="p-0">
              <div className="info-img img-fit-cover">
                <img
                  src={
                    profileImage
                      ? `http://localhost:8080/userImages/${profileImage}`
                      : personsImgs.avatar
                  }
                  alt="profile image"
                />
                {/* <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} /> */}
              </div>
            </DropdownToggle>
            <DropdownMenu
              end
              className="rm-pointers dropdown-menu-lg mt-2 dropdown-style  "
              data-aos="fade-down"
              style={{ minWidth: "13rem", padding: "4px 0px 8px 13px" }}
              data-aos-duration="500"
              data-aos-delay={100}
            >
              <Nav vertical>
                <NavItem className="nav-item-header">Activity</NavItem>

                <NavItem>
                  <NavLink href="#">Recover Password</NavLink>
                </NavItem>
                <NavItem className="nav-item-header">My Account</NavItem>
                <NavItem>
                  <NavLink href="#">Settings</NavLink>
                </NavItem>

                <NavItem>
                  {/* <NavLink href="#">Logout</NavLink> */}
                  <button onClick={logOutFunc}>Logout</button>
                </NavItem>
                <NavItem>
                  <label class="switch">
                    <span class="sun">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g fill="#ffd43b">
                          <circle r="5" cy="12" cx="12"></circle>
                          <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                        </g>
                      </svg>
                    </span>
                    <span class="moon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                      </svg>
                    </span>
                    <input type="checkbox" class="input" />
                    <span class="slider"></span>
                  </label>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <span className="info-name">{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
