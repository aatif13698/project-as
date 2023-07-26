import React from 'react'
import { BsBack } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


const BackButton = () => {

    const navigate = useNavigate()
  return (
    <span style={{position:"absolute",top:0, right:"20px"}}>
        <BsBack style={{color:"#07f6ec", fontSize:"25px"}} onClick={() =>  navigate(-1)}/> 
    </span>
  )
}

export default BackButton
