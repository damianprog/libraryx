import axios from "axios";

const GoogleApiBase = axios.create({
  baseURL: `https://www.googleapis.com/`,
});

export default GoogleApiBase;
