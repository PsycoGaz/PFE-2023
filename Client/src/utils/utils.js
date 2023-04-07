import axios from "axios";
//get token from local storage

const newRequest = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,

});

export default newRequest;