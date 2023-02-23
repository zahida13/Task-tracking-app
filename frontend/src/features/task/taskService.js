import axios from "axios";

const API_URL = "api/tasks/";
const token = localStorage.getItem("token");
// Create new GOAL

const createTask = async (goalData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(goalData, token)
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// get all the goals

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

 
const getAllTasks = async (token) => { 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
  }

    const res = await axios.get("http://localhost:8000/api/tasks/all", config);
    return res.data;
}

const updateTaskStatus = async (id, status) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put('http://localhost:8000/api/tasks/' + id, {status}, config);
  return response.data;
 }

const expiredChecker = async () => { }

const getUserTasks = async () => { 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('http://localhost:8000/api/tasks/', config);
  return response.data;
}

const goalServices = {
  createTask,
    getTasks,
    getAllTasks,
  updateTaskStatus,
  expiredChecker,
  getUserTasks
};

export default goalServices;