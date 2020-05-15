const dotenv = require('dotenv');
dotenv.config();
const { API_URL } = process.env;
const AUTH_URL = `${API_URL}test/`;

import axios from 'axios';
import authHeader from './auth-header';



class UserService {
  getPublicContent() {
    return axios.get(AUTH_URL + 'all');
  }
  getUserBoard() {
    return axios.get(AUTH_URL + 'user', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(AUTH_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
