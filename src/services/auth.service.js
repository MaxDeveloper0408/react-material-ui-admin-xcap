import axios from "axios";
// const dotenv = require('dotenv');
// dotenv.config('/');
const AUTH_URL = `${process.env.REACT_APP_SERVER_URL}auth/`;

// const AUTH_URL = 'http://localhost:8080/api/auth/';
// const AUTH_URL = 'https://xcapfinancial.herokuapp.com/api/auth/';



class AuthService {
    
    login(login_data) {
      return axios
        .post(AUTH_URL + "signin", login_data)
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
    }
    get_zipcode(zipcode) {
      return axios
        .get('https://viacep.com.br/ws/'+zipcode+'/json')
        .then(response => {
          return response.data;
        });
    }
    logout() {
      localStorage.removeItem("user");
    }
  
    register(register_data) {
      return axios.post(AUTH_URL + "signup", register_data);
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'))
    }
  }
  
  export default new AuthService();
