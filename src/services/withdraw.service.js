import axios from 'axios';
import authHeader from './auth-header';

const URL = `${process.env.REACT_APP_SERVER_URL}withdraw/`;

// const URL = 'http://localhost:8080/api/withdraw/';
// const AUTH_URL = 'https://xcapfinancial.herokuapp.com/api/withdraw/';


class WithdrawService {
  getAll() {
    return axios.get(URL + 'all', {headers: authHeader()});
  }
  setApprove(id) {
    return axios.post(URL + 'set_approve', {id: id}, {headers: authHeader()});
  }
  delete(id, value) {
    return axios.post(URL + 'delete', {id: id, withdraw_value: value}, {headers: authHeader()});
  }
  getPlanByUser(userId) {
    return axios.post(URL + 'all_by_user', {user_id: userId}, {headers: authHeader()});
  }
  add(add_data) {
    return axios
      .post(URL + "add", add_data, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
  transfer(add_data) {
    return axios
      .post(URL + "transfer", add_data, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
}

export default new WithdrawService();
