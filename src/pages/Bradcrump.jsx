import React from "react";
import { useLocation, Link } from "react-router-dom";
const Bradcrump = () => {
  const location = useLocation();
  let currentlink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentlink += `/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentlink}>{crumb}</Link>
        </div>
      );
    });
  return <div className="breadcrumbs">{crumbs}</div>;
};
export default Bradcrump;
