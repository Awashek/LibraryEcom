import baseAxios from "axios";

export const BASE_URL = "http://localhost:7226";

const axios = baseAxios.create({
    baseURL : BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
});

export default axios