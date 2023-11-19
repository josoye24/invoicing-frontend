import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const endpoints = {
  // singin endpoing
  signIn: (payload: any) => {
    const method = "post";
    const url = baseURL + "/auth/login";

    return axios({ method, url, data: payload });
  },

  // singup endpoing
  signUp: (payload: any) => {
    const method = "post";
    const url = baseURL + "/auth/signup";

    return axios({ method, url, data: payload });
  },

  // get userlist endpoint
  getUerInvoice: (userId: any) => {
    const method = "get";
    const url = baseURL + "/invoice/user/" + userId;

    return axios({ method, url });
  },

  // create invoice endpoing
  createInvoice: (payload: any) => {
    const method = "post";
    const url = baseURL + "/invoice/create";

    return axios({ method, url, data: payload });
  },
};
export default endpoints;
