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
export async function signUpUser(datas, reset, signUpCallBack, setDisable, setGoogleVerified) {
  try {
    const { data : {errorCode, message, token} } = await axios.post(
      "http://localhost:8080/api/user/signUp",
      datas
    );

    console.log(errorCode);

    if(errorCode == 401 || errorCode == 200){

      toast.success(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      reset()

      signUpCallBack(datas.email, token, errorCode)

    }

    if (errorCode == 404  ) {
      toast.warning(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setDisable(false)
      setGoogleVerified(false)

      reset();
    }else if(errorCode == 201){

      toast.success(message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      signUpCallBack(datas.email, token, errorCode)


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
  
export async function  sendMail(datas, sendMailCallBack){
 
  try{

   const {data:{errorCode, message}} = await   axios.post("http://localhost:8080/api/user/sendVerificationMail",datas);

    if(errorCode == 200){
      toast.success(message)
      sendMailCallBack()
    }else if(errorCode == 500){
      toast.warning(message)
      sendMailCallBack()
    }

    

  }catch(err){
    console.log("SendMainERR", err);
  }


}

// VerifyMail

export async function  VerifyUserMail(datas, verifyUserMailCallBack){

  try{

    const {data :{errorCode, message}} = await   axios.post("http://localhost:8080/api/user/verifyMail",datas);

    if(errorCode == 200){

      toast.success(message)
      verifyUserMailCallBack(errorCode)

    }else if(errorCode == 401){

      toast.error(message)
      verifyUserMailCallBack(errorCode)

    }


  }catch(err){
    console.log("verifyMailERR", err);
  }

}






// login Api

export async function loginUser(datas, loginCallBack) {

  try {
    const { data: { errorCode ,message, token }} = await axios.post("http://localhost:8080/api/user/login", datas);

    if(errorCode == 200){

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

    }else if(errorCode == 401 || errorCode == 402){

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

    }else if(errorCode == 404){
     
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



// uploadProfile


export async function uploadProfile(datas, uploadProfileCallback){
  try {
    const { data : {errorCode, message}} = await axios.post(
      "http://localhost:8080/api/user/uploadProfile",
      datas
    );
    if(errorCode == 200){
       toast.success(message);
       uploadProfileCallback()
    }else{
      toast.warning(message, errorCode)
      // uploadProfileCallback()
    }
  } catch (err) {
    console.log("checkedERR", err);
  }
}



// getProfile

export async function getProfileData(getProfileCallBack) {
  let token = localStorage.getItem("token");
  try {
    const {
      data: { errorCode, message, profileImage },
    } = await axios.get("http://localhost:8080/api/user/getProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("image", profileImage );
    getProfileCallBack(profileImage)
  } catch (err) {
    console.log(err);
  }
}


// sendforgetPasswordMail

export async function sendforgetPasswordMail(data, forgetPasswordCallback) {
  
  try {

    const {data: { errorCode, message, email  } } = await axios.post("http://localhost:8080/api/user/sendPassordResetEmail", data);


    // console.log(errorCode, message);

    forgetPasswordCallback(errorCode, message, email)


  } catch (err) {

    console.log(err);

  }
}



// restPassword

export async function restPassword(data, resetCallback) {
  
  try {

    const {data: { errorCode, message  } } = await axios.post("http://localhost:8080/api/user/resetPassword", data);


    // console.log(errorCode, message);

    resetCallback(errorCode, message)


  } catch (err) {

    console.log(err);

  }
}


