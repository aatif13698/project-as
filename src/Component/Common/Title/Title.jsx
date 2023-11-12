import React from "react";
import "./Title.css";

const Title = (props) => {
  const { src, subTitle, title } = props;


  return (
    <div
      className="row py-3 title-div mb-3 "
      data-aos="fade-left"
      data-aos-duration="500"
      data-aos-delay={200}
    >
      {/* <div className="col-2   profile-div">
        
      </div> */}

      <div className="col-12 d-flex align-items-center ">
        <div className="profile-img-div me-3">
          <img className="profile-icon" src={src} alt="" />
         
        </div>
        <div>
          <h4 className="fw-bold text-uppercase titile-title ">{title}</h4>
          <h6 className="profile-subtitle">{subTitle}</h6>
        </div>
      </div>
    </div>
  );
};

export default Title;
