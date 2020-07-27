import axios from 'axios';
import authHeader from './auth-header';
import authMultipartHeader from './auth-multipart-header';
import download from 'js-file-download';

const URL = 'http://localhost:8080/api/user/';


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
  downloadUserContract() {
    return axios.post(URL + "download_user_contract", {}, {headers: authHeader(),responseType: 'blob'})
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
}

export default new UserService();
