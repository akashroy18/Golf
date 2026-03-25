import API from "./axios";

export const updateWinnerStatus = (data) => {
  return API.post("/winner/status", data);
};

export const getMyWinnings = () => {
  return API.get("/winner/my");
};