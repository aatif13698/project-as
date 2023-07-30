


let initialState = {
    Err : false
}
  
  
  const getErrorPage = (state = initialState, action) => {
    switch (action.type) {
        case "GOT_ERROR":
            return {...state, Err : true}
        case "NO_ERROR":
            return {...state, Err: false}
        default:
            return state
    }
}

export default getErrorPage
