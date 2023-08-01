import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getShopData, getUserData } from "../Action";
import {
  getShopProfile,
  getUser,
  uploadProfile,
  uploadshopProfile,
} from "../ApiCalling/api";
import shopImg from "../Assets/Images/medicalShopDemo3.png";
import "./CreatShopDetailsMedical.css";

import Select from "react-dropdown-select";

const CreatShopDetailsMedical = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [shopExist, setShopExist] = useState(false);

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );

  const shop = useSelector((state) => state?.getShopDetailsM?.shopDataM);

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  const options = [
    {
      value: 1,
      label: "General practitioner",
    },
    {
      value: 2,
      label: "Pediatrician",
    },
    {
      value: 3,
      label: "Otorhinolaryngology",
    },
    {
      value: 4,
      label: "Neurologist",
    },
    {
      value: 5,
      label: "Radiologist",
    },
    {
      value: 6,
      label: "Internal medicine",
    },
    {
      value: 7,
      label: "Psychiatrist",
    },
    {
      value: 8,
      label: "Surgeon",
    },
    {
      value: 9,
      label: "Dermatologist",
    },
    {
      value: 10,
      label: "Cardiologist",
    },
    {
      value: 11,
      label: "Oncologist",
    },
    {
      value: 12,
      label: "Orthopedic surgeon",
    },
    {
      value: 13,
      label: "Anesthesiologist",
    },
    {
      value: 14,
      label: "Ophthalmology",
    },
    {
      value: 15,
      label: "Pathologist",
    },
    {
      value: 16,
      label: "Dentist",
    },
    {
      value: 17,
      label: "Pulmonologist",
    },
    {
      value: 18,
      label: "Gastroenterologist",
    },
    {
      value: 19,
      label: "Urologist",
    },
    {
      value: 20,
      label: "Geriatrics",
    },
    {
      value: 21,
      label: "Neurology",
    },
    {
      value: 22,
      label: "Rheumatologist",
    },
    
  ];

  // console.log("emailssss", email);
  // console.log("shop", shop);
  // console.log("shopExist", shopExist);
  // console.log("user", user);
  // console.log("existProfile", profileExist);

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
      aboutShop,
      city,
      email3,
      ownerName,
      phoneNumber,
      shopName,
      shopTime,
      state,
      street,
      totalDoctor,
      zipCode,
    } = data;
    console.log("12", data);

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
    formData.append("zipCode", zipCode);
    // console.log("data", formData);
    uploadshopProfile(formData, uploadShopProfileCallback);
  }

  function uploadShopProfileCallback() {
    reset();
    setPostImage(null);
    setShopExist(true);
    getUser(getData);
    getShopProfile(getShopProfileCallBack);
  }

  function getshop() {
    getShopProfile(getShopProfileCallBack);
  }

  function getShopProfileCallBack(data) {
    dispatch(getShopData(data));
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

  function editShopProfile() {
    setShopExist(false);

    setValue("ownerName", shop?.ownerName);
    setValue("shopName", shop?.shopName);
    setValue("shopTime", shop?.shopTime);
    setValue("aboutShop", shop?.aboutShop);
    setValue("totalDoctor", shop?.totalDoctor);
    setValue("phoneNumber", shop?.phone);
    setValue("street", shop?.street);
    setValue("city", shop?.city);
    setValue("state", shop?.state);
    setValue("zipCode", shop?.zipCode);
    setValue("email3", shop?.email3);
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

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      {shopExist ? (
        <>
          <div
            className="row"
            style={{ margin: "20px 0px" }}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
          >
            <h4 className="text-center">Hey {name}...</h4>
            <h5 className="text-center">Here is your profile details.</h5>
          </div>
          <div
            className="row mx-md-5 "
            id="ShopProfileContainer"
            style={{ margin: "16px 0px" }}
          >
            <div className="col-12" style={{ padding: "0px 12px 20px 12px" }}>
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
                    <div>
                      <h4 className="my-3">Shop informations..</h4>
                    </div>

                    <div style={{ margin: "18px 0px" }}>
                      <p>Owner Name : {shop?.ownerName}</p>
                      <p>About Shop : {shop?.aboutShop}</p>
                      <p>Email : {shop?.email3}</p>
                      <p>Contact : {shop?.phone}</p>
                      <p>Timming : {shop?.shopTime}</p>
                      <p>Total Doctors : {shop?.totalDoctor}</p>
                      <p>Contact : {shop?.phone}</p>
                      <div>
                        <p>
                          Address : {shop?.street} {shop?.city} {shop?.state}{" "}
                          {shop?.zipCode}
                        </p>
                      </div>
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

          <div className="row justify-content-center align-items-center mx-md-2">
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay={400}
              className="col-12   col-md-10"
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
                    <label id="login_label" htmlFor="firstName">
                      Shop Timming
                    </label>
                    <input
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
                    )}
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
                      })}
                    />
                    {errors.email3 && errors.email3.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="row flex-md-row flex-column mb-3">
                  <div className="col d-flex flex-column">
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
                    {errors.aboutShop &&
                      errors.aboutShop.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div style={{margin:"12px 0px"}}>
                    <Select options={options} multi placeholder="Select Doctors" style={{ borderRadius:"6px", fontSize:"20px", color:"black"}} />
                  </div>
                </div>

                <h5>Shop Address</h5>

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
                    Create
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
