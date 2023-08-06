let initialState = {
    batchList : [],
   
   };
   
 
   const getBatchesProfile = (state = initialState, action) =>{
     switch (action.type) {
         case "GET_BATCH" : 
 
         return {...state, batchList : action.payload}
 
        case "DELETE_BATCH" :
 
        return {...state, batchList : []}
        
 
         default:
             return state;
     }
 
 
   }
 
   export default getBatchesProfile
 
 
 