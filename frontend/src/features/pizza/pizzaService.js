import axios from "axios";

const API_URL = "/pizza";

//GET PIZZAS BY CATEGORY
const getPizzasByCategory = async (category) => {
  if (category === "all") {
    const response = await axios.get(`${API_URL}`);
    return response.data.pizzas;
  } else {
    const response = await axios.get(`/pizza/category/${category}`);
    return response.data.pizzas;
  }
};

//GET SINGLE PIZZA
const getSinglePizza = async (pizzaId) => {
  const response = await axios.get(`${API_URL}/${pizzaId}`);
  return response.data.pizza;
};

// ADD NEW PIZZA
const createPizza = async (pizzaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}`, pizzaData, config);
  return response.data;
};

// SEARCH PIZZA
const searchPizza = async (term) => {
  const response = await axios.get(`/pizza?search=${term}`);
  return response.data.pizzas;
};

//GET LATEST

const getLatest = async () => {
  const response = await axios.get(`${API_URL}/new`);
  return response.data.pizzas;
};

//SET RATING
const setRating = async (data) => {
  const response = await axios.post("/rating", data);

  return response.data;
};

//UPDATE PIZZA
const updatePizza = async (pizzaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`/pizza/${pizzaData.id}`, pizzaData, config);
  return response.data;
};

//DELETE PIZZA
const deletePizza = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/pizza/${id}`, config);
  return response.data;
};

const pizzaService = {
  getPizzasByCategory,
  getSinglePizza,
  createPizza,
  searchPizza,
  getLatest,
  setRating,
  updatePizza,
  deletePizza,
};

export default pizzaService;
