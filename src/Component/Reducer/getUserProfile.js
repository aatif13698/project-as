let initialState = {
    userProfile : ""
  };
  

  const getUserProfile = (state = initialState, action) =>{
    switch (action.type) {
        case "GET_USER_PROFILE" : 

        return {...state, userProfile : action.payload}


        case "DELETE_USER_PROFILE" : 

        return {...state, userProfile:""}

        default:
            return state;
    }


  }

  export default getUserProfile