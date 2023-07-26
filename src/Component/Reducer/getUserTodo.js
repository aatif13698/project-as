let initialState = {
    list : []
  };
  

  const getUserTodo = (state = initialState, action) =>{
    switch (action.type) {
        case "GET_List" : 

        return {...state, list : action.payload}


        case "DELETE_LIST" :

        return {...state, list:[]}

        default:
            return state;
    }


  }

  export default getUserTodo