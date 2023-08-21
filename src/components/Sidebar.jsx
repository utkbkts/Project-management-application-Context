import React, { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink ,useLocation } from "react-router-dom";
import Avatar from "../components/Avatar"
import {useAuthContext} from "../hooks/useAuthContext"
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const {user}=useAuthContext()

  const handleLiClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user?.photoURL}/>
          <p>Merhaba,{user?.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li
              onClick={() => handleLiClick(1)}
              className={activeIndex === 1 ? "active" : ""}
            >
              <NavLink to="/">
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li
              onClick={() => handleLiClick(2)}
              className={activeIndex === 2 ? "active" : ""}
            >
              <NavLink to="/create">
                <span>Yeni Proje</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
