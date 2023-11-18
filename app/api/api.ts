import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
let userId: any

if (typeof window !== "undefined") {
  const user = localStorage.getItem("user");
if (user) {
  const userObj = JSON.parse(user);
  userId = userObj.id;
}

}
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");

  return config;
}, function (error) {
  return Promise.reject(error);
});


const endpoints = {
  // singin endpoing
  signIn: (payload: any) => {
    const method = "post";
    const url = baseURL + "/auth/login";

    return axios({ method, url, data: payload });
  },

  // get userlist endpoint
  getUerInvoice: () => {
      const method = "get";
      const url = baseURL + "/invoice/user/" + userId;

      return axios({ method, url });
    },

  // get Details endpoint
  //   getUerDetails: (payload: string) => {
  //     const method = "get";
  //     const url = baseURL + "/eefab29f-f880-43cb-9d0d-9d3f74d8bb8b/" + payload;

  //     return axios({ method, url });
  //   },
};

export default endpoints;
