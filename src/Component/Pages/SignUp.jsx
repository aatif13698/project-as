import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../ApiCalling/api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import image from "../Assets/Images/imageLoginSignUp.jpg";
import "./SignUp.css";

import jwt_decode from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [googleVerified, setGoogleVerified] = useState(false);

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

  //  submit function
  function onSubmit(data) {
    const datas = { ...data, googleVerified: googleVerified };
    console.log("datasignUp", datas);
    signUpUser(datas, reset, signUpCallBack, setDisable, setGoogleVerified);
  }

  // callBack
  function signUpCallBack(email, token, errorCode) {
    setGoogleVerified(false);

    if (errorCode == 401 || errorCode == 200) {
      navigate(`/ConfirmMail/${email}/${token}`);
    } else if (errorCode == 201) {
      navigate("/login");
    }
  }

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    const { email, name } = userObject;

    // console.log("email", email);
    // console.log("name", name);
    // console.log("email_verified", email_verified);

    setValue("name", name);
    setValue("email", email);
    setDisable(true);
    setGoogleVerified(true);
  };

  const loginStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div
        className="container-fluid  signUp_Container"
        style={{ height: "100vh", margin: "0px", padding: "0px" }}
      >
        <div className="row login_row  flex-column flex-md-row ">
          <div className="col login_image" style={loginStyle}>
            {/* <img
              className=" rounded-1 login_img_1"
              src="https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg?format=1500w"
              alt=""
            /> */}
          </div>
          <div className="col d-flex flex-column align-items-center justify-content-center form_container ">
            <h4
              className="text-center pt-4"
              style={{ color: "white", fontSize: "30px" }}
            >
              Creact Account K@Ta3033#
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", color: "white", padding: "20px 12px" }}
            >
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={800}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Name should be at least 4 characters long",
                    },
                  })}
                  disabled={disable}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}

                {errors.name && errors.name.type === "minLength" && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1000}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="text"
                  className="form-control login_input"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Please enter a valid email.",
                    },
                  })}
                  disabled={disable}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1200}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="email">
                  Create Password
                </label>
                <input
                  type="password"
                  className="form-control login_input"
                  placeholder="Create Password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value:
                        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                      message:
                        "(UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)",
                    },
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}

                {errors.password && errors.password.type === "pattern" && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1400}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="email">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control login_input"
                  placeholder="Confirm Password"
                  {...register("Confirm_password", {
                    required: true,
                    validate: (value) =>
                      value == getValues("password") || "Password does't match",
                  })}
                />
                {errors.Confirm_password &&
                  errors.Confirm_password.type === "required" && (
                    <span className="text-danger">This field is required</span>
                  )}

                {errors.Confirm_password && (
                  <span className="text-danger">
                    {errors.Confirm_password.message}
                  </span>
                )}
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1400}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="userType">
                  Select User Type
                </label>
                <select
                  className="form-control"
                  id="state"
                  {...register("userType", { required: true })}
                >
                  <option value="">--- Select one ---</option>
                  <option value="medicalOwner">Medical Owner</option>
                  <option value="instituteOwner">Private Coaching</option>
                  <option value="instituteOwner">Private School</option>
                  <option value="shopOwne">Shop Owner</option>
                  <option value="viewer">Viewner</option>
                </select>
                {errors.userType && errors.userType.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1600}
                className="form-check mb-1"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  {...register("tc", { required: true })}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree to{" "}
                  <a style={{ textDecoration: "none", color: "bule" }} href="">
                    Term of use
                  </a>{" "}
                  &{" "}
                  <a style={{ textDecoration: "none", color: "bule" }} href="">
                    Privacy policy{" "}
                  </a>
                </label>{" "}
                <br />
                {errors.tc && errors.tc.type === "required" && (
                  <span className="text-danger">
                    Please accept the terms before proceeding
                  </span>
                )}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1800}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className=" mb-3 mt-1"
              >
                <button
                  type="submit"
                  // id="signUp_btn"
                  // style={{
                  //   background: "white",
                  //   boxShadow: "2px 6px 21px rgba(0,0,0, 0.2)",
                  //   padding: "10px 50px",
                  //   fontSize: "15px",
                  //   borderRadius: "20px",
                  // }}
                  className="signUp_btn"
                >
                  Sign up
                </button>
              </div>

              <div
                // data-aos="fade-left"
                // data-aos-duration="500"
                // data-aos-delay={1800}
                className="d-grid mb-4 mt-1"
              >
                <GoogleOAuthProvider clientId="944068588309-gf8q6p01pfrs3h83nk0rei52h02ojq0u.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    text="signup_with"
                    logo_alignment="center"
                    // buttonText="Sign Up with Google"
                    // style={{ backgroundColor: "black", color: "white" }}
                  />
                </GoogleOAuthProvider>
              </div>

              <div className="text-center mt-1">
                <p>
                  Do you already have an account?{" "}
                  <Link
                    style={{ textDecoration: "none", color: "blue" }}
                    to="/login"
                  >
                    Log in
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
