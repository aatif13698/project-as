let initialState = {
    userData : ""
  };
  

  const getUserData = (state = initialState, action) =>{
    switch (action.type) {
        case "GET_USER" : 

        return {...state, userData : action.payload}


        case "DELETE_USER" : 

        return {...state, userData:""}

        default:
            return state;
    }


  }

  export default getUserData