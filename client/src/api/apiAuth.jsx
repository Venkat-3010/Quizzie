import axios from "axios";
import {toast} from "react-toastify"
const authUrl = "https://quizzie-33a2.onrender.com/api/user";


const authRegister = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${authUrl}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // console.log("error", error);
    if(error.response && error.response.data.message === "User already exists"){
      toast.warn('User already exists', error.message, {
        theme: 'dark',
        position: 'bottom-right',
      });
    }else {
      toast.warn('Something went wrong', error.message, {
        theme: 'dark',
        position: 'bottom-right',
      });
    }
  }
};

const authLogin = async ( {email, password} ) => {

    try {
        const response = await axios.post(`${authUrl}/login`, {
            email,
            password 
        }
    );
    if(response.data?.token){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data._id);
    }
    return response.data;
    }catch(error){
        console.log("error", error);
        toast.warn('Something went wrong', error.message, {
          theme: 'dark',
          position: 'bottom-right',
        });
    }
};

export { authLogin, authRegister};
