import API from "@/lib/axios";

export const signup = async (data) => {
  console.log(data);
  return await API.post("/auth/signup", data);
};

export const login = async (data) => {
  return await API.post("/auth/login", data);
};
