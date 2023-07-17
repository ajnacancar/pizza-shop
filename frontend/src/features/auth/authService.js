import axios from "axios";
import { ADMIN_DATA, USER_DATA } from "../../data/static_data";

const API_URL = "/user";

// REGISTER USER
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem(USER_DATA, JSON.stringify(response));
  }

  return response.data;
};

//LOGOUT USER
const logout = () => localStorage.removeItem(USER_DATA);

//LOGIN USER
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data && response.data.id) {
    localStorage.setItem(USER_DATA, JSON.stringify(response.data));
  }

  return response.data;
};

//LOGIN USER
const loginAdmin = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data && response.data.id && response.data.is_admin === 1) {
    console.log(response.data)
    localStorage.setItem(ADMIN_DATA, JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  login,
  register,
  logout,
  loginAdmin
};

export default authService;
