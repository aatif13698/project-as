let initialState = {
    progress:0,
    display:"none"
}

const progress = (state=initialState,action) =>{
    switch (action.type) {
        case "CALLING__PROGRESS":
            return {
                ...state,
                progress:action.payload,
                display:"block"
            }
        case "REMOVE__PROGRESS":
            return {
                ...state,
                progress:action.payload,
                display:'none'
            }
        default:
            return state
    }
}

export default progress;