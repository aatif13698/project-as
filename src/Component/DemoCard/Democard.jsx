import React from "react";
import { iconsImgs } from "../../utils/images";
import profileImg from "../Assets/Images/Realistic-Male-Profile-Picture.webp";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import shopImg from "../Assets/Images/medicalShopDemo3.png";

const Democard = () => {
  return (
    <div className="container-fluid " style={{ padding: "0px" }}>
      <div className="row">
        <div className="docHead text-center ">
          <p>
            Once You Will Fill The Form In Different Sections Like Profile, Shop
            And Add Doctor etc, Cards Will be Generated Accordingly For Each
            Section. So Bellow IS the Demo Cards For Preview.
          </p>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-md-7 col-12 docHead text-center">
          <h3>Demo Card of Your Profile.</h3>
        </div>
      </div>

      <div
        className=" row  justify-content-center my-4"
        style={{ margin: "0px 12px" }}
      >
        <div
          className="col-md-8 col-12 "
          style={{ padding: "0px", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "#2bf2d0",
              opacity: "0.50",
              left: "-9px",
              top: "-16px",
              borderRadius: "40px",
            }}
          ></div>
          <div className="row row1profile">
            <div
              data-aos="zoom-in-down"
              data-aos-duration="500"
              data-aos-delay={400}
              className="col-md-5 col-12 imgCol1  d-flex justify-content-center align-items-center "
            >
              <div className="profileImg1">
                <img
                  className="img1"
                  src={profileImg}
                  // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1686779814~exp=1686780414~hmac=8eaa3044bc5a8a986d5b2e1eefd2ef9e3894822142aa0df3727bc1201f8e1a85"
                  alt="profile image"
                />
              </div>
            </div>
            <div
              data-aos="zoom-in-down"
              data-aos-duration="500"
              data-aos-delay={400}
              className="col-md-7 col-12 d-flex justify-content-start align-items-center flex-column"
              style={{ margin: "60px 0px" }}
            >
              <div style={{ margin: "0px 10px" }}>
                <h3>Wiliam Jhon</h3>
                <p style={{ marginBottom: "3px" }}>
                  <img className="profileIcon1" src={iconsImgs.mail} alt="" />{" "}
                  dummy@gmail.com
                </p>
                <p style={{ marginBottom: "3px" }}>
                  <img className="profileIcon1" src={iconsImgs.phone} alt="" />{" "}
                  980065436
                </p>
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

                <h6
                  style={{
                    marginBottom: "3px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {" "}
                  <img
                    style={{ marginBottom: "45px" }}
                    className="profileIcon1"
                    src={iconsImgs.about}
                    alt=""
                  />{" "}
                  <span>
                    Hey I am Full Stack MERN Developer. I am Currently Working
                    In Step To Soft PVT.
                  </span>{" "}
                </h6>
              </div>
              <div>
                <button
                  //   onClick={editProfile}
                  className="button-common"
                  // id="profileEdit"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-md-7 col-12 docHead text-center">
          <h3>Demo Card of Doctor's Profile.</h3>
        </div>
      </div>

      <div className="row  doctorRow">
        <div className=" col-12 col-md-8" style={{ height: "100%" }}>
          <div
            className="row flex-md-row flex-reverse  docRow2 "
            style={{
              height: "100%",
              borderRadius: "40px",
              padding: "0px",
            }}
          >
            <div className=" docCol col-12 order-2 order-md-1  col-md-7 flex-column  d-flex  justify-content-center  ">
              <div className="docText">
                <div style={{ position: "relative" }}>
                  <h3>DR.Sunil Dutta</h3>
                  <h5 style={{ color: "#363e3f99" }}>Gestroligist</h5>
                  <p>Monday, Friday</p>
                  <div
                    className="docLine"
                    style={{ position: "absolute", height: "4px" }}
                  ></div>
                </div>

                <div className=" docSpan">
                  <p>
                    <img className="docIcon" src={iconsImgs.phone} alt="" />
                    <span> 9888775343</span>
                  </p>
                  <p>
                    <img className="docIcon" src={iconsImgs.mail} alt="" />
                    <span> dummy@gmail.com</span>
                  </p>
                  <p className="d-flex flex-row">
                    <img className="docIcon" src={iconsImgs.location} alt="" />
                    <span>Railpar ok Road Asansol -713302, West Bengal</span>
                  </p>
                </div>

                <div className="d-flex justify-content-start align-items-center">
                  <button
                    to="#form"
                    className="doc_btn"
                    style={{ marginTop: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    to="#form"
                    className="doc_btn"
                    style={{ marginTop: "5px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 order-1 order-md-2 col-md-5 docCol2 d-flex justify-content-center align-items-center ">
              <div>
                <img className="doctorImg" src={profileImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* discount card */}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-7 col-12 docHead text-center">
          <h3>Demo Card of Discount.</h3>
        </div>
      </div>

      <div className="row justify-content-center align-items-center my-4 ">
        <div className="col-md-10 col-12">
          <div className="row justify-content-around   gx-2 gy-5">
            <div
              className="col-md-5 col-12  "
              style={{
                position: "relative",
                padding: "0px",
                borderRadius: "12px",
                boxShadow: "4px 3px 10px rgba(0,0,0, 0.2 )",
              }}
            >
              <div
                className="disPercent"
                style={{ position: "absolute", left: "8%", top: "20%" }}
              >
                <h6 style={{ margin: "0px" }}>30% OFF</h6>
              </div>
              <div
                className=" row  discountcard"
                style={{
                  height: "35vh",
                  borderRadius: "20px",
                  position: "relative",
                }}
              >
                <div
                  class="custom-shape-divider-top-1691572611"
                  style={{ padding: "0px", borderRadius: "12px" }}
                >
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                      class="shape-fill"
                      fill="#3ce2ad"
                    ></path>
                  </svg>
                </div>

                <div
                  className="col-5  d-flex justify-content-center align-items-center"
                  style={{ position: "relative" }}
                >
                  <h3 className="medicine">Blood Test</h3>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "18px",
                      left: "25px",
                    }}
                  >
                    <RiDeleteBin6Fill
                      // onClick={() => {
                      //   const shouldDelete = window.confirm(
                      //     "Are you sure you want to delete?"
                      //   );
                      //   if (shouldDelete) {
                      //     deleteDiscountCard(val._id);
                      //   }
                      // }}
                      style={{ fontSize: "25px", color: "red" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "18px",
                      left: "78px",
                    }}
                  >
                    <FiEdit
                      // onClick={() => editDiscountCard(val._id)}
                      style={{
                        fontSize: "25px",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="col-7  d-flex justify-content-center align-items-center"
                  style={{ position: "relative" }}
                >
                  <div class="custom-shape-divider-bottom-1691574366">
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        class="shape-fill"
                      ></path>
                    </svg>
                  </div>

                  <div>
                    <h4>Azanta Pharmacy</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop card */}

          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-md-7 col-12 docHead text-center">
              <h3>Demo Card of Shop.</h3>
            </div>
          </div>

          <div
            className="row mx-md-5 justify-content-center align-items-center "
            style={{ margin: "16px 0px" }}
          >
            <div
              id="ShopProfileContainer"
              className="col-12 col-md-8 "
              style={{ padding: "0px 12px 20px 12px" }}
            >
              <div
                className="row "
                style={{ height: "100%" }}
                // data-aos="fade-left"
                // data-aos-duration="500"
                // data-aos-delay={400}
              >
                <div
                  className=" col-12  py-md-0 py-3 "
                  id="shopBackground"
                  style={{
                    backgroundImage: `url('${shopImg}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    borderRadius: "12px 12px 3px 3px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "65%",
                      left: "20px",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      id="profileImage"
                      src={profileImg}
                      alt="profile image"
                      style={{
                        width: "130px",
                        height: "130px",
                        padding: "4px",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="col-12  d-flex align-items-center "
                  id="ShopProfileText"
                >
                  <div style={{ margin: "48px 0px 0px 10px" }}>
                    <div style={{ margin: "18px 0px" }}>
                      <h3>Azanta Pharmacy</h3>
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
                        <span>
                          OK Road Railpar Asansol -713302, West Bengal
                        </span>
                      </p>
                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.phone}
                          alt=""
                        />{" "}
                        98878XXX76
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.mail}
                          alt=""
                        />{" "}
                        dummy@gmail.com
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.time}
                          alt=""
                        />{" "}
                        8:00 AM
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.doctor1}
                          alt=""
                        />{" "}
                        Total 12 Doctors Available
                      </p>

                      <h5
                        style={{
                          marginBottom: "3px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {" "}
                        <img
                          className="profileIcon1"
                          src={iconsImgs.about}
                          alt=""
                        />{" "}
                        <span>
                          We Have Doctors with different specialist and the best
                          to treat. We give a minimum discount of 20% on
                          medicine and test.
                        </span>{" "}
                      </h5>
                    </div>

                    <div>
                      <button
                        // onClick={editShopProfile}
                        className="button-common"
                        // id="profileEdit"
                      >
                        Edit Shop
                      </button>
                    </div>
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

export default Democard;
