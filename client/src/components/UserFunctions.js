import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((res) => {
      console.log(res.data);
      return res;
    });
};

export const login = (user) => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("userToken", res.data.userToken);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
