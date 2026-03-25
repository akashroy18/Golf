import API from "./axios";

export const getCharities = () => {
  return API.get("/charity");
};

export const selectCharity = (data) => {
  return API.post("/charity/select", data);
};