import API from "./axios";

export const activateSubscription = (data) =>
  API.post("/subscription/activate", data);