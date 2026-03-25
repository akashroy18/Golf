import API from "./axios";

export const createOrder = (data) =>
  API.post("/payment/create-order", data);

export const verifyPayment = (data) =>
  API.post("/payment/verify", data);