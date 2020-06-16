import React from "react";
import axios from "axios";
const axiosHelper = () => {
  return axios.create({
    baseURL: "http://localhost:4000/api",
    // baseURL: "https://poll--app.herokuapp.com/api",
  });
};

export default axiosHelper;
