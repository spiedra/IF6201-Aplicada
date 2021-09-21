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
export const RegisterCategory = async (categoryName) => {
  try {
    return await axios
      .post(
        "http://localhost:5000/categories",
        qs.stringify({ categoryName: categoryName })
      )
      .then((res) => res.data.flag);
  } catch (err) {
    console.log(err.message);
  }
};

export const GetCategories = async () => {
  try {
    return await axios
      .get("http://localhost:5000/categories")
      .then((res) => res.data.response);
  } catch (err) {
    console.log(err.message);
  }
};

export const DeleteCategory = async (id) => {
  try {
    return await axios
      .delete("http://localhost:5000/categories", { data: { categoryId: id } })
      .then((res) => res.data.flag);
  } catch (err) {
    console.log(err.message);
  }
};

export const UpdateCategory = async (category) => {
  try {
    return await axios
      .put(
        "http://localhost:5000/categories",
        qs.stringify({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        })
      )
      .then((res) => res.data.flag);
  } catch (err) {
    console.log(err.message);
  }
};

// Product
export const SearchProductGet = (id) => {
  return axios
    .get("http://localhost:5000/products/" + id)
    .then((res) => res.data);
};
