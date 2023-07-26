import ContentMain from "../../ContentMain/ContentMain";
import ContentTop from "../../ContentTop/ContentTop";
import "./Content.css";
// import ContentTop from '../../components/ContentTop/ContentTop';
// import ContentMain from '../../components/ContentMain/ContentMain';

import { Outlet } from "react-router-dom";

const Content = ({ children }) => {
  return (
    <div className="main-content">
      <ContentTop />
      <ContentMain childre={children} />
    </div>
  );
};

export default Content;
