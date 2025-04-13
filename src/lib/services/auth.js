import API from "@/lib/axios";

export const signup = async (data) => {
  console.log(data);
  return await API.post("/auth/signup", data);
};

export const login = async (data) => {
  return await API.post("/auth/login", data);
};

export const setupVendor = async (data, token) => {
  return await API.post("/vendor/setup", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
