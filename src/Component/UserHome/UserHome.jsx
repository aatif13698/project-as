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
    {/* <div>
      {user?.userType == "instituteOwner"  ?  <HomeInstitute/> :  user?.userType == "medicalOwner" ? <HomeMedical/> : null}
    </div> */}

    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam doloremque nostrum facere saepe itaque omnis distinctio quasi labore officia perferendis cupiditate sapiente, voluptatum dignissimos iusto soluta sint, deserunt exercitationem dolorum velit repellat. Excepturi neque sed, blanditiis minima consequuntur perferendis qui iste? A laboriosam qui animi libero, ullam odit quos dicta voluptates molestias soluta ea fuga ex maiores sint! Porro, maiores. Quod, tenetur voluptas, dolores id praesentium fuga facilis aliquid eos debitis, amet ea qui deserunt. Sint voluptatibus ad accusantium nihil? Voluptatum unde incidunt corporis libero deleniti tempora, ab assumenda ex voluptas expedita culpa omnis quia esse porro asperiores quasi praesentium! Maiores nisi qui modi reprehenderit rem totam aspernatur animi minima voluptatum suscipit sit natus at voluptatibus doloribus sint aliquam accusantium recusandae beatae, quam eveniet! Impedit, ex ab! Repudiandae, exercitationem aut? Perferendis quidem impedit non sed iusto ex, suscipit beatae labore nam, nobis ipsum illum ipsam enim? Necessitatibus qui harum dolorem laborum est nisi. Eius odio, id aliquam nemo blanditiis minus maxime laborum voluptatum doloremque ipsa. Tempora vero ipsum id neque. Animi minus eius eaque consectetur doloribus accusamus totam, odit sequi quas inventore dolor excepturi aut? Nostrum repellat voluptatum perspiciatis rerum necessitatibus autem porro, quis voluptate aut nobis aliquam soluta fugit pariatur recusandae possimus, praesentium quisquam cumque corrupti odit magni est tenetur enim officiis. Optio placeat harum illum totam vitae, tenetur ad minima aut recusandae non natus aspernatur expedita est quae laborum? Qui corporis quisquam sed similique, non, id consequatur nam laudantium est ipsam explicabo corrupti sapiente minus praesentium repellat. Doloribus tenetur vero, earum non sequi reprehenderit obcaecati velit perferendis voluptate quo quod explicabo minima et at ullam ad aut, culpa maxime praesentium maiores delectus doloremque, dolor voluptatum deserunt. Ea ullam quam rem neque totam necessitatibus eum aliquid ipsa doloribus, natus praesentium! Tempora, minus. At tempora architecto saepe et vitae necessitatibus, iste odio fugit quae error possimus explicabo nisi sit veritatis aspernatur eligendi quas praesentium. Sed sint dolorum aperiam illo autem, inventore, modi, enim eius quaerat quo deleniti ex placeat cupiditate maiores asperiores iste ipsum quia distinctio voluptate ipsam! Non sint eligendi laboriosam doloremque rem itaque corrupti hic quasi assumenda accusamus distinctio nostrum unde soluta amet magni quo consequuntur blanditiis nulla repellendus perferendis inventore, fugit ut, similique cumque. Ratione, a corrupti. Sunt itaque doloribus similique, facilis animi quam atque laudantium aspernatur, placeat quaerat consequatur, totam rerum inventore! Hic iusto architecto, error exercitationem sed sit totam consequuntur suscipit possimus quisquam, aliquid a?
    </div>
    </>

   
   
      )
}

export default UserHome
