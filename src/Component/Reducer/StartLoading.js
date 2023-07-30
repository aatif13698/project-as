let initialState = {
    loading:false,
    display:"none",
    height : "0vh"
    
}

const startLoading = (state=initialState,action) =>{
    switch (action.type) {
        case "CALLING_LOADING":
            return {
                ...state,
                loading:action.payload,
                display:"block",
                height : "100vh"
                
            }
        case "REMOVE_LOADING":
            return {
                ...state,
                loading:action.payload,
                display:'none',
                height:"0vh"
                
            }
        default:
            return state
    }
}

export default startLoading;