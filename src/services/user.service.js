import axios from 'axios';
import authHeader from './auth-header';
const URL = 'https://xcapitalsc.herokuapp.com/api/user/';

class UserService {
  // getPublicContent() {
  //   return axios.get(AUTH_URL + 'all');
  // }
  // getUserBoard() {
  //   return axios.get(AUTH_URL + 'user', { headers: authHeader() });
  // }
  // getAdminBoard() {
  //   return axios.get(AUTH_URL + 'admin', { headers: authHeader() });
  // }
  getAllUsers() {
    return axios.get(URL + 'all', {headers: authHeader()});
  }
  setActive(userId, active) {
    return axios
      .post(URL + "setActive", {id: userId, active: active}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
}

export default new UserService();
