import axios from "axios";

const API = axios.create({baseURL: "https://full-stack-sms-project.onrender.com/api"});

API.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("sms-token"));    

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})



export default API;