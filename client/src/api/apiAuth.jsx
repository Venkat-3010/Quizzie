import axios from "axios";
const authUrl = "http://localhost:3010/api/user";

const authRegister = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${authUrl}/register`, {
      name,
      email,
      password,
    });
    console.log("response", response.data);
    return;
  } catch (error) {
    console.log("error", error);
    alert('Something went wrong', error.message);
  }
};

const authLogin = async ({ email, password }) => {
    try {
        const response = await axios.post(`${authUrl}/login`, {
            email,
            password 
        }
    );
    console.log("response", response.data);
    if(response.data?.token){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
    }
    console.log("response", response.data);
    return response.data;
    }catch(error){
        console.log("error", error);
        alert('Something went wrong', error.message);
    }
};

export { authLogin, authRegister};
