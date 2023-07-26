import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import avatar from "../../Assets/Images/profile.png";
import "./CreatProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, getUser, uploadProfile } from "../../ApiCalling/api";
import { getUserData } from "../../Action";

const CreatProfile = () => {
  const [postImage, setPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [arivalImg , setArivalImf] = useState(null)

  const email = useSelector((state)=> state?.getUserData?.userData?.user?.email);
  const user = useSelector((state)=> state?.getUserData?.userData?.user);

  const dispatch = useDispatch()
  console.log("email", user);

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
   const { firstName , lastName , phoneNumber , city , landMark }  = data
    console.log(data, "11");
const formData = new FormData();
    formData.append('img',selectedImage ); 
    formData.append('email', email); 
    formData.append('firstName', firstName); 
    formData.append('lastName', lastName); 
    formData.append('phoneNumber', phoneNumber); 
    formData.append('city', city); 
    formData.append('landMark', landMark); 
    
    
 

  console.log("data", formData);

  uploadProfile(formData, uploadProfileCallback)

  }

  function uploadProfileCallback(){
    reset()
  }

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];
   
    const fileView =  URL.createObjectURL(e.target.files[0]);

    setSelectedImage(file)
   

    setPostImage( fileView );
  };



  function getData(data) {
    dispatch(getUserData(data));
  }
  useEffect(() => {
    getUser(getData);
  }, []);


  

 

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center mx-2"
        style={{ height: "100vh" }}
      >
       
        <div data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={200} className="col-12   col-md-6"  id="profile_form">
          <form  onSubmit={handleSubmit(onSubmit)} style={{ color: "black" }}>
            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={400}
              className="form-group mb-3 mt-4"
            >
              <label htmlFor="file-upload" style={{display:"flex", justifyContent:"center", alignItems:"center"}} >
                <img src={`${postImage ? postImage : avatar}`} alt=""  style={{width:"70px", height:"70px", border:"2px solid white", borderRadius:"50%"}}/>
              </label>

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

            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={600}
              className="form-group mb-3"
            >
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
              {errors.firstName && errors.firstName.type === "required" && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={800}
              className="form-group mb-3"
            >
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
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={1000}
              className="form-group mb-3"
            >
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
              {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                <span className="text-danger">This field is required</span>
              )}
              {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                <span className="text-danger">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={1200}
              className="form-group mb-3"
            >
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
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-delay={1400}
              className="form-group mb-3"
            >
              <label id="login_label" htmlFor="name">
                Land Mark
              </label>
              <input
                type="text"
                className="form-control login_input"
                placeholder="Land Mark"
                {...register("landMark", {
                  required: true,
                })}
              />
              {errors.landMark && errors.landMark.type === "required" && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div
              // data-aos="fade-left"
              // data-aos-duration="500"
              // data-aos-delay={1600}
              // className="d-grid mb-4 mt-1"
            >
              <button
                type="submit"
                id="login_btn"
                className="btn btn-block btn-dark"
                style={{color:"black", background:"#3ce2ad"}}
              >
                Creat
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CreatProfile;



// *** conver file to base64 

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
