import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getUser, loginUser } from "../ApiCalling/api";
import { useDispatch } from "react-redux";
import { callStartLoading, getUserData, removeStartLoading } from "../Action";
import loginImage from "../Assets/Images/imageLoginSignUp.jpg";
import image from "../Assets/Images/imageLoginSignUp.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const  [getUser, getData] = useFetchUserData()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  function getData(data) {
    dispatch(getUserData(data))
    dispatch(removeStartLoading(false));
    navigate('/dashboard')
  }

  function LoginCallBack(errorCode) {
    switch (errorCode) {
      case 200:
        dispatch(callStartLoading(true));

        setTimeout(()=>{
          getUser(getData)
        },2000)

        break;
      case 401:
      case 402:
        reset();
        break;
      case 404:
        navigate("/signUp");
        break;
    }
  }

  function onSubmit(data) {
    loginUser(data, LoginCallBack);
  }

  const styleLogin = {
    backgroundImage: loginImage,
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
            
          </div>
          <div className="col d-flex flex-column align-items-center justify-content-center form_container ">
            <h4 className="text-center pt-3" style={{ color: "white",fontSize:"30px" }}>
              Welcome Back K@Ta3033#
            </h4>
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
                data-aos-duration="1000"
                data-aos-delay={800}
                className="form-group mb-3"
              >
                <label id="login_label" htmlFor="email">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control login_input"
                  placeholder="Password"
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
                data-aos-delay={1000}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className=" mb-3 mt-1"
              >
                <button
                  type="submit"
                  className="signUp_btn"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-1" data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={1100}>
                <p>
                 
                  <Link style={{ textDecoration: "none" }} to="/forgetPassword">
                    Forget Password ?
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center mt-1">


              <button
                 
                  
                  className=" signUp_btn "
                  onClick={()=> navigate("/signUp")}
                >
                  Creact Account
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    // <div className="container-fluid py-2" id="login" style={styleLogin}>
    //   <div
    //     className="row justify-content-around align-items-center"
    //     style={{ height: "100vh" }}
    //   >
    //     <div className="col-6 d-none d-md-block">
    //       <div
    //         data-aos="fade-left"
    //         data-aos-duration="1000"
    //         data-aos-delay={300}
    //       >
    //         <img
    //           className="img-fluid rounded-1 login_img_1"
    //           src="https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg?format=1500w"
    //           alt=""
    //         />
    //       </div>
    //     </div>
    //     <div
    //       data-aos="fade-left"
    //       data-aos-duration="3000"
    //       data-aos-delay={600}
    //       className="col-12 col-md-4 "
    //       style={{
    //         background: "transparent",
    //         border: "2px solid white",
    //         borderRadius: "12px",
    //       }}

    //       id="loginForm"
    //     >
    //       <div
    //         data-aos="fade-left"
    //         data-aos-duration="1000"
    //         data-aos-delay={400}
    //         className="card border-0"
    //         style={{ background: "transparent", color: "whitesmoke" }}
    //       >
    //         <div className="card-title text-center py-3  mx-5">
    //           {/* <h1>Welcome to Almabetter</h1> */}
    //           <h4
    //             data-aos="fade-left"
    //             data-aos-duration="1000"
    //             data-aos-delay={400}
    //           >
    //             Login to Todo, K@Ta3033#
    //           </h4>
    //         </div>
    //         <div className="card-body">
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div
    //     data-aos="fade-left"
    //     data-aos-duration="1000"
    //     data-aos-delay={600}
    //     className="form-group mb-3"
    //   >
    //     <label id="login_label" htmlFor="email">
    //       Your Email
    //     </label>
    //     <input
    //       type="text"
    //       className="form-control login_input"
    //       placeholder="Email"
    //       {...register("email", {
    //         required: true,
    //         pattern: {
    //           value:
    //             /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    //           message: "Please enter a valid email.",
    //         },
    //       })}
    //     />
    //     {errors.email && errors.email.type === "required" && (
    //       <span className="text-danger">This field is required</span>
    //     )}

    //     {errors.email && errors.email.type === "pattern" && (
    //       <span className="text-danger">{errors.email.message}</span>
    //     )}
    //   </div>
    //   <div
    //     data-aos="fade-left"
    //     data-aos-duration="1000"
    //     data-aos-delay={800}
    //     className="form-group mb-3"
    //   >
    //     <label id="login_label" htmlFor="email">
    //       Password
    //     </label>
    //     <input
    //       type="password"
    //       className="form-control login_input"
    //       placeholder="Password"
    //       {...register("password", {
    //         required: true,
    //         pattern: {
    //           value:
    //             /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //           message:
    //             "(UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)",
    //         },
    //       })}
    //     />
    //     {errors.password && errors.password.type === "required" && (
    //       <span className="text-danger">This field is required</span>
    //     )}

    //     {errors.password && errors.password.type === "pattern" && (
    //       <span className="text-danger">
    //         {errors.password.message}
    //       </span>
    //     )}
    //   </div>

    //   <div
    //     data-aos="fade-left"
    //     data-aos-duration="1000"
    //     data-aos-delay={1000}
    //     className="d-grid mb-4 mt-1"
    //   >
    //     <button
    //       type="submit"
    //       id="login_btn"
    //       className="btn btn-block btn-dark"
    //     >
    //       Sign In
    //     </button>
    //   </div>
    //   <div
    //     data-aos="fade-left"
    //     data-aos-duration="1000"
    //     data-aos-delay={1200}
    //     className="text-center mt-1"
    //   >
    //     <p>
    //       Are You New Here? <Link to="/signUp">Sign Up</Link>{" "}
    //     </p>
    //   </div>
    // </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
