import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://milanet.homes/api",
  withCredentials: true,
});
