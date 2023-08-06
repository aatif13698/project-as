let initialState = {
    UpcommingBatchList : [],
   
   };
   
 
   const getUpcommingBatchesProfile = (state = initialState, action) =>{
     switch (action.type) {
         case "GET_UPBATCH" : 
 
         return {...state, UpcommingBatchList : action.payload}
 
        case "DELETE_UPBATCH" :
 
        return {...state, UpcommingBatchList : []}
        
 
         default:
             return state;
     }
 
 
   }
 
   export default getUpcommingBatchesProfile
 
 
 