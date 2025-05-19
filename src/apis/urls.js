export const baseUrl = "http://localhost:3000/";

export const urls = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  sneaker: {
    brands: "/sneaker/brands",
    items: "/sneaker",
    product: (id) => `/sneaker/item/${id}`,
    search: (brand) => `/sneaker?page=1&limit=10&search=${brand}`,
  },
};

// "http://localhost:3000/sneaker?page=1&limit=10&search=nike"
