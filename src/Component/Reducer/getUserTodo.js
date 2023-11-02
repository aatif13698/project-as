let initialState = {
    list : [],
  };


  function random (id, list){

    let newlist = list.filter((Val)=> Val.id != id)

    return newlist

  }
  

  const getUserTodo = (state = initialState, action) => {
    switch (action.type) {
        case "GET_List" : 

        return {...state, list : action.payload}


        case "DELETE_LIST" :

        return {...state, list:[]}


        case "DELETE_ONE" :

          return {...state, list : random(action.payload, state.list) }   

        

        default:
            return state;
    }


  }

  export default getUserTodo