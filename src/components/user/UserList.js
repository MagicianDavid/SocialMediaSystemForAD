// src/components/employee/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import './UserProfileModal.css'
import UserProfileModal from "./UserProfileModal";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            // hide those users been deleted
            setEmployees(response.data);
        });
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(() => {
            setEmployees(employees.filter(employee => employee.id !== id));
        });
    };

    const banEmployee = (id) => {
        EmployeeService.banEmployee(id).then((response) => {loadEmployees()});
    };

    const editEmployee = (id) => {
        navigate(`/users/edit/${id}`);
    };

    const addEmployee = () => {
        navigate('/users/add');
    };

    const viewEmployee = (id) => {
        setSelectedEmployee(id);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={addEmployee}>Add User</button>
            {employees.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        {/*<th>Gender</th>*/}
                        {/*<th>Country</th>*/}
                        <th>SocialScore</th>
                        {/*<th>Email</th>*/}
                        <th>Username</th>
                        {/*<th>PhoneNumber</th>*/}
                        <th>JoinDate</th>
                        <th>Role</th>
                        <th>Auth</th>
                        <th>Status</th>
                        <th>Detail</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            {/*<td>{employee.gender}</td>*/}
                            {/*<td>{employee.country}</td>*/}
                            <td>{employee.socialScore}</td>
                            {/*<td>{employee.email}</td>*/}
                            <td>{employee.username}</td>
                            {/*<td>{employee.phoneNum}</td>*/}
                            <td>{employee.joinDate}</td>
                            <td>{employee.role ? employee.role.type : 'No Role'}</td>
                            <td>{employee.auth ? employee.auth.rank : 'No Auth'}</td>
                            <td>{employee.status}</td>
                            <td>
                                <button onClick={() => viewEmployee(employee.id)}>View Detail</button>
                            </td>
                            <td>
                                <button onClick={() => editEmployee(employee.id)}>Edit</button>
                                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                <button onClick={() => banEmployee(employee.id)}>Ban</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {selectedEmployee && (
                <UserProfileModal id={selectedEmployee} onClose={closeModal} />
            )}
        </div>
    );
};

export default EmployeeList;
