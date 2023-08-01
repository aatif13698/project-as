import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadProfile } from "../ApiCalling/api";
import { getUserData } from "../Action";
import avatar from "../Assets/Images/profile.png";
import "./CreatProfileForMedical.css";

const CreactProfileForMedical = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [profileExist, setProfileExist] = useState(false);

  const email = useSelector(
    (state) => state?.getUserData?.userData?.user?.email
  );
  const profile = useSelector(
    (state) => state?.getUserData?.userData?.user?.pdf
  );

  const user = useSelector((state) => state?.getUserData?.userData?.user);

  // const { firstName, lastName, city, street, state, zipCode, about, phone } =
  //   user;

  console.log("profile", profile);
  console.log("user", user);
  console.log("existProfile", profileExist);

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
    // console.log(data, "11");
    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("email", email);
    formData.append("email2", email2);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("about", about);
    formData.append("phoneNumber", phoneNumber);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    // console.log("data", formData);
    uploadProfile(formData, uploadProfileCallback);
  }

  function uploadProfileCallback() {
    reset();
    setPostImage(null);
    setProfileExist(true);
    getUser(getData);
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

    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("about", user?.about);
    setValue("phoneNumber", user?.phone);
    setValue("street", user?.street);
    setValue("city", user?.city);
    setValue("state", user?.state);
    setValue("zipCode", user?.zipCode);
    setValue("email2", user?.email2);
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

  return (
    <div className="container-fluid">
      {profileExist ? (
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
          <div className="row mx-md-5 " id="profileContainer" >
            <div className="col-12" style={{ padding: "24px 12px" }} >
              <div
                className="row "
                style={{ height: "100%" }}
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={400}
              >
                <div className=" col-12 col-md-5 py-md-0 py-3 d-flex justify-content-center align-items-center">
                  <img
                    id="profileImage"
                    src={`http://localhost:8080/userImages/${user.pdf}`}
                    // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1686779814~exp=1686780414~hmac=8eaa3044bc5a8a986d5b2e1eefd2ef9e3894822142aa0df3727bc1201f8e1a85"
                    alt="profile image"
                  />
                </div>

                <div
                  className="col-12 col-md-7 d-flex align-items-center "
                  id="profileText"
                >
                  <div>
                    <div>
                      <h4 className="my-3">Personal informations..</h4>
                    </div>

                    <div style={{ margin: "18px 0px" }}>
                      <p>
                        Name : {user?.firstName} {user?.lastName}
                      </p>
                      <p>About : {user.about}</p>
                      <p>Email : {user?.email}</p>
                      <p>Cell Phone : {user?.phone}</p>
                      <div>
                        <p>
                          Address : {user?.street} {user?.city} {user?.state}{" "}
                          {user?.zipCode}
                        </p>
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
        </>
      ) : (
        <>
          <div
            className="row"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay={200}
          >
            <h4 className="text-center">Hello {name}..</h4>
            <h6 className="text-center">
              Please Create your profile. We need the following information.
            </h6>
          </div>

          <div className="row justify-content-center align-items-center mx-2">
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

                    <p style={{ marginTop: "10px" }}>Select Profile Image</p>

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

                <h5>Personal Details</h5>

                <div
                  // data-aos="fade-left"
                  // data-aos-duration="500"
                  // data-aos-delay={800}
                  className="row flex-md-row flex-column mb-3"
                >
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

                <div
                  // data-aos="fade-left"
                  // data-aos-duration="500"
                  // data-aos-delay={1000}
                  className="row flex-md-row flex-column mb-3"
                >
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
                      })}
                    />
                    {errors.email2 && errors.email2.type === "required" && (
                      <span className="text-danger">
                        This field is required
                      </span>
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

export default CreactProfileForMedical;
