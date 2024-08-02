import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/user";

class EmployeeService {

    getAllEmployees() {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/findAll`);
    }

    createEmployee(employee) {
        return axios.post(`${EMPLOYEE_API_BASE_URL}/create`, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/findById/${employeeId}`);
    }

    updateEmployee(employeeId, employee) {
        return axios.put(`${EMPLOYEE_API_BASE_URL}/update/${employeeId}`, employee);
    }

    updateEmployeeStatus(employeeId,status) {
        return axios.put(`${EMPLOYEE_API_BASE_URL}/updateStatus/${employeeId}?status=${status}`);
    }

    blockUser(userId,blockUserId) {
        return axios.put(`${EMPLOYEE_API_BASE_URL}/${userId}/block/${blockUserId}`);
    }

    followUser(userId,followingUserId){
        return axios.post(`${EMPLOYEE_API_BASE_URL}/${userId}/follow/${followingUserId}`);
    }

    unfollowUser(userId,followingUserId){
        return axios.post(`${EMPLOYEE_API_BASE_URL}/${userId}/unfollow/${followingUserId}`);
    }

    getFollowList(userId){
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${userId}/followers`);
    }

    getFollowingList(userId){
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${userId}/followings`);
    }

    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeeService();
