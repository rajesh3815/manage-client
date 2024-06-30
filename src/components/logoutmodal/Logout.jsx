import React, { useEffect } from "react";
import Style from "./Logout.module.css";
import { useNavigate } from "react-router-dom";
const Logout = ({ setIsLogout }) => {
  const nav = useNavigate();

  const logoutHandeler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("UserEmail")
    localStorage.removeItem("UserName");
    nav("/");
  };
  return (
    <div className={Style.mainContainer}>
      <div className={Style.innerDiv}>
        <p>Are you sure you want to Logout?</p>
        <button
          onClick={logoutHandeler}
          style={{
            color: "white",
            background: "rgba(23, 162, 184, 1)",
            marginBottom: "1rem",
          }}
        >
          yes, logout
        </button>
        <button
          onClick={() => setIsLogout(false)}
          style={{
            color: "rgba(207, 54, 54, 1)",
            border: "1px solid rgba(207, 54, 54, 1)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
