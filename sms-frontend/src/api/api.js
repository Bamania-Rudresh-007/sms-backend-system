import axios from "axios";

const API = axios.create({baseURL: "http://localhost:7000/"});

API.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("sms-token"));    

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})



export default API;