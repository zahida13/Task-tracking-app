import axios from "axios";

const API_URL = "/api/user/";


// Register User
const register = async (token, userData) => {
  console.log("register")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 

  }
  const  {name, email, password} = userData
  const response = await axios.post('api/user', {name, email, password},  config );
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post("http://localhost:8000/api/user/login", userData);

  if (response.data) {
    const token = response.data.token
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(response.data));

  }

  return response.data;
};

const getAllUser = async (token) => { 
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }

  }
 
  const res = await axios.get("http://localhost:8000/api/user/users", config)
  return res.data
}

const disableUser = async (token, data) => { 
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }

  }
  const { enabled, email } = data
  const enable = !enabled
  const res = await axios.post("http://localhost:8000/api/user/disable", {enable, email}, config)
  return res.data

}

export const logOUt = () => {
  localStorage.removeItem("user");
  localStorage.remove("token")
  window.location.reload()
};
   
const authService = {
  register,
  logOUt,
  login,
  getAllUser,
  disableUser
};

export default authService;