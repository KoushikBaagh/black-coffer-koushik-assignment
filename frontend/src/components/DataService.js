import axios from "axios";

const API_URL = "https://black-coffer-koushik-assignment.onrender.com/api/data";

const getData = () => {
  return axios.get(API_URL);
};

export default {
  getData,
};
