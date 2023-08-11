import React, { useContext, useEffect } from 'react'
import activeLinkContext from '../context/activeLinkContext'
import HomeInstitute from '../HomeInstitute/HomeInstitute';
import HomeMedical from '../HomeMedical/HomeMedical';
import { useSelector } from 'react-redux';

const UserHome = () => {

  const  {activeLink, setActiveLink}  = useContext(activeLinkContext)
  const user = useSelector((state)=> state?.getUserData?.userData?.user);



useEffect(()=>{
  setActiveLink(1);
 
},[])


  return (
    <>
    <div>
      {user?.userType == "instituteOwner"  ?  <HomeInstitute/> :  user?.userType == "medicalOwner" ? <HomeMedical/> : null}
    </div>
    </>

   
   
      )
}

export default UserHome
