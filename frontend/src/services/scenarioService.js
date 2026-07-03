import api from "./api";

export const submitScenario = (data) => {
  api.post("/scenario/submit", data).catch((err) => {
    console.error(err);
  });
};