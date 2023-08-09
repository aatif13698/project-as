import React, { useContext, useEffect, useRef, useState } from "react";
import "./AddDoctor.css";
import { iconsImgs } from "../../utils/images";
import activeLinkContext from "../context/activeLinkContext";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import avatar from "../Assets/Images/profile.png";
import {
  addDoctorProfile,
  deleteParticularDoctor,
  getAllDoctosOfParticularMedical,
  getProfileData,
  getUser,
} from "../ApiCalling/api";
import { getDoctorList, getUserData, getUserProfile } from "../Action";
import ImgURL from "../Common/imageUrl";
import DSelec from "react-dropdown-select";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

// import {Select as dSelect }from "react-dropdown-select";

import { dayOption } from "../data/data";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Country, State, City } from "country-state-city";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const AddDoctor = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [choseDoctor, setChoseDoctor] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  const scrollRef = useRef();

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );
  const profile = useSelector((state) => state?.getUserProfile?.userProfile);
  const user = useSelector((state) => state?.getUserData?.userData?.user);
  const doctors = useSelector(
    (state) => state?.getAllDoctorsProfile?.doctorsList
  );

  // console.log("choseDoctor", choseDoctor);
  // console.log("docId", doctorId);
  console.log("doctor", doctors);

  const { setActiveLink } = useContext(activeLinkContext);

  // country / state / city
  let countryData = Country.getAllCountries();
  // console.log("country data",countryData);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [timeValue, setTimeValue] = useState(dayjs("2022-04-17T15:30"));


  const [country, setCountry] = useState(countryData[100]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  // console.log("country data", country);
  // console.log("state data", stateData);
  // console.log("city data", cityData);

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  // select
  const handleCountryChange = (selected) => {
    setCountry(selected[0]);
    // setValue("country", selected[0]?.name);
  };

  const handleStateChange = (selected) => {
    setState(selected[0]);
    // setValue("state", selected[0]?.name);
  };

  const handleCityChange = (selected) => {
    setCity(selected[0]);
    // setValue("city", selected[0]?.name);
  };

  // country / state / city

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    const {
      aboutDr,
      drEmail,
      drExperience,
      drPhoneNumber,
      drQualification,
      drSpecialist,
      drName,
      street,
      city,
      state,
      zipCode,
      day,
      time,
    } = data;
    console.log(data, "11");

    const arr = JSON.stringify(day);
    const arr2 = JSON.stringify(state);
    const arr3 = JSON.stringify(city);

    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("email", email);
    formData.append("drEmail", drEmail);
    formData.append("drName", drName);
    formData.append("drExperience", drExperience);
    formData.append("aboutDr", aboutDr);
    formData.append("drPhoneNumber", drPhoneNumber);
    formData.append("street", street);
    formData.append("city", arr3);
    formData.append("state", arr2);
    formData.append("zipCode", zipCode);
    formData.append("drQualification", drQualification);
    formData.append("drSpecialist", drSpecialist);
    formData.append("day", arr);
    formData.append("time", time);
    // console.log("data", formData);

    if (choseDoctor) {
      const doctorEdit = "true";
      formData.append("doctorEdit", doctorEdit);
      formData.append("doctorId", doctorId);
    } else {
      const doctorEdit = "false";
      formData.append("doctorEdit", doctorEdit);
      formData.append("doctorId", "empty");
    }

    addDoctorProfile(formData, doctorProfileCallback);
  }

  function doctorProfileCallback() {
    reset();
    setPostImage(null);
    getUser(getData);
    getAllDoctosOfParticularMedical(getAllDoctorsCallback);
    setChoseDoctor(false);
  }

  function getData(data) {
    dispatch(getUserData(data));
  }

  function getAllDoctorsCallback(data) {
    // setDoctorsList(data);
    dispatch(getDoctorList(data));
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const fileView = URL.createObjectURL(e.target.files[0]);

    setSelectedImage(file);

    setPostImage(fileView);
  };

  // edit doctor

  function editDoctorProfile(ID) {
    setDoctorId(ID);
    const doctor = doctors?.find((val) => val._id == ID);
    setValue("aboutDr", doctor?.aboutDr);
    setValue("drExperience", doctor?.drExperience);
    setValue("drName", doctor?.drName);
    setValue("drPhoneNumber", doctor?.drPhoneNumber);
    setValue("street", doctor?.street);
    setValue("city", doctor?.city);
    setValue("state", doctor?.state);
    setValue("zipCode", doctor?.zipCode);
    setValue("drEmail", doctor?.drEmail);
    setValue("drQualification", doctor?.drQualification);
    setValue("drSpecialist", doctor?.drSpecialist);
    setValue("drEmail", doctor?.drEmail);
    setValue("day", doctor?.day);
    setValue("time",doctor?.time )

    setChoseDoctor(true);
    setTimeValue(doctor?.time)

    scrollToSection("form");
  }

  // delete doctor

  function deleteDoctorProfile(ID) {
    const data = { ID: ID, email: email };

    deleteParticularDoctor(data, deleteParticularDocCallback);
  }

  function deleteParticularDocCallback() {
    console.log("ho raha");

    getAllDoctosOfParticularMedical(getAllDoctorsCallback);
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
  }, [doctors]);

  return (
    <div className="container-fluid " style={{ padding: "0px" }}>
      <div
        className="row justify-content-center"
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay={200}
      >
        <div className="col-md-10 col-12 docHead" >
          {/* <h4 className="text-center">Hello {name}..</h4> */}
          <h6 className="text-center">
            Please Fill The Form To Create Card For Doctors Available In your
            Pharmacy. You Can Add Any Number Of Doctors And Can Manage To Edit
            And Delete The Doctor Card As Per The Requirement.
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
                <label htmlFor="about">About Dr :</label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Enter between 20 to 30 words...."
                  rows="4"
                  cols="45"
                  {...register("aboutDr", {
                    required: true,
                  })}
                ></textarea>
                {errors.aboutDr && errors.aboutDr.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <h5>Doctor Details</h5>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={800}
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
                <label id="login_label" htmlFor="firstName">
                  Dr. Name
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Doctor Name"
                  {...register("drName", {
                    required: true,
                  })}
                />
                {errors.drName && errors.drName.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  Specialist
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Specialist In"
                  {...register("drSpecialist", {
                    required: true,
                  })}
                />
                {errors.drSpecialist &&
                  errors.drSpecialist.type === "required" && (
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
                  Dr. Qualification
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Dr Qualification"
                  {...register("drQualification", {
                    required: true,
                  })}
                />
                {errors.drQualification &&
                  errors.drQualification.type === "required" && (
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
                  {...register("drExperience", {
                    required: true,
                  })}
                />
                {errors.drExperience &&
                  errors.drExperience.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
              </div>
            </div>

            <div
             
              className="row flex-md-row flex-column mb-3"
            >
              <div className="col">
               
                <Controller
                  name="day"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Visiting Days
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        {...field}
                        value={field.value || []} 
                        onChange={(event) => field.onChange(event.target.value)} 
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                           
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.day && (
                        <span className="text-danger">
                          {errors.day.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col">
                

                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                      <label htmlFor="">Visiting Time</label>
                      <MobileTimePicker
                       
                        {...field}
                        value={timeValue}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        sx={{ width: "100%" }}
                      />

                      {errors.time && (
                        <span className="text-danger">
                          {errors.time.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div
              
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
                  {...register("drPhoneNumber", {
                    required: true,
                    pattern: {
                      value: /^[0-9]{10}$/i,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                />
                {errors.drPhoneNumber &&
                  errors.drPhoneNumber.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
                {errors.drPhoneNumber &&
                  errors.drPhoneNumber.type === "pattern" && (
                    <span className="text-danger">
                      {errors.drPhoneNumber.message}
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
                  {...register("drEmail", {
                    required: true,
                  })}
                />
                {errors.drEmail && errors.drEmail.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>

            <h5>Address</h5>

            <div className="row flex-md-row flex-column mb-3">
              <div className="col">
                <label id="login_label" htmlFor="name">
                  State
                </label>

                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                      <DSelec
                        options={stateData}
                        {...field}
                        values={field.value || []}
                       
                        onChange={(event) => {
                          field.onChange(event);
                          handleStateChange(event);
                        }}
                        labelField="name"
                        valueField="isoCode"
                        placeholder="Select State Name"
                        style={{
                          borderRadius: "6px",
                          fontSize: "18px",
                          width: "100%",
                         
                        }}
                      />

                      {errors.state && errors.state.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col">
                <label id="login_label" htmlFor="name">
                  City
                </label>

                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <>
                      <DSelec
                        options={cityData}
                        {...field}
                        values={field.value || []}
                        onChange={(event) => {
                          field.onChange(event);
                          handleCityChange(event);
                        }}
                        labelField="name"
                        valueField="name"
                        placeholder="Select City Name"
                        style={{
                          borderRadius: "6px",
                          fontSize: "18px",
                          width: "100%",
                          
                        }}
                      />

                      {errors.city && errors.city.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
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
                {errors.street && errors.street.type === "required" && (
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
                {choseDoctor ? "Edit" : "Creat"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {
        doctors?.length > 0 ? 
         <h3 className='text-center mb-5' style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>List Of Doctors You Added.

                         <div
                          className="docLine"
                          style={{ position: "absolute", height: "4px", top:"120%" , background:"linear-gradient(36deg, rgba(60,226,173,1) 0%, rgb(12 229 236) 52%)"}}
                        ></div>
         
         </h3> 
         :  null
       }

      {doctors &&
        doctors.map((val) => {
          return (
            <div  className="row  doctorRow" key={val._id} ref={scrollRef}>
              <div  className=" col-12 col-md-8" style={{ height: "100%" }}>
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
                        <h3>DR.{val.drName}</h3>
                        <h5 style={{color:"#363e3f99"}}>{val.drSpecialist}</h5>
                        <p>{val.day.length > 0 ? val.day[0] : null}</p>
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
                          <span> {val.drPhoneNumber}</span>
                        </p>
                        <p>
                          <img
                            className="docIcon"
                            src={iconsImgs.mail}
                            alt=""
                          />
                          <span> {val.drEmail}</span>
                        </p>
                        <p className="d-flex flex-row">
                          <img
                            className="docIcon"
                            src={iconsImgs.location}
                            alt=""
                          />
                          <span>
                            {val.street}

                            {val?.city?.length > 0 ? val?.city[0]?.name : null}
                            {val?.state?.length > 0 ? val.state[0].name : null}
                            {val?.zipCode}

                            {/* {val.city} {val.state} {val.zipCode} */}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-start align-items-center">
                        <button
                          to="#form"
                          onClick={() => editDoctorProfile(val._id)}
                          className="doc_btn"
                          style={{ marginTop: "5px" }}
                        >
                          Edit
                        </button>
                        <button
                          to="#form"
                          onClick={() => deleteDoctorProfile(val._id)}
                          className="doc_btn"
                          style={{ marginTop: "5px" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div  className="col-12 order-1 order-md-2 col-md-5 docCol2 d-flex justify-content-center align-items-center ">
                    <div  >
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
  );
};

export default AddDoctor;
