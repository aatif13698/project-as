import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, getUser, uploadProfile } from "../ApiCalling/api";
import { getUserData, getUserProfile } from "../Action";
import avatar from "../Assets/Images/profile.png";
import "./CreatProfileForMedical.css";
import activeLinkContext from "../context/activeLinkContext";
import { Country, State, City } from "country-state-city";
import Select from "react-dropdown-select";
import { iconsImgs } from "../../utils/images";
import Title from "../Common/Title/Title";

const CreactProfileForMedical = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [profileExist, setProfileExist] = useState(false);
  const [edit, setEdit] = useState(false);

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );
  const profile = useSelector((state) => state?.getUserProfile?.userProfile);
  console.log("profile",profile);

  const user = useSelector((state) => state?.getUserData?.userData?.user);
  const { setActiveLink } = useContext(activeLinkContext);

  // console.log("profile", profile);
  // console.log("user", user);
  // console.log("existProfile", profileExist);

  // country / state / city

  let countryData = Country.getAllCountries();
  // console.log("country data",countryData);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[100]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  console.log("country data", country);
  console.log("state data", stateData);
  console.log("city data", cityData);

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
      firstName,
      lastName,
      phoneNumber,
      email2,
      street,
      city,
      state,
      zipCode,
      about,
    } = data;

    const arr = JSON.stringify(state);
    const arr1 = JSON.stringify(city);

    console.log(data, "11");
    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("email", email);
    formData.append("email2", email2);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("about", about);
    formData.append("phoneNumber", phoneNumber);
    formData.append("street", street);
    formData.append("city", arr1);
    formData.append("state", arr);
    formData.append("zipCode", zipCode);
    // console.log("data", formData);
    uploadProfile(formData, uploadProfileCallback);
  }

  function uploadProfileCallback() {
    reset();
    setPostImage(null);
    setProfileExist(true);
    getUser(getData);
    getProfileData(getProfileCallBack);
  }

  function getData(data) {
    dispatch(getUserData(data));
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const fileView = URL.createObjectURL(e.target.files[0]);

    setSelectedImage(file);

    setPostImage(fileView);
  };

  function editProfile() {
    setProfileExist(false);
    setEdit(true);

    setValue("firstName", profile?.firstName);
    setValue("lastName", profile?.lastName);
    setValue("about", profile?.about);
    setValue("phoneNumber", profile?.phone);
    setValue("street", profile?.street);
    setValue("city", profile?.city);
    setValue("state", profile?.state);
    setValue("zipCode", profile?.zipCode);
    setValue("email2", profile?.email2);
    setState(profile?.state);
    
  }

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  useEffect(() => {
    if (profile) {
      setProfileExist(true);
    } else {
      setProfileExist(false);
    }
  }, [profile]);

  useEffect(() => {
    setActiveLink(9);
  }, []);

  // useEffect(()=>{

  //   getProfileData(getProfileCallBack)

  // },[])

  function getProfileCallBack(data) {
    dispatch(getUserProfile(data));
  }

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      {profileExist ? (
        <>
          {/* <div
            className="row "
            style={{ margin: "20px 0px" }}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
          >
            <h4 className="text-center">Hey {name}...</h4>
            <h5 className="text-center">Here is your profile details.</h5>
          </div> */}

          <Title src = {iconsImgs.profile} title = {"Your Profile"} subTitle = {"You Can Edit Profile."} />


          <div
            className=" row   justify-content-center"
            style={{ margin: "0px 12px" }}
          >
            <div
              className="col-md-8 col-12 mt-3 "
              style={{ padding: "0px", position: "relative" }}
            >
              <div
                className="profileStyleDiv"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  
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
                  className="col-md-5 col-12 imgCol1  d-flex justify-content-center align-items-center"
                >
                  <div className="profileImg1">
                    <img
                      className="img1"
                      src={`http://localhost:8080/userImages/${profile?.pdf}`}
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
                    <h3>
                      {profile?.firstName} {profile?.lastName}
                    </h3>
                    <p style={{ marginBottom: "3px" }}>
                      <img
                        className="profileIcon1"
                        src={iconsImgs.mail}
                        alt=""
                      />{" "}
                      {profile?.email2}
                    </p>
                    <p style={{ marginBottom: "3px" }}>
                      <img
                        className="profileIcon1"
                        src={iconsImgs.phone}
                        alt=""
                      />{" "}
                      {profile?.phone}
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
                      <span>
                        {profile?.street}{" "}
                        {profile?.city?.length > 0
                          ? profile.city[0].name
                          : null}{" "}
                        {profile?.zipCode}{" "}
                        {profile?.state?.length > 0
                          ? profile.state[0].name
                          : null}{" "}
                      </span>
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
                      <span>{profile.about}</span>{" "}
                    </h6>
                  </div>
                  <div>
                    <button
                      onClick={editProfile}
                      className="btn btn-success"
                      id="profileEdit"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mx-md-5 " style={{ justifyContent: "center" }}>
            <div className="col-12 col-md-8" id="profileContainer">
              <div className="row">
                <div className=" col-12" style={{ padding: "24px 12px" }}>
                  <div
                    className="row "
                    style={{ height: "100%" }}
                    data-aos="fade-left"
                    data-aos-duration="500"
                    data-aos-delay={400}
                  >
                    <div className="  col-12 col-md-5 py-md-0 py-3 d-flex justify-content-center align-items-center">
                      <div className="profileImgContainer">
                        <img
                          id="profileImage"
                          src={`http://localhost:8080/userImages/${profile?.pdf}`}
                          // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1686779814~exp=1686780414~hmac=8eaa3044bc5a8a986d5b2e1eefd2ef9e3894822142aa0df3727bc1201f8e1a85"
                          alt="profile image"
                        />
                      </div>
                    </div>

                    <div
                      className="col-12 col-md-7 d-flex align-items-center "
                      id="profileText"
                    >
                      <div className="d-flex justify-center align-items-center flex-column">
                        <div>
                          <h4 className="personalInfo my-3">
                            Personal Informations..
                          </h4>
                        </div>

                        <div
                          className="profileText"
                          style={{ margin: "18px 0px" }}
                        >
                          <span>
                            Name : {profile?.firstName} {profile?.lastName}
                          </span>
                          <p>About : {profile.about}</p>
                          <p>Email : {profile?.email2}</p>
                          <p>Cell Phone : {profile?.phone}</p>
                          <div>
                            <span>
                              Address : {profile?.street}{" "}
                              {profile?.city?.length > 0
                                ? profile.city[0].name
                                : null}
                              {profile?.state?.length > 0
                                ? profile.state[0].name
                                : null}
                              {profile?.zipCode}
                            </span>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={editProfile}
                            className="btn btn-success"
                            id="profileEdit"
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <>
          {/* <div
            className="row py-3"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
            style={{ background: "red" }}
          >
            <div className="col-md-2 col-12">
              <img
                 src={iconsImgs.profile}
                alt="" />
            </div>

            <div className="col-md-10 col-12">
              <h4 className="fw-bold text-uppercase">Create Profile</h4>
              <h6 className="">
                Fill The Details Below
              </h6>
            </div>
          </div> */}

          <Title src = {iconsImgs.profile} title = {"Create Profile"} subTitle = {"Fill The Details Below"} />

          <div className="row justify-content-center align-items-center  formStyle" style={{position:"relative"}}>
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

                    <p style={{ marginTop: "10px", marginBottom: "0px" }}>
                      Select Profile Image
                    </p>

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
                    <label htmlFor="about">About:</label>
                    <textarea
                      id="about"
                      name="about"
                      placeholder="Enter between 20 to 30 words...."
                      rows="4"
                      cols="45"
                      {...register("about", {
                        required: true,
                      })}
                    ></textarea>
                    {errors.about && errors.about.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <h5>USER INFORMATION</h5>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    <label id="login_label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName &&
                      errors.firstName.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div className="col">
                    <label id="login_label" htmlFor="name">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && errors.lastName.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    <label id="login_label" htmlFor="name">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control login_input"
                      placeholder="Phone Number"
                      {...register("phoneNumber", {
                        required: true,
                        pattern: {
                          value: /^[0-9]{10}$/i,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      })}
                    />
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "pattern" && (
                        <span className="text-danger">
                          {errors.phoneNumber.message}
                        </span>
                      )}
                  </div>
                  <div className="col">
                    <label id="login_label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="Enter Email"
                      {...register("email2", {
                        required: true,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Please enter a valid email.",
                        },
                      })}
                    />
                    {errors.email2 && errors.email2.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    {errors.email2 && errors.email2.type === "pattern" && (
                      <span className="text-danger">
                        {errors.email2.message}
                      </span>
                    )}
                  </div>
                </div>

                <h5>CONTACT INFORMATION</h5>

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
                          <Select
                            options={stateData}
                            {...field}
                            values={field.value || []}
                            // value={state || []}
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
                              // color: "black",
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
                          <Select
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
                              // color: "black",
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
                    {errors.zipCode && errors.zipCode.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    id="profile_btn"
                    className="btn btn-block "
                  >
                    {edit ? "Edit" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreactProfileForMedical;
