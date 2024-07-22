// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employee/';

class LoginService {
    login(username, password) {
        return axios.post(API_URL + 'login', {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                sessionStorage.setItem('currentUser', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }

    register(username, email, password) {
        return axios.post(API_URL + 'register', {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
}

export default new AuthService();
