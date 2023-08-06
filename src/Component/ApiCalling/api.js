import axios from "axios";
import { toast } from "react-toastify";

// const baseUrl = "http://localhost:8080/api/user";

// ### normal  signUp Api
// export async function signUpUser(datas, reset) {
//   try {
//     const {
//       data: { message },
//       status,
//     } = await axios.post("http://localhost:8080/api/user/signUp", datas);

//     if (message) {
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 3000, // Close the toast after 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       reset();
//     }
//   } catch (err) {
//     toast.error(err.response.data.message, {
//       position: "top-right",
//       autoClose: 3000, // Close the toast after 3 seconds
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//     // console.log(err.response.data.message);
//   }
// }

// *** actual signUp Api
export async function signUpUser(
  datas,
  reset,
  signUpCallBack,
  setDisable,
  setGoogleVerified
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post("http://localhost:8080/api/user/signUp", datas);

    console.log(errorCode);

    if (errorCode == 401 || errorCode == 200) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      reset();

      signUpCallBack(datas.email, errorCode);
    }

    if (errorCode == 404) {
      toast.warning(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setDisable(false);
      setGoogleVerified(false);

      reset();
    } else if (errorCode == 201) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      signUpCallBack(datas.email, errorCode);
    }
  } catch (err) {
    toast.error("server error", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

// *** sendMail

export async function sendMail(datas, sendMailCallBack) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/sendVerificationMail",
      datas
    );

    if (errorCode == 200) {
      toast.success(message);
      sendMailCallBack();
    } else if (errorCode == 500) {
      toast.warning(message);
      sendMailCallBack();
    }
  } catch (err) {
    console.log("SendMainERR", err);
  }
}

// VerifyMail

export async function VerifyUserMail(datas, verifyUserMailCallBack) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post("http://localhost:8080/api/user/verifyMail", datas);

    if (errorCode == 200) {
      toast.success(message);
      verifyUserMailCallBack(errorCode);
    } else if (errorCode == 401) {
      toast.error(message);
      verifyUserMailCallBack(errorCode);
    }
  } catch (err) {
    console.log("verifyMailERR", err);
  }
}

// login Api

export async function loginUser(datas, loginCallBack) {
  try {
    const {
      data: { errorCode, message, token },
    } = await axios.post("http://localhost:8080/api/user/login", datas);

    if (errorCode == 200) {
      localStorage.setItem("token", token);
      loginCallBack(errorCode);
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (errorCode == 401 || errorCode == 402) {
      loginCallBack(errorCode);
      toast.warning(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (errorCode == 404) {
      loginCallBack(errorCode);
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (message) {
    }
  } catch (err) {
    toast.error(err.response.data.message, {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    //   console.log(err.response.data.message);
  }
}

// verifyByToken

export async function verifyByToken(data, verifyByTokenCallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post("http://localhost:8080/api/user/verifyByToken", data);

    verifyByTokenCallback(errorCode, message);
  } catch (error) {
    console.log(error);
  }
}

//   getUserData from backEnd

export async function getUser(getData) {
  let token = localStorage.getItem("token");

  //   console.log(token, "token");

  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/user/loginUserData",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data) {
      getData(data);
    }

    // console.log(res);
  } catch (err) {
    console.log(err);
  }
}

// addTask in todo

export async function addUserTAsk(taskData, taskFnc) {
  try {
    const {
      data: { message },
    } = await axios.post("http://localhost:8080/api/todo/addtask", taskData);

    console.log("messageAdd", message);

    toast.success(message, {
      autoClose: 1000,
    });

    taskFnc();
  } catch (err) {
    console.log("errortask", err);
  }
}

// getTaskList of user

export async function getUserTask(getlist) {
  // console.log("**");

  let token = localStorage.getItem("token");

  try {
    const {
      data: { list, message },
    } = await axios.get("http://localhost:8080/api/todo/gettask", {
      headers: { Authorization: `Bearer ${token}` },
    });

    getlist(list);

    // toast.success(message);
  } catch (err) {
    console.log("getTaslErr", err);
  }
}

// delete one task

export async function deleteOneTask(datas, deleteCallBack) {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/todo/deletetask",
      datas
    );

    if (data) {
      deleteCallBack();
    }
  } catch (err) {
    console.log("deleteOneERR", err);
  }
}

// updateOneTask

export async function updateOneTask(datas, updateCallBack) {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/todo/updatetask",
      datas
    );

    if (data) {
      updateCallBack();
    }
  } catch (err) {
    console.log("updateERR", err);
  }
}

// checkedOneTask

export async function checkedOneTask(datas, checkedCallBack) {
  console.log("checked running");

  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/todo/checkedtask",
      datas
    );

    if (data) {
      console.log(data, "checkedData");
      checkedCallBack();
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// sendforgetPasswordMail

export async function sendforgetPasswordMail(data, forgetPasswordCallback) {
  try {
    const {
      data: { errorCode, message, email },
    } = await axios.post(
      "http://localhost:8080/api/user/sendPassordResetEmail",
      data
    );

    // console.log(errorCode, message);

    forgetPasswordCallback(errorCode, message, email);
  } catch (err) {
    console.log(err);
  }
}

// restPassword

export async function restPassword(data, resetCallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post("http://localhost:8080/api/user/resetPassword", data);

    // console.log(errorCode, message);

    resetCallback(errorCode, message);
  } catch (err) {
    console.log(err);
  }
}

// uploadProfile

export async function uploadProfile(datas, uploadProfileCallback) {
  console.log("uploaadd");
  try {
    console.log("11111");
    const {
      data: { errorCode, message },
    } = await axios.post("http://localhost:8080/api/user/uploadProfile", datas);
    if (errorCode == 200) {
      toast.success(message);
      uploadProfileCallback();
    } else {
      toast.warning(message, errorCode);
      // uploadProfileCallback()
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// getProfile

export async function getProfileData(getProfileCallBack) {
  console.log("profile dataxxxxxxx");

  let token = localStorage.getItem("token");
  try {
    const {
      data: { errorCode, message, UserProfile },
    } = await axios.get("http://localhost:8080/api/user/getProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (errorCode == 200) {
      // toast.success(message);
      getProfileCallBack(UserProfile);
    } else {
      // toast.warning(message)
    }
  } catch (err) {
    console.log(err);
  }
}

// uploadshopProfile

export async function uploadshopProfile(datas, uploadShopProfileCallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/uploadMedicalShopProfile",
      datas
    );
    if (errorCode == 200) {
      toast.success(message);
      uploadShopProfileCallback();
    } else {
      toast.warning(message);
      // uploadProfileCallback()
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// getShopProfile

export async function getShopProfile(getShopProfileCallBack) {
  // toast.warning("go")

  let token = localStorage.getItem("token");

  // toast.error(token)

  // console.log("token", token);
  try {
    // toast.error("try")
    const {
      data: { errorCode, message, shopProfile },
    } = await axios.get(
      "http://localhost:8080/api/user/getMedicalShopProfile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // toast.error("try Success")

    if (errorCode == 200) {
      // toast.success("get shop success")

      getShopProfileCallBack(shopProfile);
    } else {
      // toast.warning(message)
    }
  } catch (err) {
    console.log(err);
  }
}

// uploadInstituteProfile

export async function uploadInstituteProfile(
  datas,
  uploadInstituteProfileCallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/uploadInstituteProfile",
      datas
    );
    if (errorCode == 200) {
      toast.success(message);
      uploadInstituteProfileCallback();
    } else {
      toast.warning(message);
      // uploadProfileCallback()
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// getInstituteProfile

export async function getInstituteProfile(getInstituteProfileCallBack) {
  console.log("institute");

  let token = localStorage.getItem("token");

  // console.log("token", token);
  try {
    const {
      data: { errorCode, message, instituteProfile },
    } = await axios.get("http://localhost:8080/api/user/getInstituteProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (errorCode == 200) {
      // console.log("shopdata", shopProfile);
      // console.log("yes institute");

      // toast.success(message)

      getInstituteProfileCallBack(instituteProfile);
    } else {
      toast.warning(message);
    }
  } catch (err) {
    console.log(err);
  }
}

// addDoctorProfile

export async function addDoctorProfile(datas, doctorProfileCallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/addDoctorProfile",
      datas
    );
    if (errorCode == 200) {
      toast.success(message);
      doctorProfileCallback();
    } else {
      toast.warning(message, errorCode);
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// getAllDoctosOfParticularMedical

export async function getAllDoctosOfParticularMedical(getAllDoctorsCallback) {
  console.log("institute");

  let token = localStorage.getItem("token");

  try {
    const {
      data: { errorCode, message, totalDoctors },
    } = await axios.get(
      "http://localhost:8080/api/user/getAllDoctorsOfParticularMedical",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (errorCode == 200) {
      toast.success(message);

      getAllDoctorsCallback(totalDoctors);
    } else {
      toast.warning(message);
    }
  } catch (err) {
    console.log(err);
  }
}

// deleteParticularDoctor

export async function deleteParticularDoctor(
  data,
  deleteParticularDocCallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/deleteParticularDoctor",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      deleteParticularDocCallback();
    }
  } catch (error) {
    console.log(error);
  }
}

// addTeacherProfile

export async function addTeacherProfile(datas, teacherProfileCallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/addTeacherProfile",
      datas
    );
    if (errorCode == 200) {
      toast.success(message);
      teacherProfileCallback();
    } else {
      toast.warning(message, errorCode);
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}

// getAllTeachersOfParticularInstitute

export async function getAllTeachersOfParticularInstitute(
  getAllTeachersCallback
) {
  console.log("institute");

  let token = localStorage.getItem("token");

  try {
    const {
      data: { errorCode, message, totalTeachers },
    } = await axios.get(
      "http://localhost:8080/api/user/getAllTeachersOfParticulInstitute",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    getAllTeachersCallback(totalTeachers);

    if (errorCode == 200) {
      toast.success(message);
    } else {
      toast.warning(message);
    }
  } catch (err) {
    console.log(err);
  }
}

// deleteParticularTeacher

export async function deleteParticularTeacher(
  data,
  deleteParticularTecCallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/deleteParticularTeacher",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      deleteParticularTecCallback();
    }
  } catch (error) {
    console.log(error);
  }
}

// addBatchProfile

export async function addBatchProfile(data, addBatchProfilecallback) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/addBatchProfile",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      addBatchProfilecallback();
    }
  } catch (error) {
    console.log(error);
  }
}

// getAllBatchesOfParticularInstitute

export async function getAllBatchesOfParticularInstitute(
  getAllBatchesCallback
) {
  console.log("institute");

  let token = localStorage.getItem("token");

  try {
    const {
      data: { errorCode, message, totalBatches },
    } = await axios.get(
      "http://localhost:8080/api/user/getAllBatchesOfParticulInstitute",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    getAllBatchesCallback(totalBatches);

    if (errorCode == 200) {
      toast.success(message);
    } else {
      toast.warning(message);
    }
  } catch (err) {
    console.log(err);
  }
}

// deleteParticularBatch

export async function deleteParticularBatch(
  data,
  deleteParticularBatchCallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/deleteParticularBatch",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      deleteParticularBatchCallback();
    }
  } catch (error) {
    console.log(error);
  }
}

// addUpcommingBatchProfile

export async function addUpcommingBatchProfile(
  data,
  addUpcommingBatchProfilecallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/addUpcommingBatchProfile",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      addUpcommingBatchProfilecallback();
    }
  } catch (error) {
    console.log(error);
  }
}

// getAllUpcommingBatchesOfParticularInstitute

export async function getAllUpcommingBatchesOfParticularInstitute(
  getAllUpcommingBatchesCallback
) {
  console.log("institute");

  let token = localStorage.getItem("token");

  try {
    const {
      data: { errorCode, message, totalUpcommingBatches },
    } = await axios.get(
      "http://localhost:8080/api/user/getAllUpcommingBatchesOfParticulInstitute",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    getAllUpcommingBatchesCallback(totalUpcommingBatches);

    if (errorCode == 200) {
      toast.success(message);
    } else {
      toast.warning(message);
    }
  } catch (err) {
    console.log(err);
  }
}

// deleteParticularUpcommingBatch

export async function deleteParticularUpcommingBatch(
  data,
  deleteParticularUpcommingBatchCallback
) {
  try {
    const {
      data: { errorCode, message },
    } = await axios.post(
      "http://localhost:8080/api/user/deleteParticularUpcommingBatch",
      data
    );

    if (errorCode == 200) {
      toast.success(message);
      deleteParticularUpcommingBatchCallback();
    }
  } catch (error) {
    console.log(error);
  }
}
