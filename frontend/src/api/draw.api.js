import API from "./axios";

export const runDraw = () => {
  return API.post("/draw/run");
};