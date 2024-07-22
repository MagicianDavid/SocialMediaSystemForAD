// src/services/RoleService.js
import axios from 'axios';

const ROLE_API_BASE_URL = "/api/role";

class RoleService {
    getAllRoles() {
        return axios.get(ROLE_API_BASE_URL + "/findAll");
    }

    getRoleById(roleId) {
        return axios.get(ROLE_API_BASE_URL + "/findById/" + roleId);
    }

    createRole(role) {
        return axios.post(ROLE_API_BASE_URL + "/create", role);
    }

    updateRole(roleId, role) {
        return axios.put(ROLE_API_BASE_URL + "/update/" + roleId, role);
    }

    deleteRole(roleId) {
        return axios.delete(ROLE_API_BASE_URL + "/delete/" + roleId);
    }
}

export default new RoleService();
