import axios from "axios";
const staticUrl = "https://manage-server-pw7w.onrender.com";

export const registerUser = async ({ name, password, email }) => {
  try {
    const res = await axios.post(`${staticUrl}/api/v1/user/register`, {
      name,
      password,
      email,
    });
    console.log(res);
    return res.data.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async ({ password, email }) => {
  try {
    const response = await axios.post(`${staticUrl}/api/v1/user/login`, {
      email,
      password,
    });
    console.log(response.data.status);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("UserName", response.data.name);
    localStorage.setItem("UserEmail", response.data.email);
    localStorage.setItem("userId", response.data.userId);
    return response.data.status;
  } catch (error) {
    console.log(error.response.data.status);
    return error.response.data.status;
  }
};

export const getuser = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/user/getUser`);
    console.log(res);
    return res.data.userData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUser = async ({ name, password, email }) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(`${staticUrl}/api/v1/user/updateUser`, {
      name,
      password,
      email,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
