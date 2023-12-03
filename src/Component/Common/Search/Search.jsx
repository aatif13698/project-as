import React from "react";
import "./Search.css";
import { iconsImgs } from "../../../utils/images";

const Search = () => {
  return (
    <div className="row flex-row-reverse">
      <div className="col-8">
        <div className="row flex-row-reverse">
          <div className="col-12 d-flex justify-content-end pt-4 me-3" style={{position:"relative"}}>
            <input className="search-search-text" type="text" placeholder="Search Here.." />
            <button className="search-search-btn-icon">
              <img
                className="search-searchIcon"
                src={iconsImgs.search}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
