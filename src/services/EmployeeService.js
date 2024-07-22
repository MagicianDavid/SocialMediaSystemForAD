import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employee";

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

    deleteEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/delete/${employeeId}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeeService();
