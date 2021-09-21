import axios from "axios";
const qs = require("qs");

// Authentication
export const Authentication = (account) => {
  return axios
    .post(
      "http://localhost:5000/login",
      qs.stringify({ userName: account.userName, password: account.password })
    )
    .then((res) => res.data.flag);
};

// Category
export const RegisterCategory = (categoryName) => {
  return axios
    .post(
      "http://localhost:5000/categories",
      qs.stringify({ categoryName: categoryName })
    )
    .then((res) => res.data.flag);
};

  export const GetCategories = () => {
    return axios
      .get("http://localhost:5000/categories")
      .then((res) => res.data.response);
  };
