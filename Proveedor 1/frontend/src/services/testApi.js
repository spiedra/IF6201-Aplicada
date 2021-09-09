import axios from "axios";
const qs = require("qs");

export const TestPost = (account) => {
  return axios
    .post(
      "http://localhost:5000/login",
      qs.stringify({ userName: account.userName, password: account.password })
    )
    .then((res) => res.data.flag);
};
