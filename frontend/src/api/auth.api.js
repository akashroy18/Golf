import API from "./axios";

export const login = (data) => API.post("/auth/loginUser", data);
export const register = (data) => API.post("/auth/registerUser", data);
export const logoutUser = () => API.get("/auth/logout");