import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activeLinkContext from "../context/activeLinkContext";
import { useForm } from "react-hook-form";
import {
  addTeacherProfile,
  deleteParticularTeacher,
  getAllTeachersOfParticularInstitute,
  getUser,
} from "../ApiCalling/api";
import { getTeacherList, getUserData } from "../Action";
import avatar from "../Assets/Images/profile.png";
import { iconsImgs } from "../../utils/images";
import ImgURL from "../Common/imageUrl";
import Title from "../Common/Title/Title";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Button,
  ButtonGroup,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./AddTeacher.css";
import DataTable from "react-data-table-component";
import Search from "../Common/Search/Search";
import TeacherTable from "./TeacherTable";

// const columns = [
//   {
//     name: "ID",
//     selector: "id",
//     sortable: true,
//   },
//   {
//     name: "Name",
//     selector: "name",
//     sortable: true,
//   },
//   {
//     name: "Position",
//     selector: "position",
//     sortable: true,
//   },
//   {
//     name: "Salary",
//     selector: "salary",
//     sortable: true,
//   },
// ];


const data = [
  { id: 1, name: "John Doe", email: "Developer", phone: "2222222222" },
  { id: 2, name: "Jane Smith", email: "Designer", phone: "3333333333" },
  // Add more employee data as needed
];

const AddTeacher = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [choseTeacher, setChoseTeacher] = useState(false);
  const [teacherId, setTeacherId] = useState("");

  const scrollRef = useRef();

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );
  //   const profile = useSelector((state) => state?.getUserProfile?.userProfile);

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const teachers = useSelector(
    (state) => state?.getAllTeachersProfile?.teachersList
  );

  console.log("teachers",teachers);

  const { setActiveLink } = useContext(activeLinkContext);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    const {
      aboutTr,
      trEmail,
      trExperience,
      trPhoneNumber,
      trQualification,
      subjectSpecialist,
      trName,
      street,
      city,
      state,
      zipCode,
    } = data;
    // console.log(data, "11");

    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("email", email);
    formData.append("trEmail", trEmail);
    formData.append("trName", trName);
    formData.append("trExperience", trExperience);
    formData.append("aboutTr", aboutTr);
    formData.append("trPhoneNumber", trPhoneNumber);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("trQualification", trQualification);
    formData.append("subjectSpecialist", subjectSpecialist);
    // console.log("data", formData);

    if (choseTeacher) {
      const teacherEdit = "true";
      formData.append("teacherEdit", teacherEdit);
      formData.append("teacherId", teacherId);
    } else {
      const teacherEdit = "false";
      formData.append("teacherEdit", teacherEdit);
      formData.append("teacherId", "empty");
    }

    addTeacherProfile(formData, teacherProfileCallback);
    setSelectedImage("");
  }

  function teacherProfileCallback() {
    reset();
    setPostImage(null);
    getUser(getData);
    getAllTeachersOfParticularInstitute(getAllTeachersCallback);
    setChoseTeacher(false);
    setActiveTab("2")
  }

  function getData(data) {
    dispatch(getUserData(data));
  }

  function getAllTeachersCallback(data) {
    dispatch(getTeacherList(data));
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const fileView = URL.createObjectURL(e.target.files[0]);

    setSelectedImage(file);

    setPostImage(fileView);
  };

  // edit doctor

  function editTeacherProfile(ID) {
    setTeacherId(ID);
    const teacher = teachers?.find((val) => val._id == ID);
    setValue("aboutTr", teacher?.aboutTr);
    setValue("trExperience", teacher?.trExperience);
    setValue("trName", teacher?.trName);
    setValue("trPhoneNumber", teacher?.trPhoneNumber);
    setValue("street", teacher?.street);
    setValue("city", teacher?.city);
    setValue("state", teacher?.state);
    setValue("zipCode", teacher?.zipCode);
    setValue("trEmail", teacher?.trEmail);
    setValue("trQualification", teacher?.trQualification);
    setValue("subjectSpecialist", teacher?.subjectSpecialist);
    setValue("trEmail", teacher?.trEmail);

    setChoseTeacher(true);
    scrollToSection("form");
  }

  // delete doctor

  function deleteTeacherProfile(ID) {
    const data = { ID: ID, email: email };

    deleteParticularTeacher(data, deleteParticularTecCallback);
  }

  function deleteParticularTecCallback() {
    console.log("ho raha");

    getAllTeachersOfParticularInstitute(getAllTeachersCallback);
  }

  // function for scrolling

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  useEffect(() => {
    setActiveLink(3);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [teachers]);

  
const columns = useMemo(()=>
[
  {
    name: "ID",
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: "Name",
    selector: "trName",
    sortable: true,
  },
  {
    name: "Email",
    selector:(row) => row.trEmail,
    sortable: true,
  },
  {
    name: "Phone",
    selector:(row) => row.trPhoneNumber ,
    sortable: true,
  },
],[])

  const [activeTab, setActiveTab] = useState("1");
  console.log("activeTab", activeTab);

  const [searchText, setSearchText] = useState("");
  //subheader component of react-data-table
  const subHeaderComponent = useMemo(() => {
    return (
      <div>
        <input type="text" placeholder="search here" />
      </div>
    );
  }, [searchText]);

  return (
    <div className="container-fluid " style={{ padding: "0px" }}>
      <Row>
        <Col md="12">
          {" "}
          <div className="main-card mb-3">
            <div>
              <div className="btn-actions-pane-right mb-4 tabsButtonDiv">
                <button
                  // outline
                  className={`border-0 mx-3 button-common ${
                    activeTab == "1" ? "activeTab" : null
                  } `}
                  // color="primary"
                  onClick={() => {
                    setActiveTab("1");
                  }}
                >
                  Add Teachers
                </button>
                <button
                  // outline
                  className={`border-0 mx-3 button-common ${
                    activeTab === "2" ? "activeTab" : null
                  } `}
                  // color="primary"
                  onClick={() => {
                    setActiveTab("2");
                  }}
                >
                  View Teachers
                </button>

                <button
                  // outline
                  className={`border-0 mx-3 button-common  ${
                    activeTab == "3" ? "activeTab" : null
                  } `}
                  // color="primary"
                  onClick={() => {
                    setActiveTab("3");
                  }}
                >
                  Give Access
                </button>
              </div>
            </div>
            <div style={{ background: "transparent" }}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                  <TeacherTable/>
                </TabPane>
                <TabPane tabId="1">
                  <div
                    className="row justify-content-center"
                    data-aos="fade-left"
                    data-aos-duration="500"
                    data-aos-delay={200}
                  >
                    <Title
                      src={iconsImgs.teacher}
                      title={"Create Teacher Card"}
                      subTitle={
                        "Fill The Form To Create Card For Teachers Available In Your Institute"
                      }
                    />
                  </div>
                  <div
                    className="row justify-content-center align-items-center mx-2"
                    style={{ marginBottom: "40px " }}
                    id="form"
                  >
                    <div
                      data-aos="fade-left"
                      data-aos-duration="800"
                      data-aos-delay={400}
                      className="col-12   col-md-8"
                      id="creatProfile"
                    >
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        data-aos="fade-left"
                        data-aos-duration="700"
                        data-aos-delay={800}
                      >
                        <div className="row justify-content-around align-items-center mb-3 mt-4">
                          <div className="col d-flex flex-column justify-content-center align-items-center">
                            <label
                              htmlFor="file-upload"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={`${postImage ? postImage : avatar}`}
                                alt=""
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  border: "2px solid white",
                                  borderRadius: "50%",
                                }}
                              />
                            </label>

                            <p style={{ marginTop: "10px" }}>Select Image</p>

                            <input
                              type="file"
                              lable="Image"
                              name="myFile"
                              id="file-upload"
                              // multiple   // if want to select multiple file
                              accept=".jpeg, .png, .jpg"
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div>
                          <div className="col d-flex flex-column">
                            <label htmlFor="about">About Teacher :</label>
                            <textarea
                              id="about"
                              name="about"
                              placeholder="Enter Upto 50 words..."
                              rows="4"
                              cols="45"
                              {...register("aboutTr", {
                                required: true,
                              })}
                            ></textarea>
                            {errors.aboutTr &&
                              errors.aboutTr.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                        </div>

                        <h5>Teacher Details</h5>

                        <div
                          // data-aos="fade-left"
                          // data-aos-duration="500"
                          // data-aos-delay={800}
                          className="row flex-md-row flex-column mb-3"
                        >
                          <div className="col">
                            <label id="login_label" htmlFor="firstName">
                              Teacher Name
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Enter Name"
                              {...register("trName", {
                                required: true,
                              })}
                            />
                            {errors.TrName &&
                              errors.TrName.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              Subject Special
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Subject Specialist "
                              {...register("subjectSpecialist", {
                                required: true,
                              })}
                            />
                            {errors.subjectSpecialist &&
                              errors.subjectSpecialist.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                        </div>

                        <div
                          // data-aos="fade-left"
                          // data-aos-duration="500"
                          // data-aos-delay={800}
                          className="row flex-md-row flex-column mb-3"
                        >
                          <div className="col">
                            <label id="login_label" htmlFor="firstName">
                              Teacher Qualification
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Teacher Qualification"
                              {...register("trQualification", {
                                required: true,
                              })}
                            />
                            {errors.trQualification &&
                              errors.trQualification.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              Experience in Year
                            </label>
                            <input
                              type="number"
                              className="form-control login_input"
                              placeholder="Total Experience In Year"
                              {...register("trExperience", {
                                required: true,
                              })}
                            />
                            {errors.trExperience &&
                              errors.trExperience.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                        </div>

                        <div
                          // data-aos="fade-left"
                          // data-aos-duration="500"
                          // data-aos-delay={1000}
                          className="row flex-md-row flex-column mb-3"
                        >
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              Contact
                            </label>
                            <input
                              type="number"
                              className="form-control login_input"
                              placeholder="Phone Number"
                              {...register("trPhoneNumber", {
                                required: true,
                                pattern: {
                                  value: /^[0-9]{10}$/i,
                                  message:
                                    "Please enter a valid 10-digit phone number",
                                },
                              })}
                            />
                            {errors.trPhoneNumber &&
                              errors.trPhoneNumber.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            {errors.trPhoneNumber &&
                              errors.trPhoneNumber.type === "pattern" && (
                                <span className="text-danger">
                                  {errors.trPhoneNumber.message}
                                </span>
                              )}
                          </div>
                          <div className="col">
                            <label id="login_label" htmlFor="email">
                              Mail
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Enter Email"
                              {...register("trEmail", {
                                required: true,
                              })}
                            />
                            {errors.trEmail &&
                              errors.trEmail.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                        </div>

                        <h5>Address</h5>

                        <div className="row flex-md-row flex-column mb-3">
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="State"
                              {...register("state", {
                                required: true,
                              })}
                            />
                            {errors.state &&
                              errors.state.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="City"
                              {...register("city", {
                                required: true,
                              })}
                            />
                            {errors.city && errors.city.type === "required" && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="row flex-md-row flex-column mb-3">
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              Street
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Street"
                              {...register("street", {
                                required: true,
                              })}
                            />
                            {errors.street &&
                              errors.street.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                          <div className="col">
                            <label id="login_label" htmlFor="name">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              className="form-control login_input"
                              placeholder="Zip code"
                              {...register("zipCode", {
                                required: true,
                              })}
                            />
                            {errors.zipCode &&
                              errors.zipCode.type === "required" && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                          </div>
                        </div>

                        <div className="">
                          <button
                            type="submit"
                            // id="profile_btn"
                            className="button-common"
                          >
                            {choseTeacher ? "Edit" : "Creat"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.{" "}
                  </p>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>

      {/* {teachers?.length > 0 ? (
        <Title
          src={iconsImgs.profile}
          title={"List Of Teachers"}
          subTitle={
            "Total Teacher Available In Your System"
          }
        />
      ) : null} */}
      {/* 
      {teachers &&
        teachers.map((val) => {
          return (
            <div className="row  doctorRow" key={val._id} ref={scrollRef}>
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
                        <h3>Mr.{val.trName}</h3>
                        <h5>{val.subjectSpecialist}</h5>
                        <div
                          className="docLine"
                          style={{ position: "absolute", height: "4px" }}
                        ></div>
                      </div>

                      <div className=" docSpan">
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.phone}
                            alt=""
                          />
                          <span> {val.trPhoneNumber}</span>
                        </p>
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.mail}
                            alt=""
                          />
                          <span> {val.trEmail}</span>
                        </p>
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.location}
                            alt=""
                          />
                          <span>
                            {val.street} {val.city} {val.state} {val.zipCode}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-3">
                        <button
                          to="#form"
                          onClick={() => editTeacherProfile(val._id)}
                          className="doc_btn"
                          style={{ marginTop: "5px" }}
                        >
                          Edit
                        </button>
                        <button
                          to="#form"
                          onClick={() => deleteTeacherProfile(val._id)}
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
                      <img
                        className="doctorImg"
                        src={`${ImgURL}${val?.pdf}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}
    </div>
  );
};

export default AddTeacher;

function CustomHeader() {
  return (
    <div>
      <h1>Employee Data</h1>
    </div>
  );
}
