// src/components/employee/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data);
        });
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(() => {
            setEmployees(employees.filter(employee => employee.id !== id));
        });
    };

    const editEmployee = (id) => {
        navigate(`/employees/edit/${id}`);
    };

    const addEmployee = () => {
        navigate('/employees/add');
    };

    return (
        <div>
            <h2>Employee List</h2>
            <button onClick={addEmployee}>Add Employee</button>
            {employees.length === 0 ? (
                <p>No employees found</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>PhoneNumber</th>
                        <th>JoinDate</th>
                        <th>Role</th>
                        <th>Auth</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.username}</td>
                            <td>{employee.phoneNum}</td>
                            <td>{employee.joinDate}</td>
                            <td>{employee.role ? employee.role.type : 'No Role'}</td>
                            <td>{employee.auth ? employee.auth.rank : 'No Auth'}</td>
                            <td>
                                <button onClick={() => editEmployee(employee.id)}>Edit</button>
                                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
