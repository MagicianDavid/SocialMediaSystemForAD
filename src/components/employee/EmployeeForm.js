// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                let employee = response.data;
                setName(employee.name);
                setRole(employee.role);
            });
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { name, role };
        if (id) {
            EmployeeService.updateEmployee(id, employee).then(() => {
                navigate('/');
            });
        } else {
            EmployeeService.createEmployee(employee).then(() => {
                navigate('/');
            });
        }
    };

    const cancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>{id ? 'Update Employee' : 'Add Employee'}</h2>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Role: </label>
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <button onClick={saveOrUpdateEmployee}>{id ? 'Update' : 'Save'}</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
