import axios from "axios";

const API_URL = "http://localhost:5000/api/data";

const getData = () => {
  return axios.get(API_URL);
};

export default {
  getData,
};
