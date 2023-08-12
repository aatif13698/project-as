import React, { useContext, useEffect, useState } from "react";
import { iconsImgs } from "../../utils/images";
import profileImg from "../Assets/Images/Realistic-Male-Profile-Picture.webp";
// import "./HomeInstitute.css";
import { BsCircle } from "react-icons/bs";
import CircularProgress from "@mui/joy/CircularProgress";
import { ThemeContext } from "@emotion/react";
import activeLinkContext from "../context/activeLinkContext";

const HomeShop = () => {
  // for theme

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { setActiveLink } = useContext(activeLinkContext);


  const barColor = theme == "dark" ? "#13f0ac" : "blue";

  // for date
  const today = new Date();
  function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return ` ${day}/${month}/${year}`;
  }

  // for time
  const [currentTime, setCurrentTime] = useState(new Date());
  // const currentTim = new Date();
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")} ${ampm}`;
  }

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update current time every second
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  // circular progress

  const rotationAngle = (50 / 100) * 360;



  // active link

  useEffect(() => {
    setActiveLink(2);
  }, []);

  return (
    <div className="container-fluid">
      {/* first section */}

      <div className="row gx-3 mb-3">
        <div  className="col-md-8 col-12 " data-aos="zoom-in" data-aos-duration="1000">
          <div className=" row1">
            <div className="row">
              <div className="col-md-4 col-6 col1">
                <div className="homeImgDiv">
                  <img className="homeImg" src={profileImg} alt="" />
                </div>

                <div>
                  <h4>Welocome Back</h4>
                  <h3>Md </h3>
                </div>
              </div>
              <div className="col-md-4 col-6 col2">
                <div className="Info1">
                  <div className="homeInfo">
                    <p
                      style={{
                        marginBottom: "3px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        className="profileIcon1"
                        src={iconsImgs.location}
                        alt=""
                      />
                      <span>Railpar OK Road Asansol -713302, West Bengal</span>
                    </p>
                    <p style={{ marginBottom: "3px" }}>
                      <img
                        className="profileIcon1"
                        src={iconsImgs.phone}
                        alt=""
                      />{" "}
                      980065436
                    </p>
                  </div>

                  <p style={{ marginBottom: "3px" }}>
                    <img className="profileIcon1" src={iconsImgs.mail} alt="" />{" "}
                    dummy@gmail.com
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col3">
                <div className="manageProfile">
                  <h6>You Can Creat Your Profile And Can Manage It.</h6>
                  <button className=" homeBtn">Manage Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12  mt-md-0 mt-3 d-flex justify-contnet-center align-items-center " data-aos="zoom-in" data-aos-duration="1000">
          <div className=" homerow3 d-flex justify-contnet-center align-items-center flex-column">
              <div>
                <h3 className="text-center">Create Institute.</h3>
                <h5 > Institute Profile Will Vissible To The User Searching Your Institute.</h5>
                <button className=" homeBtn">Manage Institute</button>

              </div>
          </div>
        </div>
      </div>

      {/* second section */}

      <div className="row gx-3 mb-3">
        <div className="col-md-8 col-12">
          <div className="row ">
            <div className="row gx-3">
            <div className="col-md-4 col-6  mb-md-3 mb-3 " >
                <div className="homeSmBox">
                  <div className="homeDoctDiv">
                    <img className="homeDoct" src={iconsImgs.teacher} alt="" />
                  </div>
                  <h3>Teachers </h3>
                  <h2 className="homeNum">78</h2>
                  <p>Details</p>
                </div>
              </div>
              <div className="col-md-4 col-6  mb-md-3 mb-3 ">
                <div className="homeSmBox">
                  <div className="homeDoctDiv">
                    <img className="homeDoct" src={iconsImgs.batches} alt="" />
                  </div>
                  <h3>Batches </h3>
                  <h2 className="homeNum">78</h2>
                  <p>Details</p>
                </div>
              </div>
              <div className="col-md-4 col-6  mb-md-3 mb-3 ">
                <div className="homeSmBox">
                  <div className="homeDoctDiv">
                    <img className="homeDoct" src={iconsImgs.memories} alt="" />
                  </div>
                  <h3>Memories </h3>
                  <h2 className="homeNum">78</h2>
                  <p>Details</p>
                </div>
              </div>
              <div className="col-md-4 col-6  mb-md-3 mb-3 ">
                <div className="homeSmBox">
                  <div className="homeDoctDiv">
                    <img className="homeDoct" src={iconsImgs.doctor1} alt="" />
                  </div>
                  <h3>Gallery </h3>
                  <h2 className="homeNum">78</h2>
                  <p>Details</p>
                </div>
              </div>
              <div className="col-md-8  col-12 mb-md-3 mb-3 ">
                <div className="homeSmBox">
                  <div className="homeDoctDiv">
                    <img className="homeDoct" src={iconsImgs.subjects} alt="" />
                  </div>
                  <h3>Upcomming Batch </h3>
                  <h2 className="homeNum">78</h2>
                  <p>Details</p>
                </div>
              </div>
             
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12  mt-md-0 mt-3 d-flex justify-content-center align-items-center flex-column ">
          <div className="homedata py-3" style={{position:"relative"}}>
            <div className="homeDoctDiv">
              <img className="homeDoct" src={iconsImgs.event} alt="" />
            </div>
            <h3>Upcomming Events </h3>
            <h2 className="homeNum">78</h2>
            <p>Details</p>
          </div>
          <div className="homedata py-3 mt-3">
            <h3>Date : {formatDate(today)}</h3>

            <h3> Time: {formatTime(currentTime)}</h3>
          </div>
        </div>
      </div>

      {/* third section */}

      <div className="row gx-3 mb-3">
        <div className="col-md-8 col-12 ">
          <div className="row ">
            <div className="row gx-3">
              <div className="col-md-8 col-12 mb-md-0 mb-3 ">
                <div className="homeSmBox2" style={{ position: "relative" }}>
                  <div className="homeViewMore">
                    <h6>View More</h6>
                  </div>
                  <div className="homeFHead">
                    <h3>Your Followers </h3>
                  </div>
                  <div className=" row homeFollowers">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                      <img
                        className="homeDoct"
                        src={iconsImgs.account}
                        alt=""
                      />
                    </div>

                    <div className="col-10 d-flex justify-content-between align-items-center">
                      <h4 style={{ margin: "0px" }}>Md asif </h4>
                      <h5 style={{ margin: "0px" }}>Railpar ok road</h5>
                      <p style={{ margin: "0px" }}>Veiw</p>
                    </div>
                  </div>
                  <div className=" row homeFollowers">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                      <img
                        className="homeDoct"
                        src={iconsImgs.account}
                        alt=""
                      />
                    </div>

                    <div className="col-10 d-flex justify-content-between align-items-center">
                      <h4 style={{ margin: "0px" }}>Md asif </h4>
                      <h5 style={{ margin: "0px" }}>Railpar ok road</h5>
                      <p style={{ margin: "0px" }}>Veiw</p>
                    </div>
                  </div>
                  <div className=" row homeFollowers">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                      <img
                        className="homeDoct"
                        src={iconsImgs.account}
                        alt=""
                      />
                    </div>

                    <div className="col-10 d-flex justify-content-between align-items-center">
                      <h4 style={{ margin: "0px" }}>Md asif </h4>
                      <h5 style={{ margin: "0px" }}>Railpar ok road</h5>
                      <p style={{ margin: "0px" }}>Veiw</p>
                    </div>
                  </div>
                  <div className=" row homeFollowers">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                      <img
                        className="homeDoct"
                        src={iconsImgs.account}
                        alt=""
                      />
                    </div>

                    <div className="col-10 d-flex justify-content-between align-items-center">
                      <h4 style={{ margin: "0px" }}>Md asif </h4>
                      <h5 style={{ margin: "0px" }}>Railpar ok road</h5>
                      <p style={{ margin: "0px" }}>Veiw</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 mb-md-0 mb-3 ">
                <div className="homeSmBox1">
                  <div>
                    <h3>Requests </h3>
                  </div>
                  <div>
                    <CircularProgress
                      size="lg"
                      // sx={{color:"green", background:"yellow"}}
                      determinate
                      value={50}
                      // color="primary"
                      sx={{
                        "& circle": {
                          mask: `conic-gradient(
                            from 0deg at 50% 50%, 
                            transparent ${rotationAngle}deg, 
                            white 0deg ${rotationAngle}deg, 
                            transparent 0deg
                          ) rotate(90deg)`,
                        },
                      }}
                    >
                      <h3>50</h3>
                    </CircularProgress>
                  </div>
                  <div>
                    <h5>See All</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12 col4 mt-md-0 mt-3 ">
          <div style={{ height: "100%" }}>
            <div className="d-flex justify-content-center align-items-center my-3">
              <h4>Creat News </h4>
            </div>
            <div className="row">
              <div className="col-12">
                <textarea
                  className="homeNews"
                  placeholder="Type News"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeShop;
