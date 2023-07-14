import axios from "axios";


const API_URL = '/user';


// REGISTER USER
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response))
    }


    return response.data
}


//LOGOUT USER
const logout = () => localStorage.removeItem('user');



//LOGIN USER
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData)

    if(response.data && response.data.id){
        localStorage.setItem('user', JSON.stringify(response))
    }


    return response.data
}


const authService = {
    login,
    register,
    logout
}


export default authService;





