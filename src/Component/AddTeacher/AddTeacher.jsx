import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import activeLinkContext from '../context/activeLinkContext';
import { useForm } from 'react-hook-form';
import { addTeacherProfile, deleteParticularTeacher, getAllTeachersOfParticularInstitute, getUser } from '../ApiCalling/api';
import { getTeacherList, getUserData } from '../Action';
import avatar from "../Assets/Images/profile.png";
import { iconsImgs } from "../../utils/images";
import ImgURL from "../Common/imageUrl";



const AddTeacher = () => {

    const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [choseTeacher, setChoseTeacher] = useState(false);
  const [teacherId, setTeacherId] = useState("");


  const scrollRef = useRef()

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );
//   const profile = useSelector((state) => state?.getUserProfile?.userProfile);

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const teachers = useSelector(
    (state) => state?.getAllTeachersProfile?.teachersList
  );

  

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
    setSelectedImage("")
  }

  function teacherProfileCallback() {
    reset();
    setPostImage(null);
    getUser(getData);
    getAllTeachersOfParticularInstitute(getAllTeachersCallback)
    setChoseTeacher(false)

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


    setChoseTeacher(true)
    scrollToSection("form");
  }

  // delete doctor

  function deleteTeacherProfile(ID) {

    const data = { ID: ID, email: email };

    deleteParticularTeacher(data, deleteParticularTecCallback);
  }

  function deleteParticularTecCallback() {
    console.log("ho raha");

    getAllTeachersOfParticularInstitute(getAllTeachersCallback)
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




  return (
    <div className="container-fluid " style={{padding:"0px"}}>
      <div
        className="row justify-content-center" 
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay={200}
      >
        <div className="col-md-10 col-12">
          <h4 className="text-center">Hello {name}..</h4>
          <h6 className="text-center">
            Please Fill The Form To Create Card For Teachers Available In your
            Institute. You Can Add Any Number Of Teachers And Can Manage To Edit
            And Delete The Teacher Card As Per The Requirement.
          </h6>
        </div>
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

                <p style={{ marginTop: "10px" }}>Select Dr. Image</p>

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
                  placeholder="Enter between 20 to 30 words...."
                  rows="4"
                  cols="45"
                  {...register("aboutTr", {
                    required: true,
                  })}
                ></textarea>
                {errors.aboutTr && errors.aboutTr.type === "required" && (
                  <span className="text-danger">This field is required</span>
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
                {errors.TrName && errors.TrName.type === "required" && (
                  <span className="text-danger">This field is required</span>
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
                    <span className="text-danger">This field is required</span>
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
                    <span className="text-danger">This field is required</span>
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
                    <span className="text-danger">This field is required</span>
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
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                />
                {errors.trPhoneNumber &&
                  errors.trPhoneNumber.type === "required" && (
                    <span className="text-danger">This field is required</span>
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
                {errors.trEmail && errors.trEmail.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <h5>Address</h5>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={1200}
              className="row flex-md-row flex-column mb-3"
            >
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
                {errors.street && errors.street.type === "required" && (
                  <span className="text-danger">This field is required</span>
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
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={1400}
              className="row flex-md-row flex-column mb-3"
            >
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
                {errors.state && errors.state.type === "required" && (
                  <span className="text-danger">This field is required</span>
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
                {errors.zipCode && errors.zipCode.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" id="profile_btn" className="btn btn-block ">
                {choseTeacher ? "Edit" : "Creat"} 
              </button>
            </div>
          </form>
        </div>
      </div>

      {
        teachers?.length > 0 ? 
         <h3 className='text-center mb-5' style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>List Of Teachers You Added.

                         <div
                          className="docLine"
                          style={{ position: "absolute", height: "4px", top:"120%" , background:"linear-gradient(36deg, rgba(60,226,173,1) 0%, rgb(12 229 236) 52%)"}}
                        ></div>
         
         </h3> 
         :  null
       }

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
        })}
    </div>
  )
}

export default AddTeacher
