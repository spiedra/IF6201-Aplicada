import axios from "axios";
const qs = require("qs");

export const TestPost = (account) => {
  return axios
    .post(
      "http://localhost:5000/login",
      qs.stringify({ userName: account.userName, password: account.password })
    )
    .then((res) => res.data.flag)
};

export const RegisterCategoryPost = (category) => {
  var name = category.categoryName;
  return axios
    .post(
      "http://localhost:5000/categories",
      qs.stringify({ categoryName: name})
    )
    .then((res) => res.data.flag)
    .catch((error) => {
      console.log(error);
  });
};

export const SearchProductGet = (id) => {
  return axios
    .get(
      "http://localhost:5000/products/"+id,
    )
    .then((res) => res.data);
};
