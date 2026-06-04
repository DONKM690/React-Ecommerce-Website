import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002",
});

// PRODUCTS
export const addProduct = (product) => API.post("/products", product);
export const getProducts = () => API.get("/products");
export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

// ORDERS
export const addOrder = (order) => API.post("/orders", order);
export const getOrders = () => API.get("/orders");
export const deleteOrder = (id) => API.delete(`/orders/${id}`);