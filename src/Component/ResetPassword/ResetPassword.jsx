import React from "react";
import { useForm } from "react-hook-form";
import image from "../Assets/Images/imageLoginSignUp.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { restPassword } from "../ApiCalling/api";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const params = useParams();
    const navigate = useNavigate()

    const email = params.email;


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
    const datas = {...data, email:email}
    restPassword(datas, resetCallback)

    console.log("reser", datas);

  }

  function resetCallback(errorCode, message){

    if(errorCode == 200){

        toast.success(message);
        navigate('/login')

    }else if( errorCode == 404){

        toast.error(message)
        navigate('/signUp')

    }else if(errorCode == 500){

        toast.error(message);
        reset()

    }

  }

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
          <div className="col login_image" style={loginStyle}></div>
          <div className="col d-flex flex-column align-items-center justify-content-center form_container ">
            <h4
              className="text-center pt-4"
              style={{ color: "white", fontSize: "30px" }}
            >
             Reset Password K@Ta3033#
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", color: "white", padding: "20px 12px" }}
            >
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
                  value={email}
                  disabled="true"
                />
                
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1200}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="email">
                  Enter OTP
                </label>
                <input
                  type="number"
                  className="form-control login_input"
                  placeholder="Enter OTP"
                  {...register("otp", {
                    required: true,
                    minLength: {
                      value: 6,
                      message:
                        "6 Numbers are required",
                    },
                  })}
                  
                />
                {errors.otp && errors.otp.type === "required" && (
                  <span className="text-danger">This field is required</span>
                )}

                {errors.otp && errors.otp.type === "minLength" && (
                  <span className="text-danger">{errors.otp.message}</span>
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
                data-aos-delay={1800}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className=" mb-3 mt-1"
              >
                <button type="submit" className="signUp_btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
