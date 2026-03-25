import API from "./axios";

export const addScore = (data) => API.post("/scores/addScore", data);
export const getScores = () => API.get("/scores/getScores");