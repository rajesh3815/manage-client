import React, { useEffect, useState } from "react";
import Style from "./Setting.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { getuser, updateUser } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Setting = () => {
  const nav = useNavigate();
  const [togglPassword, setTogglPassword] = useState(false);
  const [togglPasswordc, setTogglPasswordc] = useState(false);
  const [togglEmail, setTogglEmail] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    password: "",
    oldpassword: "",
    email: "",
  });
  const [errordata, setErrordata] = useState({
    name: "",
    password: "",
    email: "",
    oldpassword: "",
  });
  useEffect(() => {
    gettingData();
  }, []);
  const gettingData = async () => {
    const data = await getuser();
    setFormdata({
      name: data.name,
      email: data.email,
      password: "",
      oldpassword: "",
    });
  };
  const changeHandeler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const updateHandeler = async (e) => {
    e.preventDefault();
    if (formData.password.trim() !== "" || formData.oldpassword.trim() !== "") {
      if (formData.password.trim() === "") {
        setErrordata((prev) => {
          return { ...prev, password: "password cant be empty" };
        });
        return;
      } else if (formData.oldpassword.trim() === "") {
        setErrordata((prev) => {
          return { ...prev, password: "Oldpassword cant be empty" };
        });
        return;
      }
      if (formData.password === formData.oldpassword) {
        // console.log(formData.password, formData.oldpassword);
        setErrordata((prev) => {
          return { ...prev, password: "password cant be same" };
        });
        return;
      } else {
        setErrordata((prev) => {
          return { ...prev, password: "" };
        });
      }
    }
    setErrordata({ name: "", password: "", email: "", oldpassword: "" });
    if(formData.name!==""){
      localStorage.setItem("UserName",formData.name)
    }
    await updateUser(formData);
    toast.success("updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    if (formData.email !== "" || formData.password !== "") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("UserEmail");
      localStorage.removeItem("UserName");
      nav("/");
    }

    // console.log(formData);
  };
 
  return (
    <div className={Style.container}>
      <p className={Style.head}>Settings</p>
      <form onSubmit={updateHandeler}>
        <div className={Style.inputDiv}>
          <span style={{ marginTop: "4px" }}>
            <IoPersonOutline
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
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
        <p style={{ color: "red", marginBottom: "10px" }}>{errordata.name}</p>
        <div className={Style.inputDiv}>
          <span style={{ marginTop: "3px" }}>
            <CiMail
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type={togglEmail ? "text" : "password"}
            placeholder="Updated Email"
            name="email"
            value={formData.email}
            onChange={changeHandeler}
          />
          <span style={{ marginTop: "4px" }}>
            {togglEmail ? (
              <IoEyeOffOutline
                onClick={() => setTogglEmail(false)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              <IoEyeOutline
                onClick={() => setTogglEmail(true)}
                style={{
                  color: "gray",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            )}
          </span>
        </div>
        <p style={{ color: "red", marginBottom: "10px" }}>{errordata.email}</p>
        <div className={Style.inputDiv}>
          <span>
            <CiLock
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type={togglPasswordc ? "text" : "password"}
            placeholder="Old Password"
            name="oldpassword"
            value={formData.oldpassword}
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
          {errordata.oldpassword}
        </p>

        <div className={Style.inputDiv}>
          <span>
            <CiLock
              style={{ color: "gray", width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <input
            type={togglPassword ? "text" : "password"}
            placeholder="New Password"
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
          <button className={Style.btn}>Update</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Setting;
