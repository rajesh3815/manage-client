import React, { useState } from "react";
import Style from "./Register.module.css";
import imgRegister from "../../assets/Art.svg";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Login from "../../components/login/Login";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../auth/auth";
const Register = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [togglPassword, setTogglPassword] = useState(false);
  const [togglPasswordc, setTogglPasswordc] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
  });
  const [errordata, setErrordata] = useState({
    name: "",
    password: "",
    email: "",
    confirmpassword: "",
  });
  const changeHandeler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const registerHandeler = async (e) => {
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
    setErrordata({ name: "", password: "", email: "" });
    if (formData.password !== formData.confirmpassword) {
      setErrordata((prev) => {
        return { ...prev, confirmpassword: "password not matching" };
      });
      return;
    } else {
      setErrordata((prev) => {
        return { ...prev, confirmpassword: "" };
      });
    }
    const regData = await registerUser(formData);
    if (regData === 2) {
      // console.log("user Already exist");
      toast.error("user Already exist.")
      return;
    }
    setToggleLogin(true);
   
  };
  return (
    <div className={Style.mainDiv}>
      <div className={Style.leftDiv}>
        <div className={Style.imgDiv}>
          <span className={Style.circle}></span>
          <img src={imgRegister} alt="" />
        </div>
        <div className={Style.descDiv}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "500" }}>
            Welcome aboard my friend{" "}
          </h2>
          <p style={{ marginTop: "10px" }}>
            just a couple of clicks and we start
          </p>
        </div>
      </div>
      <div className={Style.rightMainDiv}>
        {toggleLogin ? (
          <Login setToggleLogin={setToggleLogin} />
        ) : (
          <div className={Style.rightContent}>
            <h2
              style={{
                marginBottom: "3rem",
                fontWeight: "500",
                color: "rgba(52, 52, 52, 1)",
              }}
            >
              Register
            </h2>
            <form onSubmit={registerHandeler}>
              <div className={Style.inputDiv}>
                <span style={{ marginTop: "4px" }}>
                  <IoPersonOutline
                    style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
                  />
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={changeHandeler}
                />
              </div>
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errordata.name}
              </p>
              <div className={Style.inputDiv}>
                <span style={{ marginTop: "3px" }}>
                  <CiMail
                    style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
                  />
                </span>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandeler}
                />
              </div>
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errordata.email}
              </p>
              <div className={Style.inputDiv}>
                <span>
                  <CiLock
                    style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
                  />
                </span>
                <input
                  type={togglPasswordc ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={changeHandeler}
                />
                <span style={{ marginTop: "4px" }}>
                  {togglPasswordc ? (
                    <IoEyeOffOutline
                      onClick={() => setTogglPasswordc(false)}
                      style={{
                        color: "gray",
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  ) : (
                    <IoEyeOutline
                      onClick={() => setTogglPasswordc(true)}
                      style={{
                        color: "gray",
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  )}
                </span>
              </div>
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errordata.confirmpassword}
              </p>

              <div className={Style.inputDiv}>
                <span>
                  <CiLock
                    style={{ color: "gray", width: "1.8rem", height: "1.8rem" }}
                  />
                </span>
                <input
                  type={togglPassword ? "text" : "password"}
                  placeholder="Password"
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
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errordata.password}
              </p>
              <div className={Style.formFooter}>
                <button className={Style.btn}>Register</button>
                <p style={{ color: "gray" }}>Have an account ?</p>
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
                onClick={() => setToggleLogin(true)}
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
