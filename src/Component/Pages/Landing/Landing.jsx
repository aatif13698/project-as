import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconsImgs } from "../../../utils/images";
import profileImg from "../../Assets/Images/Realistic-Male-Profile-Picture.webp";
import shopImg from "../../Assets/Images/medicalShopDemo3.png";

import "./Landing.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { personsImgs } from "../../../utils/images";

const Landing = () => {

  const navigate = useNavigate()
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
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

  // carousel options
  const carouselItems = [
    {
      title: "Item 1",
      description: "Description for Item 1",
      imageUrl: "https://example.com/item1.jpg",
    },
    {
      title: "Item 2",
      description: "Description for Item 2",
      imageUrl: "https://example.com/item2.jpg",
    },
    {
      title: "Item 3",
      description: "Description for Item 3",
      imageUrl: "https://example.com/item3.jpg",
    },
  ];

  // navbar csss
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: scrolling ? 'white' : 'transparent',
    boxShadow: scrolling ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const textStyle = {
    color : scrolling ?  "black" : "white"
  }

  return (
    <div
      className="container-fluid landing"
      style={{ position: "relative", padding: "0px" }}
    >
      {/* nabvar */}

      <div className="div1" style={navbarStyle}>
        <div className="row navrow  border-3">
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
                <ul className={`${navTogle ? "trutogleUl" : "togleUl"}  `} >
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
                    <button
                      to={"/login"}
                      className="contact-btn-signIn"
                      style={{ textDecoration: "none" }}
                    >
                      SignIn
                    </button>{" "}
                  </li>
                </ul>
              </div>

              <div className="col-5 justify-content-center align-items-center ">
                <h5 style={{ margin: "0px 55px" }}>Nearest</h5>
              </div>
              <div className="col-7 d-flex ">
                <ul className="demSiteUl" >
                  <li className="li-hover">
                    {" "}
                    <Link style={textStyle}>About</Link>{" "}
                  </li>
                  <li 
                    // type="button"
                    style={textStyle}
                    className=" dropdown_toggle li-hover"
                    onMouseOver={dropdownTogle}
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

                  <li className="li-hover">
                    {" "}
                    <Link style={textStyle}>contact</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <button className="contact-btn-signIn" onClick={() =>  navigate("/login")} to={"/login"}>SignIn</button>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* new section */}

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="welcome-area context" id="welcome" 
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-delay={600}
      >
        <div class="header-text">
          <div class="container">
            <div class="row">
              <div class=" col-xl-6 col-lg-8 col-md-12 col-sm-12">
                <h1>
                  Streamline Your School/Pharmacy Operations with{" "}
                  <strong className="text-container">ONE STEP</strong>
                  <br />
                  Effortless School Management Solutions for{" "}
                  <strong className="text-container">
                    Institutions/Pharmacy
                  </strong>
                </h1>
                <button  class="contact-btn">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* introductipon  */}

      <div class="row py-4 px-3">
        <div class="col-lg-7 col-md-12 col-sm-12"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay={100}>
          <img
            src={personsImgs.introImg}
            class="rounded img-fluid d-block mx-auto my-auto"
            alt="App"
          />
        </div>
        <div className="col-lg-5 col-md-12 col-sm-12 intro_div">
          <div className="main-intro-heading"
           data-aos="fade-left"
           data-aos-duration="1000"
           data-aos-delay={100}>
            <h2>ONE STEP'S VISION & MISSION</h2>
          </div>
          <div class="  intro_div ">
            <div class="left-heading"
             data-aos="fade-left"
             data-aos-duration="1000"
             data-aos-delay={200}
            >
              <h5>
                Welcome to <strong className="text-container">ONE STEP</strong>,
                where we revolutionize school management for private
                institutions. Say goodbye to the complexities of traditional
                administrative tasks and embrace a seamless, efficient, and
                organized approach to running your school.
              </h5>
            </div>
            <div className="mt-2"
             data-aos="fade-left"
             data-aos-duration="1000"
             data-aos-delay={400}
            >
              <h5>
                At <strong className="text-container">ONE STEP</strong>, we
                understand the unique challenges faced by private schools in
                managing teachers, classes, batches, and students. Our platform
                is designed to simplify these tasks, empowering you to focus on
                what truly matters – providing an exceptional education to your
                students.
              </h5>
              <div className="mt-3"
               data-aos="fade-left"
               data-aos-duration="1000"
               data-aos-delay={600}
              >
                <button className="contact-btn">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* how it works */}
      <section class="section section-dark demo">
        {/* <h2 className="sectionText">What We Provide You</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              illum adipisci soluta natus quidem, possimus necessitatibus
              blanditiis voluptatum incidunt harum, maiores voluptas repellat
              minus sed optio facere. Quidem, voluptas veritatis.
            </p>
          </div>
        </div> */}
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
      </section>

      {/* service carousel */}
      <div className="carousel-div pattern">
        <Carousel responsive={responsive}>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-01.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">First Box Service</h5>
            <p>
              Aenean vulputate massa sed neque consectetur, ac fringilla quam
              aliquet. Sed a enim nec eros tempor cursus at id libero.
            </p>
            <a href="#" class="main-button">
              Read More
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-02.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Second Box Title</h5>
            <p>
              Pellentesque vitae urna ut nisi viverra tristique quis at dolor.
              In non sodales dolor, id egestas quam. Aliquam erat volutpat.{" "}
            </p>
            <a href="#" class="main-button">
              Discover More
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-03.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Third Title Box</h5>
            <p>
              Quisque finibus libero augue, in ultrices quam dictum id. Aliquam
              quis tellus sit amet urna tincidunt bibendum.
            </p>
            <a href="#" class="main-button">
              More Detail
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-02.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Fourth Service Box</h5>
            <p>
              Fusce sollicitudin feugiat risus, tempus faucibus arcu blandit
              nec. Duis auctor dolor eu scelerisque vestibulum.
            </p>
            <a href="#" class="main-button">
              Read More
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-01.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Fifth Service Title</h5>
            <p>
              Curabitur aliquam eget tellus id porta. Proin justo sapien,
              posuere suscipit tortor in, fermentum mattis elit.
            </p>
            <a href="#" class="main-button">
              Discover
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-03.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Sixth Box Title</h5>
            <p>
              Ut nibh velit, aliquam vitae pellentesque nec, convallis vitae
              lacus. Aliquam porttitor urna ut pellentesque.
            </p>
            <a href="#" class="main-button">
              Detail
            </a>
          </div>
          <div class="item service-item">
            <div class="icon">
              <i>
                <img src="assets/images/service-icon-01.png" alt="" />
              </i>
            </div>
            <h5 class="service-title">Seventh Title Box</h5>
            <p>
              Sed a consequat velit. Morbi lectus sapien, vestibulum et sapien
              sit amet, ultrices malesuada odio. Donec non quam.
            </p>
            <a href="#" class="main-button">
              Read More
            </a>
          </div>
        </Carousel>
      </div>
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

      {/* <div>
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
      </section> */}

      {/* services */}

      <div>
        <h3 className="text-center weDoText">Our Services</h3>
      </div>

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
      </div>
      <div>
        <h3 className="text-center weDoText">Meet Doctors</h3>
      </div> */}
      {/* <section class="section section-dark">
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
      </div> */}

      {/* <div className="row justify-content-center py-3">
        <div className="col-md-8 col-12 text-center ">
          <button className="btn btn-success">View More Doctors</button>
        </div>
      </div> */}

      {/* medical stores */}

      {/* <div class="pimg6">
        <a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">
          <div class="ptext">
            <span>Pharmacy </span>
          </div>
        </a>
      </div> */}

      {/* pharmacy card */}

      {/* <div className="row justify-content-center py-5">
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
      </section> */}

      {/* Schools/coachings */}

      {/* <div class="pimg7">
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
      </section> */}

      {/* teachers */}

      {/* <div class="pimg8">
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
      </section> */}

      {/* teachers card */}

      {/* <div className="row justify-content-center py-5">
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
      </div> */}
    </div>
  );
};

export default Landing;
