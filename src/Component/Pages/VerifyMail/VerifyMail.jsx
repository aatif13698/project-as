import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VerifyUserMail } from '../../ApiCalling/api';
import './VerifyMail.css'
import { ThemeContext } from '../../context/ThemeContext';

const VerifyMail = () => {

    const navigate = useNavigate()
    const param = useParams();
    const {id, OTP} = param;

    const {theme} = useContext(ThemeContext)

function verifyFnc(){

    const datas = {id: id, OTP: OTP}
    VerifyUserMail(datas, verifyUserMailCallBack)

}


function verifyUserMailCallBack(errorCode){

  if(errorCode == 200){
    navigate("/login");
     
  }else if(errorCode == 401){
    navigate("/signUp");
  }
  
}



  return (
    <div className="container-fluid verify_container" id="dark" >
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="row my-3" >
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-center" id='t'>
              Click The Below Button To Verify.
            </h3>
            <button  onClick={verifyFnc}
                    type="submit"
                    className="btn"
                  >
                    Verify
                  </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default VerifyMail
