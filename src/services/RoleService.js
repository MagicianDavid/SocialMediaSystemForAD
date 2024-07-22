// src/services/RoleService.js
import axios from 'axios';

const ROLE_API_BASE_URL = "http://localhost:8080/api/role";

class RoleService {
    getAllRoles() {
        return axios.get(`${ROLE_API_BASE_URL}/findAll`);
    }

    createRole(role) {
        return axios.post(`${ROLE_API_BASE_URL}/create`, role);
    }

    getRoleById(roleId) {
        return axios.get(`${ROLE_API_BASE_URL}/findById/${roleId}`);
    }

    updateRole(roleId, role) {
        return axios.put(`${ROLE_API_BASE_URL}/update/${roleId}`, role);
    }

    deleteRole(roleId) {
        return axios.delete(`${ROLE_API_BASE_URL}/delete/${roleId}`);
    }
}

export default new RoleService();
