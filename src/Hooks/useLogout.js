
import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { delLocal } from '../common/local';

export default function useLogOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [call , callLogout] = useState("");
    // const [status , setStatus] = useState(false)
function userLogout(){
    delLocal("auth")
    navigate("/")
    setStatus(true)
    dispatch({type:"USER_LOGOUT"})
    }
useEffect(()=>{
    if(call)userLogout()
},[call])
//   return [status,callLogout]
}



// ye logout kerne ka accha wala tarika hai is p kaam bad hoga
