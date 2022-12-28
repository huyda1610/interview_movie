import axios from "axios";

const APIKey = "c9cd25f64b8dd53646ca63a8079a6d5f";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key:APIKey,
    page: 2,
  },
});

export default axiosClient;