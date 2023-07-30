import React from "react";
import "./Loader.css"

const Loader = ({marginBottom}) => {
  return (
    <div class="spinner" style={{marginBottom:marginBottom}}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
     
    </div>
  );
};

export default Loader;
