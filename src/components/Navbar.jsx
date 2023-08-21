import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { uselogout } from "../hooks/UseLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = uselogout();
  const { user, isPending } = useAuthContext();

  return (
    <div className="navbar">
      <div className="logo">
        <h1>Proje Yönetim Uygulaması</h1>
      </div>
      <ul className="navbar-ul">
        {!user && (
          <>
            <li>
              <Link to="/login">Giriş</Link>
            </li>
            <li>
              <Link to="/register">Üye ol</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="logout" onClick={logout}>
                Çıkış
              </button>
            )}
            {isPending && (
              <button className="logout" disabled>
                Çıkış yapılıyor
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
