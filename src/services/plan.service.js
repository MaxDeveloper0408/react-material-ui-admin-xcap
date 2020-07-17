import axios from 'axios';
import authHeader from './auth-header';
const URL = 'http://localhost:8080/api/plan/';

class PlanService {
  getPlanByUser(userId) {
    return axios.post(URL + 'all_by_user', {user_id: userId}, {headers: authHeader()});
  }
  addPlan(add_data) {
    return axios
      .post(URL + "add_plan", add_data, {headers: authHeader()})
      .then(response => {
        return response.data;
    });
  }
}

export default new PlanService();
