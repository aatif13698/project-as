

// getUserData
  
 export  const getUserData = (data)=>{

   return {type : "GET_USER", payload : data}

}

// deletUser Data


export const deleteUserData = ()=>{
  return {type:"DELETE_USER"}
}


// getUserProfile

export  const getUserProfile = (data)=>{

  return {type : "GET_USER_PROFILE", payload : data}

}

// deleteUserProfile

export const deleteUserProfile = ()=>{
  return {type:"DELETE_USER_PROFILE"}
}





// getUserTodo
export const getUserTodo = (data) => {

  return {type:"GET_List", payload : data}
  
}






// delteUserTodo
export const deleteUserTodo = () => {

  return {type:"DELETE_LIST"}
  
}

// getDoneList
export const getUserDoneList = (data) =>{

  return {type : "ADD_DONE_LIST", payload : data}
}

// getNotDoneList
export const getUserNotDoneList = (data) => {

  return {type : "ADD_NOT_DONE_LIST", payload : data}
}

// callProgress

export const callProgress = (data) => {

  return { type : "CALLING__PROGRESS", payload : data}

}

// removeProgress

export const removeProgress = (data) => {

  return { type : "REMOVE__PROGRESS", payload : data}

}



//  callStartLoading

export const callStartLoading = (data) => {

  return { type : "CALLING_LOADING", payload : data}

}

// removeStartLoading

export const removeStartLoading = (data) => {

  return { type : "REMOVE_LOADING", payload : data}

}

// getShopData
export  const getShopData = (data)=>{


  return {type : "GET_SHOP_DATA", payload : data}

}

// deleteShopData
export const deleteShopData = () => {
  return {type : "DELETE_SHOP_DATA"}
}


// getDoctorList

export  const getDoctorList = (data)=>{

  return {type : "GET_DOCTOR", payload : data}

}

// deleDoctor

export  const deleDoctor = (data)=>{

  return {type : "DELETE_DOCTOR", payload : data}

}



// getTeacherList

export  const getTeacherList = (data)=>{

  return {type : "GET_TEACHER", payload : data}

}

// deleTeacher

export  const deleTeacher = (data)=>{

  return {type : "DELETE_TEACHER", payload : data}

}

// getBatchList

export  const getBatchList = (data)=>{

  return {type : "GET_BATCH", payload : data}

}

// deleBatchList

export  const deleBatchList = (data)=>{

  return {type : "DELETE_BATCH", payload : data}

}



// **


// getUpcommingBatchList

export  const getUpcommingBatchList = (data)=>{

  return {type : "GET_UPBATCH", payload : data}

}

// deleteUpcommingBatchList

export  const deleteUpcommingBatchList = (data)=>{

  return {type : "DELETE_UPBATCH", payload : data}

}



// getMedicalDiscountCardList

export  const getMedicalDiscountCardList = (data)=>{

  return {type : "GET_MEDICAL_CARD", payload : data}

}


export  const deleteMedicalDiscountCardList = (data)=>{

  return {type : "DELETE_MEDICAL_CARD", payload : data}

}


