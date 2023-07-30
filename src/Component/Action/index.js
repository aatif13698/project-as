

// getUserData
  
 export  const getUserData = (data)=>{

   return {type : "GET_USER", payload : data}

}

// deletUser Data


export const deleteUserData = ()=>{
  return {type:"DELETE_USER"}
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



// 

export const callStartLoading = (data) => {

  return { type : "CALLING_LOADING", payload : data}

}


export const removeStartLoading = (data) => {

  return { type : "REMOVE_LOADING", payload : data}

}


