let initialState = {
    shopDataM : ""
  };
  

  const getShopDetailsM = (state = initialState, action) =>{
    switch (action.type) {
        case "GET_SHOP_DATA" : 

        return {...state, shopDataM : action.payload}

        case "EDIT_SHOP_DATA" : 

        return {...state, shopDataM : action.payload}


        case "DELETE_SHOP_DATA" : 

        return {...state, shopDataM:""}

        default:
            return state;
    }


  }

  export default getShopDetailsM