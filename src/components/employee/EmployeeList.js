// src/components/EmployeeList.js
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees() {
        EmployeeService.getAllEmployees().then((response) => {
            this.setState({ employees: response.data });
        }).catch((error) => {
            console.error('There was an error!', error);
        });
    }

    render() {
        const { navigate } = this.props;
        return (
            <div>
                <h2>Employee List</h2>
                <button onClick={() => navigate('/add-employee')}>Add Employee</button>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-employee/${employee.id}`)}>Edit</button>
                                <button onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(() => {
            this.loadEmployees();
        });
    }
}

const EmployeeListWithNavigate = (props) => {
    const navigate = useNavigate();
    return <EmployeeList {...props} navigate={navigate} />;
};

export default EmployeeListWithNavigate;
