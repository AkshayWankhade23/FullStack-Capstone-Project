import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "../Components/Header.module.css";

export default function Header() {
  const location = useLocation();
  return (
    <div className={style.container}>
      <span> Jobfinder </span>
      {location.pathname === "/" && (
        <div>
          <Link to="/login" className={ [style.btn, style.login].join(' ') }>
            Login
          </Link>
          <Link to="/register" className={ [style.btn, style.register].join(' ') }>
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
