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
  
    // create invoice endpoing
    createInvoice: (payload: any) => {
      const method = "post";
      const url = baseURL + "/invoice/create";
  
      return axios({ method, url, data: payload });
    },


};

export default endpoints;
