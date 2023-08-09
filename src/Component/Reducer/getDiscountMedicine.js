let initialState = {
    CardhList : [],
   
   };
   
 
   const getDiscountMedicine = (state = initialState, action) =>{
     switch (action.type) {
         case "GET_MEDICAL_CARD" : 
 
         return {...state, CardhList : action.payload}
 
        case "DELETE_MEDICAL_CARD" :
 
        return {...state, CardhList : []}
        
 
         default:
             return state;
     }
 
 
   }
 
   export default getDiscountMedicine
 
 
 