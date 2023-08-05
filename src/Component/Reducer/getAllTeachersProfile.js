let initialState = {
    teachersList : [],
   
   };
   
 
   const getAllTeachersProfile = (state = initialState, action) =>{
     switch (action.type) {
         case "GET_TEACHER" : 
 
         return {...state, teachersList : action.payload}
 
        case "DELETE_TEACHER" :
 
        return {...state, teachersList : action.payload}
        
 
         default:
             return state;
     }
 
 
   }
 
   export default getAllTeachersProfile
 
 
 