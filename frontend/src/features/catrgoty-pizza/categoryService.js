import axios from "axios";

const API_URL = "/category";

//GET ALL CATEGORIES
const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.categories;
};

const categoryService = {
  getAllCategories,
};

export default categoryService;
