import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendMail } from "../../ApiCalling/api";
import { useDispatch, useSelector } from "react-redux";
import { callProgress, removeProgress } from "../../Action";
import Loader from "../../Common/Loader/Loader";
import image from "../../Assets/Images/imageLoginSignUp.jpg";

const ConfirmMail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const progress = useSelector((state) => state?.progress?.progress);
  // const display = useSelector((state) => state?.progress?.display);

  // const [dekhao, seTDekhao] = useState(false);

  const email = params.email;
  // const token = params.token;

  function submitHandler(e) {
    e.preventDefault();

    const datas = {
      email: email,
      // token: token,
    };

    sendMail(datas, sendMailCallBack);
    dispatch(callProgress(1));

    console.log("senmdddddd");
  }

  function sendMailCallBack() {
    dispatch(removeProgress(0));
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
          <div className="col d-flex flex-column justify-content-center align-items-center login_image" style={loginStyle} >
            <div
              className={` d-flex flex-column justify-content-center align-items-center mb-5 ${
                progress == 0 ? "d-none" : "d-block"
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
              style={{ color: "white", fontSize: "20px" }}
            >
              Hey User, to Verify Your Email Please send a mail.
            </h4>
            <form
              onSubmit={submitHandler}
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
                  className="form-control login_input"
                  type="text"
                  value={email}
                  readOnly
                />
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

    // <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100%" , position:"relative"}}>

    //  <div className= {`col-12 d-flex flex-column justify-content-center align-items-center mb-5 ${progress==0 ? "d-none" : "d-block"} `}  style={{position:"absolute", top:"20%"}}>
    //     <Loader />
    //     <span style={{color:"white", margin:"30px 0px"}}>Sending...</span>
    //   </div>

    //   <div className="row" style={{  color: "white" }}>

    //     <div className="col-12">
    //       <h3 className="text-center">
    //         Hey User, to Verify Your Email Please send a mail.
    //       </h3>
    //     </div>

    //       <div className="col-12 d-flex justify-content-center align-items-center">
    //         <form action="" onSubmit={submitHandler}>
    //           <div className="form-group">
    //             <input className="todo-input" type="text" value={email} />
    //             <button
    //               type="submit"
    //               className="btn"
    //               style={{ background: "#07f6ec", margin: "0px 6px" }}
    //             >
    //               Send Mail
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default ConfirmMail;
