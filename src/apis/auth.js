import { generateHttpClient } from "./client";
import { urls } from "./urls";

export const login = async (body) => {
  if (!username) throw new Error("Username is required");
  if (!password) throw new Error("password is required");
  const responce = await generateHttpClient().post(urls.auth.login, body);
  console.log(responce);
  return responce;
};

export const signup = async (body) => {
  if (!username) throw new Error("Username is required");
  if (!password) throw new Error("password is required");
  const responce = await generateHttpClient().post(urls.auth.signup, body);
  console.log(responce);
  return responce;
};
