import axios from "axios";

export const axiosInstance = axios.create(
    {
        // baseURL: process.env.REACT_APP_URL
        baseURL: "http://attendance.newswise.in"
    }
)