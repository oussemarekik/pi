import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";
let refreshToken = localStorage.getItem("refreshToken");
let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
console.log("refresh token  princibale: ", refreshToken);

//Request
axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("CC_Token");

      if (token) {
        console.log("Token rekik request : " + token);
        axios.defaults.headers.common["authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (refreshToken) {
        axios.defaults.headers.common["authorization"] =
          "Bearer " + refreshToken;
        axios
          .post("http://localhost:5000/api/users/refreshToken/")
          .then((response) => {
            console.log(
              "token dans response : ",
              JSON.stringify(response.data.accessToken)
            );
            /*axios.defaults.headers.common["authorization"] =
              "Bearer " + JSON.stringify(response.data.accessToken);*/
            localStorage.setItem(
              "CC_Token",
              JSON.stringify(response.data.accessToken)
            );
            const token = localStorage.getItem("CC_Token");

            axios.defaults.headers.common["authorization"] = "Bearer " + token;

            return axios(originalRequest);
          });
      }
    }
    return Promise.reject(error);
  }
);
export default axios;
