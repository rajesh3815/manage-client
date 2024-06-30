import React, { useContext, useEffect, useState } from "react";
import Style from "./Dashboard.module.css";
import logo from "../../assets/codesandbox.svg";
import layout from "../../assets/layout.svg";
import database from "../../assets/database.svg";
import setting from "../../assets/settings.svg";
import logout from "../../assets/Logout.svg";
import Board from "../../components/board/Board";
import Analytics from "../../components/analytics/Analytics";
import Setting from "../../components/setting/Setting";
import Logout from "../../components/logoutmodal/Logout";
import { useNavigate } from "react-router-dom";
import { taskContext } from "../../TaskContext";
import Deletmodal from "../../components/deletmodal/Deletmodal";
const Dashboard = () => {
  const { deletmodalOpen, setDeletmodalOpen } = useContext(taskContext);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }
  }, []);
  const [activeMenu, setActiveMenu] = useState("Board");
  const [isLogout, setIsLogout] = useState(false);
  const renderContent = () => {
    switch (activeMenu) {
      case "Board":
        return <Board />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Setting />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={Style.mainContainer}>
        <div className={Style.menuDiv}>
          <div className={Style.header}>
            {" "}
            <img src={logo} alt="" /> <p>Pro Manage</p>
          </div>
          <span
            onClick={() => setActiveMenu("Board")}
            className={`${Style.chip} ${
              activeMenu === "Board" ? Style.activechip : ""
            }`}
          >
            <img src={layout} alt="" /> <p>Board</p>
          </span>
          <span
            onClick={() => setActiveMenu("Analytics")}
            className={`${Style.chip} ${
              activeMenu === "Analytics" ? Style.activechip : ""
            }`}
          >
            <img src={database} alt="" /> <p>Analytics</p>
          </span>
          <span
            onClick={() => setActiveMenu("Settings")}
            className={`${Style.chip} ${
              activeMenu === "Settings" ? Style.activechip : ""
            }`}
          >
            <img src={setting} alt="" /> <p>Settings</p>
          </span>
          <span onClick={() => setIsLogout(true)} className={Style.chipLogout}>
            <img src={logout} alt="" /> <p>Log out</p>
          </span>
        </div>
        <div className={Style.contentDiv}>{renderContent()}</div>
      </div>
      {isLogout ? <Logout setIsLogout={setIsLogout} /> : ""}
      {deletmodalOpen ? <Deletmodal /> : ""}
    </>
  );
};

export default Dashboard;
