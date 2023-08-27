import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://healthy-habitude-e3c5ea00252d.herokuapp.com/api/",
});
