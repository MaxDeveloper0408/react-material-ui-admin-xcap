import axios from 'axios';
import authHeader from './auth-header';
const URL = `${process.env.REACT_APP_SERVER_URL}deposit/`;
// const URL = 'http://localhost:8080/api/deposit/';
// const URL = 'https://xcapfinancial.herokuapp.com/api/deposit/';

class DepositService {
  getAll() {
    return axios.get(URL + 'all', {headers: authHeader()});
  }
  setApprove(data) {
    return axios.post(URL + 'set_approve', data, {headers: authHeader()});
  }
  getDepositByUser(userId) {
    return axios.post(URL + 'all_by_user', {user_id: userId}, {headers: authHeader()});
  }
  addDeposit(add_data) {
    return axios
      .post(URL + "add", add_data, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
}

export default new DepositService();
