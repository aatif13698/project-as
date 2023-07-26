import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VerifyUserMail } from '../../ApiCalling/api';

const VerifyMail = () => {

    const navigate = useNavigate()
    const param = useParams();
    const {id, token} = param;

function verifyFnc(){

    const datas = {id: id, token: token}
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
    <div className="container-fluid" style={{ height: "100%" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="row my-3" style={{ color: "white" }}>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-center">
              Click The Below Button To Verify.
            </h3>
            <button  onClick={verifyFnc}
                    type="submit"
                    className="btn"
                    style={{ background: "#07f6ec", margin: "0px 6px" }}
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
