import axios from 'axios';
import authHeader from './auth-header';
const URL = 'http://localhost:8080/api/plan/';

class PlanService {
  getPlanByUser(userId) {
    return axios.post(URL + 'all_by_user', {id: userId}, {headers: authHeader()});
  }
  getAllUsers() {
    return axios.get(URL + 'all', {headers: authHeader()});
  }
  getDeactiveUsers() {
    return axios.get(URL + 'deactiveall', {headers: authHeader()});
  }
  getActiveUsers() {
    return axios.get(URL + 'activeall', {headers: authHeader()});
  }
  getOneUser(userId) {
    return axios.post(URL + 'one', {id: userId}, {headers: authHeader()});
  }

  setActive(userId, active, investment) {
    return axios
      .post(URL + "setActive", {id: userId, active: active, investment:investment}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(userId) {
    return axios
      .post(URL + "delete", {id: userId}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(user) {
    return axios
      .post(URL + "update", user, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  updatePassword(user) {
    return axios
      .post(URL + "updatePassword", user, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  getBank(userId) {
    return axios.post(URL + 'bank', {user_id: userId}, {headers: authHeader()});
  }
  bankUpdate(data) {
    return axios
      .post(URL + "bankUpdate", data, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
}

export default new PlanService();
