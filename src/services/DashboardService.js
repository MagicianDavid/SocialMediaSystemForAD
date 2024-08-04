import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dashboard';

class DashboardService {
    getDashboardCounts() {
        return axios.get(`${API_BASE_URL}/counts`);
    }

    getLatest5Report() {
        return axios.get(`${API_BASE_URL}/getLatest5Report`);
    }
    getTop5Posts() {
        return axios.get(`${API_BASE_URL}/Top5Posts`);
    }
    getTop5HotPosts() {
        return axios.get(`${API_BASE_URL}/Top5HotPosts`);
    }
}

export default new DashboardService();
