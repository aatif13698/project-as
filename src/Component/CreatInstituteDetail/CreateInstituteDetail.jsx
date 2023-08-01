import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getInstituteProfile, getShopProfile, getUser, uploadInstituteProfile, uploadshopProfile } from '../ApiCalling/api';
import { getShopData, getUserData } from '../Action';
import shopImg from "../Assets/Images/medicalShopDemo3.png";
import instituteImg from "../Assets/Images/instituteImage.jpg";
import avatar from '../../assets/images/avtar.jpg'


const CreateInstituteDetail = () => {
    const [postImage, setPostImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [name, setName] = useState("");
    const [shopExist, setShopExist] = useState(false);
  
    const email = useSelector(
      (state) => state?.getUserData?.userData?.user?.email
    );
  
    console.log("emailssss", email);
  
    const shop = useSelector((state) => state?.getShopDetailsM?.shopDataM);
  
    
    const user = useSelector((state) => state?.getUserData?.userData?.user);
    
    
    const dispatch = useDispatch();


    
    
    // console.log("shop", shop);
    // console.log("shopExist", shopExist);
    // console.log("user", user);
    // console.log("existProfile", profileExist);



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
        aboutInstitute,
        city,
        email4,
        ownerName,
        phoneNumber,
        instituteName,
        Timming,
        state,
        street,
        totalTeachers,
        zipCode,
        fromTo
      } = data;
      console.log("12", data);
  
      const formData = new FormData();
      formData.append("img", selectedImage);
      formData.append("email", email);
      formData.append("email4", email4);
      formData.append("ownerName", ownerName);
      formData.append("instituteName", instituteName);
      formData.append("aboutInstitute", aboutInstitute);
      formData.append("phoneNumber", phoneNumber);
      formData.append("totalTeachers", totalTeachers);
      formData.append("Timming", Timming);
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipCode", zipCode);
      formData.append("fromTo", fromTo);
      // console.log("data", formData);
      uploadInstituteProfile(formData, uploadInstituteProfileCallback)
    }
  
    function uploadInstituteProfileCallback() {
      reset();
      setPostImage(null);
      setShopExist(true);
      getUser(getData);
      getInstituteProfile(getInstituteProfileCallBack);
    }
  
    // function getshop() {
    //   getShopProfile(getShopProfileCallBack);
    // }
  
    function getInstituteProfileCallBack(data) {
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
      setValue("instituteName", shop?.instituteName);
      setValue("Timming", shop?.Timming);
      setValue("aboutInstitute", shop?.aboutInstitute);
      setValue("totalTeachers", shop?.totalTeachers);
      setValue("phoneNumber", shop?.phone);
      setValue("street", shop?.street);
      setValue("city", shop?.city);
      setValue("state", shop?.state);
      setValue("zipCode", shop?.zipCode);
      setValue("email4", shop?.email4);
      setValue("fromTo", shop?.fromTo)  
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
      <div className="container-fluid" style={{padding:"0px"}}>
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
              <h5 className="text-center">Here is your Institute details.</h5>
            </div>
            <div className="row mx-md-5 " id="ShopProfileContainer" style={{margin:"16px 0px"}} >
              <div className="col-12" style={{ padding: "0px 12px 20px 12px"}}>
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
                    <div style={{ position: "absolute" , top:"65%", left:"20px", background:"white", borderRadius:"50%" }}>
                      <img
                        id="profileImage"
                        src={   user?.pdf ?  `http://localhost:8080/userImages/${user?.pdf}` :  avatar}
                        // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1686779814~exp=1686780414~hmac=8eaa3044bc5a8a986d5b2e1eefd2ef9e3894822142aa0df3727bc1201f8e1a85"
                        alt="profile image"
                        style={{width:"130px", height:"130px", padding:"4px"}}
                      />
                    </div>
                  </div>
  
                  <div
                    className="col-12  d-flex align-items-center "
                    id="ShopProfileText"
                   
                  >
                    <div style={{margin:"48px 0px 0px 10px"}}>
                      <div>
                        <h4 className="my-3">Institute Informations..</h4>
                      </div>
  
                      <div style={{ margin: "18px 0px" }}>
                        <p>Owner Name : {shop?.ownerName}</p>
                        <p>About Institute : {shop?.aboutInstitute}</p>
                        <p>Email : {shop?.email4}</p>
                        <p>Contact : {shop?.phone}</p>
                        <p>Timming : {shop?.Timming}</p>
                        <p>Total Teachers : {shop?.totalTeachers}</p>
                        <p>From to : {shop?.fromTo}</p>
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
                          Edit Institute
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
                Please Create your Institute profile. We need the following
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
                          src={`${postImage ? postImage : instituteImg}`}
                          alt=""
                          style={{}}
                        />
                      </label>
  
                      <p style={{ marginTop: "15px" }}>
                        Click on Image and select Institute Image
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
  
                  <h5>Institute Details</h5>
  
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
                        Institute Name
                      </label>
                      <input
                        type="text"
                        className="form-control login_input"
                        placeholder="Institute Name"
                        {...register("instituteName", {
                          required: true,
                        })}
                      />
                      {errors.instituteName && errors.instituteName.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
  
                  <div className="row flex-md-row flex-column mb-3">
                    <div className="col">
                      <label id="login_label" htmlFor="firstName">
                        Institute Timming
                      </label>
                      <input
                        type="text"
                        className="form-control login_input"
                        placeholder="from ___ to ___"
                        {...register("Timming", {
                          required: true,
                        })}
                      />
                      {errors.Timming && errors.Timming.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col">
                      <label id="login_label" htmlFor="name">
                        Total Teachers
                      </label>
                      <input
                        type="number"
                        className="form-control login_input"
                        placeholder="Number of Teachers Available"
                        {...register("totalTeachers", {
                          required: true,
                        })}
                      />
                      {errors.totalTeachers &&
                        errors.totalTeachers.type === "required" && (
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
                        {...register("email4", {
                          required: true,
                        })}
                      />
                      {errors.email4 && errors.email4.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
  
                  <div className="row flex-md-row flex-column mb-3">
                    <div className="col d-flex flex-column">
                      <label htmlFor="aboutShop">About Institute:</label>
                      <textarea
                        id="about"
                        name="aboutShop"
                        placeholder="Enter between 20 to 30 words...."
                        rows="4"
                        cols="20"
                        {...register("aboutInstitute", {
                          required: true,
                        })}
                      ></textarea>
                      {errors.aboutInstitute &&
                        errors.aboutInstitute.type === "required" && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                    </div>
                    <div className="col">
                      <label id="login_label" htmlFor="email3">
                        From class to class
                      </label>
                      <input
                        type="text"
                        className="form-control login_input"
                        placeholder="Enter From class to class"
                        {...register("fromTo", {
                          required: true,
                        })}
                      />
                      {errors.fromTo && errors.fromTo.type === "required" && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
  
                  <h5>Institute Address</h5>
  
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
  
}

export default CreateInstituteDetail
