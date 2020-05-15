const dotenv = require('dotenv');
dotenv.config();
const { API_URL } = process.env;

import axios from "axios";

const AUTH_URL = `${API_URL}auth/`;
class AuthService {
    login(email, password) {
      return axios
        .post(AUTH_URL + "signin", {
          email,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(full_name, email, password) {
      return axios.post(AUTH_URL + "signup", {
        full_name,
        email,
        password
      });
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();