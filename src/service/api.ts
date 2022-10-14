import axios from "axios";
// import { store } from "../redux/configStore";
// import { showErrorPage } from "../redux/errorPageSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401 && error.response.data.titulo.includes("JWT expired at")) {
    //   store.dispatch(showErrorPage());
    // }

    return Promise.reject(error);
  }
);

export default api;
