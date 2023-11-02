import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { iconsImgs } from "../../../utils/images";
import profileImg from "../../Assets/Images/Realistic-Male-Profile-Picture.webp";
import shopImg from "../../Assets/Images/medicalShopDemo3.png";

import "./Landing.css";

const Landing = () => {
  const [navTogle, setNavTogle] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleNabvar() {
    console.log("11111");
    setNavTogle(!navTogle);
  }
  function dropdownTogle() {
    setDropdownMenu(true);
  }
  return (
    <div className="container-fluid landing" style={{ position: "relative" }}>
      {/* nabvar */}

      <div className="div1">
        <div className="row navrow">
          <div className="col-12 ">
            <div
              className="row justify-content-center align-items-center "
              style={{ position: "relative", height: "100%" }}
            >
              {/* togle  */}

              <button
                className="togleSite"
                type="button"
                onClick={() => toggleNabvar()}
              >
                <img className="togleSiteMenu" src={iconsImgs.menu3} alt="" />
              </button>

              {/* togle menu */}

              <div
                className={`togleMenuItem ${
                  navTogle ? "truetogleMenuItem " : null
                } `}
              >
                <div className="closeIconDiv">
                  <img
                    onClick={() => setNavTogle(false)}
                    className={`closeIcon  ${navTogle ? "closeIconTrue" : ""}`}
                    src={iconsImgs.close}
                    alt=""
                  />
                </div>
                <ul className={`${navTogle ? "trutogleUl" : "togleUl"}  `}>
                  <li>
                    {" "}
                    <Link style={{ textDecoration: "none" }}>About</Link>{" "}
                  </li>
                  <li
                    // type="button"
                    class=" dropdown_toggle1"
                    onClick={dropdownTogle}
                  >
                    Services
                    <ul
                      ref={dropdownRef}
                      class={`${
                        dropdownMenu
                          ? "dropdown_menu1_visble"
                          : "dropdown_menu_hide"
                      }`}
                    >
                      <li>
                        <Link>Pharmacy</Link>
                      </li>
                      <li>
                        <Link>Doctors</Link>
                      </li>
                      <li>
                        <Link>Institutes</Link>
                      </li>
                      <li>
                        <Link>Teachers</Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    {" "}
                    <Link style={{ textDecoration: "none" }}>contact</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link
                      to={"/login"}
                      className="SignInBtn"
                      style={{ textDecoration: "none" }}
                    >
                      SignIn
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              <div className="col-5 justify-content-center align-items-center ">
                <h5 style={{ margin: "0px" }}>Nearest</h5>
              </div>
              <div className="col-7 d-flex ">
                <ul className="demSiteUl">
                  <li>
                    {" "}
                    <Link>About</Link>{" "}
                  </li>
                  <li
                    // type="button"
                    className=" dropdown_toggle"
                    onClick={dropdownTogle}
                  >
                    Services
                    <ul
                      ref={dropdownRef}
                      className={`${
                        dropdownMenu
                          ? "dropdown_menu_visble"
                          : "dropdown_menu_hide"
                      }`}
                    >
                      <li>
                        <Link>Pharmacy</Link>
                      </li>
                      <li>
                        <Link>Doctors</Link>
                      </li>
                      <li>
                        <Link>Institutes</Link>
                      </li>
                      <li>
                        <Link>Teachers</Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    {" "}
                    <Link>contact</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to={"/login"}>SignIn</Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* content */}

      {/* parallex */}

      {/* what we do */}

      <div className="weDo">
        <h3 className="text-center weDoText">What We Do</h3>
      </div>
      <section class="section section-dark">
        <h2 className="sectionText">We Made The Way Easy</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
        <button className="weDobtn">Explore More</button>
      </section>

      {/* about */}

      <div>
        <h3 className="text-center weDoText">About Nearest</h3>
      </div>

      <section class="section section-dark">
        <h2 className="sectionText">A Platfrom Where You Can</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      {/* services */}

      <div>
        <h3 className="text-center weDoText">Our Services</h3>
      </div>
      <section class="section section-dark">
        <h2 className="sectionText">What We Provide You</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      <div className="row" style={{ margin: "12px 0px" }}>
        <div className="col-12">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-12 serviceCol">
              <div className="serviceDiv">
                <img className="serviceIcon" src={iconsImgs.doctor1} alt="" />
                <h5 className="my-3" style={{ cursor: "pointer" }}>
                  Specialist Doctors
                </h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12 serviceCol ">
              <div className="serviceDiv">
                <img className="serviceIcon" src={iconsImgs.teacher} alt="" />
                <h5 style={{ cursor: "pointer" }} className="my-3">
                  Experince Teachers
                </h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12 serviceCol ">
              <div className="serviceDiv">
                <img className="serviceIcon" src={iconsImgs.Shop} alt="" />
                <h5 style={{ cursor: "pointer" }} className="my-3">
                  Pharmacies
                </h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12 serviceCol ">
              <div className="serviceDiv">
                <img className="serviceIcon" src={iconsImgs.institute} alt="" />

                <h5 style={{ cursor: "pointer" }} className="my-3">
                  Best Coachings
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* doctors */}

      {/* <div class="pimg5">
        <a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">
          <div class="ptext">
            <span>Meet Doctors</span>
          </div>
        </a>
      </div> */}
      <div>
        <h3 className="text-center weDoText">Meet Doctors</h3>
      </div>
      <section class="section section-dark">
        <h2 className="sectionText">
          You can Get All information About Appointment
        </h2>
        <div className="row justify-content-center py-3">
          <div className="col-md-8 col-12 text-center ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      <div className="row justify-content-center py-5">
        <div className="col-10">
          <div className="row  justify-content-around gx-3">
            <div className="col-md-3 col-sm-4 col-12 mb-3 ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">Dr.Preshan</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12 mb-3 ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">Dr.Preshan</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12 mb-3 ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">Dr.Preshan</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12 mb-3 ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">Dr.Preshan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center py-3">
        <div className="col-md-8 col-12 text-center ">
          <button className="btn btn-success">View More Doctors</button>
        </div>
      </div>

      {/* medical stores */}

      <div class="pimg6">
        <a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">
          <div class="ptext">
            <span>Pharmacy </span>
          </div>
        </a>
      </div>
      

      {/* pharmacy card */}

      <div className="row justify-content-center py-5">
        <div className="col-10">
          <div className="row  justify-content-around gx-3">
            <div className="col-md-6 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-2 ">
                  <div
                    className="docImageDiv"
                    style={{
                      backgroundImage: `url('${shopImg}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px",
                      borderRadius: "12px 12px 3px 3px",
                      position: "relative",
                    }}
                  ></div>
                  <div className="pharmayText ">
                    {/* <p className="mb-0 teachSub">Chemistry</p> */}
                    <h5 className="mb-0">Azanta Pharmacy</h5>
                    <p className="mb-0 teachSub">Railpar OK Road Asansol</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-2 ">
                  <div
                    className="docImageDiv"
                    style={{
                      backgroundImage: `url('${shopImg}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px",
                      borderRadius: "12px 12px 3px 3px",
                      position: "relative",
                    }}
                  ></div>
                  <div className="pharmayText ">
                    {/* <p className="mb-0 teachSub">Chemistry</p> */}
                    <h5 className="mb-0">Azanta Pharmacy</h5>
                    <p className="mb-0 teachSub">Railpar OK Road Asansol</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section section-dark">
        <h2 className="sectionText">
          You can Get All information About Pharmacy.
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      {/* Schools/coachings */}

      <div class="pimg7">
        <a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">
          <div class="ptext">
            <span>Schools And Coachings </span>
          </div>
        </a>
      </div>
      <section class="section section-dark">
        <h2 className="sectionText">
          You can Get All information About Schools and Coachings.
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      {/* teachers */}

      <div class="pimg8">
        <a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">
          <div class="ptext">
            <span>Teachers </span>
          </div>
        </a>
      </div>
      <section class="section section-dark">
        <h2 className="sectionText">
          You can Get All Information About Teachers.
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div>
      </section>

      {/* teachers card */}

      <div className="row justify-content-center py-5">
        <div className="col-10">
          <div className="row  justify-content-around gx-3">
            <div className="col-md-3 col-sm-4 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">
                    <p className="mb-0 teachSub">Maths</p>
                    <p className="mb-0">Mr.Preshna</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">
                    <p className="mb-0 teachSub">Physics</p>
                    <p className="mb-0">Mr.Preshna</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>
                  <div className="doctTitle ">
                    <p className="mb-0 teachSub">Chemistry</p>
                    <p className="mb-0">Mr.Preshna</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12  mb-3  ">
              <div className="docMainDiv">
                <div className=" docCard p-3 ">
                  <div className="docImageDiv">
                    <img className="docImage" src={profileImg} alt="" />
                    <img className="docIncon" src={iconsImgs.bell1} alt="" />
                  </div>

                  <div className="doctTitle ">
                    <p className="mb-0 teachSub">History</p>
                    <p className="mb-0">Mr.Preshna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
