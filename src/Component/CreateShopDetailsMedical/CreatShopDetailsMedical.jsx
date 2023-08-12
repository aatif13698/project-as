import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getShopData, getUserData } from "../Action";
import { iconsImgs } from "../../utils/images";

import {
  getInstituteProfile,
  getShopProfile,
  getUser,
  uploadProfile,
  uploadshopProfile,
} from "../ApiCalling/api";
import shopImg from "../Assets/Images/medicalShopDemo3.png";
import "./CreatShopDetailsMedical.css";
import { Country, State, City } from "country-state-city";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import Select from "react-dropdown-select";
import { options } from "../data/data";
import activeLinkContext from "../context/activeLinkContext";
import dayjs from "dayjs";

const CreatShopDetailsMedical = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [shopExist, setShopExist] = useState(false);
  const [edit, setEdit] = useState(false);
  const [timeValue, setTimeValue] = useState(dayjs("2022-04-17T15:30"));

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );

  const shop = useSelector((state) => state?.getShopDetailsM?.shopDataM);
  const { setActiveLink } = useContext(activeLinkContext);

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  // count / state / city management start

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

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
    setValue("country", selected[0]?.name);
  };

  const handleStateChange = (selected) => {
    setState(selected[0]);
    setValue("state", selected[0]?.name);
  };

  const handleCityChange = (selected) => {
    setCity(selected[0]);
    setValue("city", selected[0]?.name);
  };

  const handleDoctorCategories = (selected) => {
    // console.log("doctor", selected);

    setValue("doctorCategories", selected);
  };

  // console.log("countryData", country);
  // console.log("stateData", stateData);
  // console.log("cityData", cityData);
  // console.log("country", country);
  // console.log("state", state);
  // console.log("city", city);

  // count / state / city management end

  const dispatch = useDispatch();

  function onSubmit(data) {
    const {
      aboutShop,
      city,
      email3,
      ownerName,
      phoneNumber,
      shopName,
      shopTime,
      state,
      country,
      street,
      totalDoctor,
      zipCode,
      doctorCategories,
    } = data;

    const doctorCategories1 = JSON.stringify(doctorCategories);

    // console.log("12", data);
    // console.log("13", doctorCategories);
    // console.log("14", country);
    // console.log("15", state);
    // console.log("16", city);

    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("email", email);
    formData.append("email3", email3);
    formData.append("ownerName", ownerName);
    formData.append("shopName", shopName);
    formData.append("aboutShop", aboutShop);
    formData.append("phoneNumber", phoneNumber);
    formData.append("totalDoctor", totalDoctor);
    formData.append("shopTime", shopTime);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipCode", zipCode);
    formData.append("doctorCategories", doctorCategories1);

    // console.log("data", formData);
    uploadshopProfile(formData, uploadShopProfileCallback);
  }

  function uploadShopProfileCallback() {
    reset();
    setPostImage(null);
    setShopExist(true);
    // getUser(getData);
    getShopProfile(getShopProfileCallBack);
  }

  function getShopProfileCallBack(data) {
    dispatch(getShopData(data));
  }

  // function getData(data) {
  //   dispatch(getUserData(data));
  // }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const fileView = URL.createObjectURL(e.target.files[0]);

    setSelectedImage(file);

    setPostImage(fileView);
  };

  function editShopProfile() {
    setShopExist(false);
    setEdit(true);
    setTimeValue(shop?.shopTime);

    setValue("ownerName", shop?.ownerName);
    setValue("shopName", shop?.shopName);
    setValue("shopTime", shop?.shopTime);
    setValue("aboutShop", shop?.aboutShop);
    setValue("totalDoctor", shop?.totalDoctor);
    setValue("phoneNumber", shop?.phone);
    setValue("country", shop?.country);
    setValue("street", shop?.street);
    setValue("city", shop?.city);
    setValue("state", shop?.state);
    setValue("zipCode", shop?.zipCode);
    setValue("email3", shop?.email3);
    // setCity(shop?.city)
    setValue("doctorCategories", shop?.doctorCategories);
  }

  function formateToTimeString(dateString) {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  useEffect(() => {
    if (shop) {
      setShopExist(true);
    } else {
      setShopExist(false);
    }
  }, [shop]);

  useEffect(() => {
    setActiveLink(5);
  }, []);

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      {shopExist ? (
        <>
          <div
            className="row "
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
          >
            <div
              className="col-md-6 col-12 docHead "
              style={{ marginBottom: "0px" }}
            >
              <h3 className="text-center">Shop Card</h3>
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
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={400}
              >
                <div
                  className=" col-12  py-md-0 py-3 "
                  id="shopBackground"
                  style={{
                    backgroundImage: `url('http://localhost:8080/userImages/${shop?.pdf}')`,
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
                      src={`http://localhost:8080/userImages/${user?.pdf}`}
                      // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1686779814~exp=1686780414~hmac=8eaa3044bc5a8a986d5b2e1eefd2ef9e3894822142aa0df3727bc1201f8e1a85"
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
                      <h3>{shop?.shopName}</h3>
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
                          {shop?.street} {shop?.city} {shop?.state}{" "}
                          {shop?.zipCode}
                        </span>
                      </p>
                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.phone}
                          alt=""
                        />{" "}
                        {shop?.phone}
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.mail}
                          alt=""
                        />{" "}
                        {shop?.email3}
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.time}
                          alt=""
                        />{" "}
                        {formateToTimeString(shop?.shopTime)}
                      </p>

                      <p style={{ marginBottom: "3px" }}>
                        <img
                          className="profileIcon1"
                          src={iconsImgs.doctor1}
                          alt=""
                        />{" "}
                        Total {shop?.totalDoctor} Doctors Available
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
                        <span>{shop?.aboutShop}</span>{" "}
                      </h5>
                    </div>

                    <div>
                      <button
                        onClick={editShopProfile}
                        className="btn btn-success"
                        id="profileEdit"
                      >
                        Edit Shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="row my-3"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
          >
            <h4 className="text-center">Hello {name}..</h4>
            <h6 className="text-center">
              Please Create your Shop profile. We need the following
              information.
            </h6>
          </div>

          <div
            className="row justify-content-center align-items-center mx-md-2"
            style={{ margin: "0px" }}
          >
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay={400}
              className="col-12   col-md-7"
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
                        className="shopImage"
                        src={`${postImage ? postImage : shopImg}`}
                        alt=""
                        style={{}}
                      />
                    </label>

                    <p style={{ marginTop: "15px" }}>
                      Click on Image and select Shop Image
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
                </div>

                <h5>Shop Details</h5>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    <label id="login_label" htmlFor="firstName">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="Owner Name"
                      {...register("ownerName", {
                        required: true,
                      })}
                    />
                    {errors.ownerName &&
                      errors.ownerName.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div className="col">
                    <label id="login_label" htmlFor="name">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="Shop Name"
                      {...register("shopName", {
                        required: true,
                      })}
                    />
                    {errors.shopName && errors.shopName.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    {/* <label id="login_label" htmlFor="firstName">
                      Shop Timming
                    </label> */}
                    {/* <input
                      type="text"
                      className="form-control login_input"
                      placeholder="from ___ to ___"
                      {...register("shopTime", {
                        required: true,
                      })}
                    />
                    {errors.shopTime && errors.shopTime.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )} */}

                    <Controller
                      name="shopTime"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <>
                          <label htmlFor="">Shop Timming</label>
                          <MobileTimePicker
                            // label="Controlled picker"
                            {...field}
                            value={timeValue}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            sx={{ width: "100%" }}
                          />

                          {errors.shopTime && (
                            <span className="text-danger">
                              {errors.shopTime.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="col">
                    <label id="login_label" htmlFor="name">
                      Total Doctors
                    </label>
                    <input
                      type="number"
                      className="form-control login_input"
                      placeholder="Number of Doctors Available"
                      {...register("totalDoctor", {
                        required: true,
                      })}
                    />
                    {errors.totalDoctor &&
                      errors.totalDoctor.type === "required" && (
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
                    <label id="login_label" htmlFor="email3">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control login_input"
                      placeholder="Enter Email"
                      {...register("email3", {
                        required: true,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Please enter a valid email.",
                        },
                      })}
                    />
                    {errors.email3 && errors.email3.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                    {errors.email3 && errors.email3.type === "pattern" && (
                      <span className="text-danger">
                        {errors.email3.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    {/* <label id="login_label" htmlFor="name">
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
                    )} */}

                    <label htmlFor="">Country</label>
                    <Select
                      options={countryData}
                      value={country}
                      {...register("country", {
                        required: true,
                      })}
                      onChange={(selected) => handleCountryChange(selected)}
                      labelField="name"
                      valueField="isoCode"
                      searchable={true}
                      placeholder="Select Country Name"
                      style={{
                        borderRadius: "6px",
                        fontSize: "18px",
                        // color: "black",
                      }}
                    />
                    {errors.country && errors.country.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col">
                    {/* <label id="login_label" htmlFor="name">
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
                    )} */}

                    <label htmlFor="">State</label>
                    <Select
                      options={stateData}
                      value={state}
                      {...register("state", {
                        required: true,
                      })}
                      onChange={(selected) => handleStateChange(selected)}
                      labelField="name"
                      valueField="isoCode"
                      placeholder="Select State Name"
                      style={{
                        borderRadius: "6px",
                        fontSize: "18px",
                      }}
                    />
                    {errors.state && errors.state.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col">
                    {/* <label id="login_label" htmlFor="name">
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
                      <span className="text-danger">
                        This field is required
                      </span>
                    )} */}

                    <label htmlFor="">City</label>
                    <Select
                      options={cityData}
                      value={city}
                      {...register("city", {
                        required: true,
                      })}
                      onChange={(selected) => handleCityChange(selected)}
                      labelField="name"
                      valueField="name"
                      placeholder="Select Citry Name"
                      style={{
                        borderRadius: "6px",
                        fontSize: "18px",
                      }}
                    />
                    {errors.city && errors.city.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col">
                    {/* <label id="login_label" htmlFor="name">
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
                    )} */}

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
                </div>

                <div className="row flex-md-row flex-column mb-3">
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
                  <div className="col d-flex flex-column">
                    <label htmlFor="">Categories</label>
                    <Select
                      options={options}
                      multi
                      placeholder="Select Doctors"
                      style={{
                        borderRadius: "6px",
                        fontSize: "20px",
                        color: "black",
                      }}
                      {...register("doctorCategories", {
                        required: true,
                      })}
                      onChange={(selected) => handleDoctorCategories(selected)}
                    />
                  </div>
                </div>
                <div
                  className="row flex-md-row flex-column mb-3"
                  style={{ margin: "0px" }}
                >
                  <label htmlFor="aboutShop">About Shop:</label>
                  <textarea
                    id="about"
                    name="aboutShop"
                    placeholder="Enter between 20 to 30 words...."
                    rows="4"
                    cols="45"
                    {...register("aboutShop", {
                      required: true,
                    })}
                  ></textarea>
                  {errors.aboutShop && errors.aboutShop.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    id="profile_btn"
                    className="btn btn-block "
                  >
                    {edit ? "Edit " : "Creat"}
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

export default CreatShopDetailsMedical;
