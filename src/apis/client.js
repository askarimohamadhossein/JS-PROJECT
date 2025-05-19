import axios from "axios";
import { tokenName } from "../libs/constants";
import { baseUrl } from "./urls";

export const generateHttpClient = () => {
  return axios.create({
    baseURL: baseUrl,
    headers: { Authorization: localStorage.getItem(tokenName) },
  });
};
