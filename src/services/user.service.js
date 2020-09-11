import axios from 'axios';
import authHeader from './auth-header';
import authMultipartHeader from './auth-multipart-header';
import download from 'js-file-download';

const URL = `${process.env.REACT_APP_SERVER_URL}user/`;
// const URL = 'http://localhost:8080/api/user/';
// const AUTH_URL = 'http://localhost:3000/api/user/';


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
  getDeactiveUsers() {
    return axios.get(URL + 'deactiveall', {headers: authHeader()});
  }
  getActiveUsers() {
    return axios.get(URL + 'activeall', {headers: authHeader()});
  }
  getOneUser(userId) {
    return axios.post(URL + 'one', {id: userId}, {headers: authHeader()});
  }

  setActive(formData) {
    return axios
      .post(URL + "setActive", formData, {headers: authHeader()})
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
  getBalance(userId) {
    return axios
      .post(URL + "getBalance", {user_id: userId}, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
  getContractPDFAll() {
    return axios.get(URL + 'contract_all', {headers: authHeader()});
  }
  getContractPDFByUser(user_id) {
    return axios.post(URL + 'contract_by_user',{user_id: user_id}, {headers: authHeader()});
  }
  downloadContract(pdf_path) {
    return axios.post(URL + "download_contract", {pdf_path: pdf_path}, {headers: authHeader(),responseType: 'blob'})
     .then(resp => {
            const content = resp.headers['content-type'];
            download(resp.data, "contract.pdf", content);
     });
  }
  uploadAdminContract(formData) {
    return axios
      .post(URL + "uploadAdminContract", formData, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  uploadUserContract(formData) {
    return axios
      .post(URL + "uploadUserContract", formData, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  downloadUserContract(invest_type) {
    return axios.post(URL + "download_user_contract", {'invest_type': invest_type}, {headers: authHeader(),responseType: 'blob'})
     .then(resp => {
            const content = resp.headers['content-type'];
            download(resp.data, "contract.pdf", content);
     });
  }
  check_cpf_user(cpf) {
    return axios
      .post(URL + "check_cpf_user", {cpf: cpf}, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }

  bank_all(){
    return axios.post(URL + 'bank_all',{}, {headers: authHeader()});
  }
  getAllCaseDeposit() {
    return axios.get(URL + 'all_case_deposit', {headers: authHeader()});
  }
  addFund(data) {
    return axios
      .post(URL + "add_fund", data, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
  setProfit(data){
    return axios
      .post(URL + "setProfit", data, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  getPlanSum(data){
    return axios
      .post(URL + "getPlanSum", data, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  getPlanSumByUser(data){
    return axios
      .post(URL + "getPlanSumByUser", data, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  getExpiredProfitSumByUser(data){
    return axios
      .post(URL + "getExpiredProfitSumByUser", data, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  withdraw_sum_pending() {
    return axios
      .post(URL + "withdraw_sum_pending", {}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  withdraw_sum_paid() {
    return axios
      .post(URL + "withdraw_sum_paid", {}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  active_users_count() {
    return axios
    .post(URL + "active_users_count", {}, {headers: authHeader()})
    .then(response => {
      return response.data;
    });
  }
}

export default new UserService();
