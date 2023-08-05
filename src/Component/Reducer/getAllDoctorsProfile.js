let initialState = {
    doctorsList : [],
   
   };
   
 
   const getAllDoctorsProfile = (state = initialState, action) =>{
     switch (action.type) {
         case "GET_DOCTOR" : 
 
         return {...state, doctorsList : action.payload}
 
        case "DELETE_DOCTOR" :
 
        return {...state, doctorsList : action.payload}
        
 
         default:
             return state;
     }
 
 
   }
 
   export default getAllDoctorsProfile
 
 
 