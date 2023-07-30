import React from "react";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  const display = useSelector((state) => state?.startLoading?.display);
  const height = useSelector((state) => state?.startLoading?.height);
  const Store = useSelector((state) => state);

  // console.log("startLoading", display, height);
  // console.log("store", Store);

  const loadingstyle = {
    display: display,
    height: height,
  };

  return (
    <div
      className="container-fluid  d-flex justify-content-center align-items-center"
      style={loadingstyle}
    >
      <div style={{ display: display }}>
        <Loader marginBottom={"30px"} />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
