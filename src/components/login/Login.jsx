import React, { useState } from "react";
import Style from "./Login.module.css";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { loginUser } from "../../auth/auth";
import toast, { Toaster } from "react-hot-toast";
const Login = ({ setToggleLogin }) => {
  const nav = useNavigate();
  const [togglPassword, setTogglPassword] = useState(false);
  const [formData, setFormdata] = useState({
    password: "",
    email: "",
  });
  const [errordata, setErrordata] = useState({
    password: "",
    email: "",
  });

  const changeHandeler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const loginHandeler = async (e) => {
    e.preventDefault();
    const l = e.target.length;
    let flg = false;
    for (let i = 0; i < l - 1; i++) {
      const { name } = e.target[i];

      if (e.target[i].value.trim() === "") {
        flg = true;
        setErrordata((prev) => {
          return { ...prev, [name]: `${name} field is require` };
        });
      } else {
        setErrordata((prev) => {
          return { ...prev, [name]: "" };
        });
      }
    }
    if (flg) return;
    setErrordata({ password: "", email: "" });

    const loginData = await loginUser(formData);
    if (loginData === 400) {
      toast.error("wrong password.")
      // console.log("wrong password");
      return;
    }
    if (loginData === 500) {
      toast.error("user not exist.")
      // console.log("user not exist");
      return;
    }
    nav("/dashboard");
  };

  return (
    <div className={Style.content}>
      <h2
        style={{
          marginBottom: "3rem",
          fontWeight: "500",
          color: "rgba(52, 52, 52, 1)",
        }}
      >
        Log in
      </h2>
      <form onSubmit={loginHandeler}>
        <div className={Style.inputDiv}>
          <span style={{ marginTop: "3px" }}>
            <CiMail
              style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
            />
          </span>
          <input
            type="text"
            placeholder="  Email"
            name="email"
            value={formData.email}
            onChange={changeHandeler}
          />
        </div>
        <p style={{ color: "red" }}>{errordata.email}</p>
        <div className={Style.inputDiv}>
          <span>
            <CiLock
              style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
            />
          </span>
          <input
            type={togglPassword ? "text" : "password"}
            placeholder=" password"
            name="password"
            value={formData.password}
            onChange={changeHandeler}
          />
          <span style={{ marginTop: "4px" }}>
            {togglPassword ? (
              <IoEyeOffOutline
                onClick={() => setTogglPassword(false)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              <IoEyeOutline
                onClick={() => setTogglPassword(true)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            )}
          </span>
        </div>
        <p style={{ color: "red" }}>{errordata.password}</p>
        <div className={Style.formFooter}>
          <button className={Style.btn}>Log in</button>
          <p style={{ color: "gray" }}>Have no account yet?</p>
        </div>
      </form>
      <div>
        <button
          style={{
            background: "white",
            border: "1px solid rgba(23, 162, 184, 1)",
            color: "rgba(23, 162, 184, 1)",
          }}
          className={Style.btn}
          onClick={() => setToggleLogin(false)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
