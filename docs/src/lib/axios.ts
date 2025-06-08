import axios from "axios";

const axiosInstace = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: "https://api.nusakita.yuefii.site/v2/",
});

export default axiosInstace;
