let initialState = {
   doneList : [],
   notDoneList : []
  };
  

  const getDoneList = (state = initialState, action) =>{
    switch (action.type) {
        case "ADD_DONE_LIST" : 

        return {...state, doneList : action.payload}

       case "ADD_NOT_DONE_LIST" :

       return {...state, notDoneList : action.payload}
       

        default:
            return state;
    }


  }

  export default getDoneList


