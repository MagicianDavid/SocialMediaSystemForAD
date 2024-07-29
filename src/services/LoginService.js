// src/services/LoginService.js
import axios from 'axios';
import PasswordUtils from '../utils/pwdEncryption';

const API_URL = 'http://localhost:8080/api/user/';

const login =(username, password) => {
    password = PasswordUtils.encryptUserPassword(password);
    return axios.post(API_URL + 'login', {
        username,
        password
    }).then(response => {
        if (response.status === 200) {
            const { id, auth, username } = response.data;  // retrieve id & auth
            sessionStorage.setItem('currentUser', JSON.stringify({ id, auth, username }));
            window.location.reload();
        }
        return response.data;
    });
}

const logout=() => {
    sessionStorage.removeItem('currentUser');
}

const register=(name,username, email, password,phoneNum,country,gender)=> {
    password = PasswordUtils.encryptUserPassword(password);
    return axios.post(API_URL + 'register', {
        name,
        username,
        email,
        password,
        phoneNum,
        country,
        gender,
    }).then(response => {
        if (response.status === 200) {
            sessionStorage.setItem('currentUser', JSON.stringify({
                id: response.data.id,
                auth: response.data.auth,
                username: response.data.username
            }));
        }
        return response.data;
    });
}

const getCurrentUser=()=> {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    logout,
    register,
    getCurrentUser
};
