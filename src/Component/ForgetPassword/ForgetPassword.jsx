import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import image from "../Assets/Images/imageLoginSignUp.jpg";
import { sendforgetPasswordMail } from "../ApiCalling/api";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { callProgress, removeProgress } from "../Action";

const ForgetPassword = () => {

  const navigate = useNavigate();
  const progress = useSelector((state) => state?.progress?.progress);
  const dispatch = useDispatch()
  

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    dispatch(callProgress(1));
    sendforgetPasswordMail(data, forgetPasswordCallback);
  }

  function forgetPasswordCallback(errorCode, message, email) {
    dispatch(removeProgress(0));
    switch (errorCode) {
      case 200:
        toast.success(message);
        navigate(`/resetPassword/${email}`);
        break;
      case 500:
        toast.error(message);
        reset();
        break;
      case 404:
        toast.warning(message);
        navigate("/signUp");
        break;
    }

    // navigate("")
  }

  const loginStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position:"relative"
  };

  return (
    <>
      <div
        className="container-fluid  signUp_Container"
        style={{ height: "100vh", margin: "0px", padding: "0px" }}
      >
        <div className="row login_row  flex-column flex-md-row ">
          <div className="col login_image" style={loginStyle}>
            <div
              className={` d-flex flex-column justify-content-center align-items-center mb-5 ${
                progress == 0 ? "d-none" : 
                "d-block"
              } `}
              style={{ position: "absolute", top: "35%", left:"40%" }}
            >
              <Loader />
              <span style={{ color: "black", margin: "30px 0px" }}>
                Sending...
              </span>
            </div>
          </div>
          <div className="col d-flex flex-column align-items-center justify-content-center form_container ">
            <h4
              className="text-center pt-3"
              style={{ color: "white", fontSize: "30px" }}
            >
              Forgot your password?
            </h4>
            <p className="text-center" style={{ fontSize: "15px" }}>
              Enter your email below and we will send a message to reset your
              password
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", color: "white", padding: "20px 12px" }}
            >
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay={600}
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
                data-aos-delay={1000}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className=" mb-3 mt-1"
              >
                <button type="submit" className="signUp_btn">
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
