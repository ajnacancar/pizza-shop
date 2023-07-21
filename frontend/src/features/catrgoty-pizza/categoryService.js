import axios from "axios";

const API_URL = "/category";

//GET ALL CATEGORIES
const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.categories;
};

//CREATE CATEGORY
const createCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, data, config);
  return response.data;
};

//UPDATE CATEGORY
const updateCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${data.id}`, data, config);
  return response.data;
};

//DELETE CATEGORY
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
