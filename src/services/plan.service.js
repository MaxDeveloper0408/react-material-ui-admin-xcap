import axios from 'axios';
import authHeader from './auth-header';
const URL = 'http://localhost:8080/api/plan/';

class PlanService {
  getPlanByUser(userId) {
    return axios.post(URL + 'all_by_user', {user_id: userId}, {headers: authHeader()});
  }
}

export default new PlanService();
