import axios from "axios";
const staticUrl = "https://manage-server-pw7w.onrender.com";

export const addPeople = async (people) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${staticUrl}/api/v1/people/assign`, {
      people,
    });
    console.log(res);
    return res.data.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPeople = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/people/getPeople`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createTodo = async (
  title,
  selectedOption,
  dueDate,
  assignPeople,
  tasks
) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${staticUrl}/api/v1/todo/addtodo`, {
      taskName: title,
      priority: selectedOption,
      assignto: assignPeople,
      createdDt: dueDate,
      tasks,
    });
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAlltasks = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/todo/getAlltodo`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/todo/getAnalytics`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTaskbyid = async (id) => {
  try {
    const res = await axios.get(`${staticUrl}/api/v1/todo/gettaskById/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editTask = async (status, id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(`${staticUrl}/api/v1/todo/updateTask/${id}`, {
      status,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getFilterAlltasks = async (filterType) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${staticUrl}/api/v1/todo/getFilterDatas`, {
      params: {
        filterType: filterType,
        assignto: localStorage.getItem("UserEmail"),
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletTasks = async (id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${staticUrl}/api/v1/todo/deletTask/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editTodo = async (
  title,
  selectedOption,
  dueDate,
  assignPeople,
  tasks,
  id
) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(`${staticUrl}/api/v1/todo/editTask/${id}`, {
      taskName: title,
      priority: selectedOption,
      assignto: assignPeople,
      createdDt: dueDate,
      tasks,
    });
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editCheck = async (idx, id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.patch(`${staticUrl}/api/v1/todo/editCheck/${id}`, {
      idx,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
