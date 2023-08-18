import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./DemoSitePharmacy.css";
import { iconsImgs } from "../../utils/images";

const DemoSitePharmacy = () => {


    const [navTogle, setNavTogle] = useState(false);



  function toggleNabvar() {
  console.log("11111");
    setNavTogle(!navTogle)

  }
  
  


  return (
    <div className="container-fluid">
      {/* nabvar */}

      <div className="row navrow">
        <div className="col-12 ">
          <div className="row justify-content-center align-items-center " style={{position:"relative", height:"100%"}}>
            {/* togle  */}
 
           
                <button className="togleSite" type="button" onClick={() => toggleNabvar()}>
                  <img className="togleSiteMenu" src={iconsImgs.menu3} alt="" />
                </button>
              
 
            {/* togle menu */}

            <div   className= {  `togleMenuItem ${navTogle ? "truetogleMenuItem "  : null} `}>
              <div className="closeIconDiv">
                <img onClick={()=> setNavTogle(false)} className={`closeIcon  ${navTogle ? "closeIconTrue" : ""}`} src={ iconsImgs.close} alt="" />
              </div>
              <ul className={`${navTogle ? "trutogleUl" : "togleUl"}  `}>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    Home
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    About
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    Services
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    Doctors
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    Discount
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    Blogs
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none" }}>
                    contact
                  </Link>{" "}
                </li>
              </ul>
            </div>

            <div className="col-5 justify-content-center align-items-center ">

                <h5 style={{margin:"0px"}}>Azanta Pharmacy</h5>
                
                </div>
            <div className="col-7 d-flex ">
              <ul className="demSiteUl">
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Home
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    About
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Services
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Doctors
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Discount
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Blogs
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    contact
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* content */}
      <div>

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sit laudantium itaque temporibus nemo corporis, rem placeat, sed illo id aspernatur vel animi consequatur assumenda ducimus eveniet magni quod reprehenderit sint. Beatae qui dolorem similique ducimus quibusdam? Repellat eius debitis aspernatur delectus animi obcaecati, neque perspiciatis a dolor voluptatum, deserunt iusto hic fugit fuga itaque illo. Perspiciatis voluptatum quaerat modi provident. Fugit corporis numquam ducimus veniam modi ratione voluptate, similique sint repudiandae. Dolorum atque eveniet, a laboriosam quo cupiditate vero, placeat repellendus nobis tempora id! Nisi a eum quibusdam rem mollitia debitis, quidem consequuntur commodi odit aut ipsam, iure optio? Eos ex sequi voluptatibus quia voluptate rerum aperiam fugiat maxime nam? Ipsa molestias a quos numquam quibusdam voluptates aliquam tenetur magnam neque maiores saepe, harum, itaque sed repellat! Sunt expedita distinctio amet quibusdam veniam sed, porro alias dignissimos mollitia consequuntur sapiente aspernatur! Mollitia beatae numquam vero corrupti tenetur! Officiis sint placeat labore eos nesciunt error maxime sed fugit alias quos quis aliquam rerum, illo, repellendus dicta. Facilis est omnis itaque aut tempore nisi aliquam minus incidunt eos impedit, consequuntur non sunt, ea, nemo atque? Modi accusantium iure doloribus eum provident, voluptatibus dolor? Ipsum a dolor accusamus doloribus, vitae ad ea. Dignissimos sit nobis magnam autem sequi ratione molestias veniam ab molestiae earum perferendis vitae quisquam saepe iusto consectetur quaerat consequuntur, corporis dolore blanditiis dolores iure nam expedita error modi! Vero harum tempora error, quos quisquam totam esse hic dolores nesciunt voluptatibus, ex beatae nulla repellat debitis inventore a voluptas vel quidem? Sunt praesentium officia totam! At error explicabo repellendus rem vero provident cumque assumenda cupiditate blanditiis ratione odit atque, voluptatem omnis placeat obcaecati nobis, nostrum illo enim! Eligendi qui necessitatibus numquam tenetur ut sapiente minima voluptatum officia itaque voluptates quisquam, iure nobis nihil. Quos harum consectetur quidem aspernatur maxime odit dolores, et odio eveniet in pariatur velit quas magnam quaerat iure reprehenderit est placeat magni consequuntur minima repellendus, suscipit corporis. Doloribus molestias labore facilis deleniti a praesentium reprehenderit sed incidunt, perspiciatis illum, similique repellat soluta autem saepe dicta assumenda sit obcaecati numquam fugit culpa quia blanditiis exercitationem voluptatibus. Necessitatibus quibusdam non sapiente accusamus reiciendis voluptatem assumenda labore similique illum numquam a placeat esse ullam delectus iste ipsam repudiandae mollitia dolorum sequi minus, ea cupiditate impedit ad nemo. Eos molestias vero quos incidunt rerum ipsum, magnam quasi officia eius recusandae soluta laudantium labore magni? Repudiandae impedit voluptatum laborum cupiditate totam quae ullam sint natus pariatur sunt consectetur maiores aliquid tempora dicta perspiciatis soluta odio, obcaecati quis ut incidunt voluptatibus accusamus at ducimus itaque. Suscipit magnam adipisci labore eum assumenda? Commodi ratione fugiat aut veritatis pariatur quia illo aliquam, iure quidem harum minus, accusantium numquam? Iste vitae fugit qui numquam unde et voluptatum esse dolorem itaque tempore velit rerum ratione placeat cupiditate nulla alias aspernatur eum suscipit quam, earum expedita reiciendis non ut. Omnis totam dolores maxime deserunt ipsum, necessitatibus est, praesentium sapiente ad voluptate voluptatum assumenda accusamus alias commodi laudantium voluptatem quas soluta enim ipsam tenetur nostrum quod. Mollitia, asperiores officiis!
      </div>
    </div>
  );
};

export default DemoSitePharmacy;
