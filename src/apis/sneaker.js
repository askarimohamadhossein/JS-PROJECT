import { generateHttpClient } from "./client";
import { urls } from "./urls";

export const brands = async () => {
  const response = await generateHttpClient().get(urls.sneaker.brands);
  console.log(response);
  return response;
};

export const sneakers = async (query) => {
  const response = await generateHttpClient().get(urls.sneaker.items + query);
  // console.log(response.data);
  console.log(response);

  return response.data;
};

export const deatilSneaker = async (sneakerId) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.sneaker.product(sneakerId));
  return response.data;
};

export const searchParametr = async (brand) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.sneaker.search(brand));
  return response.data;
};
