// src/components/employee/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import Modal from '../common/Modal';
import './UserProfileModal.css'
// import UserProfileModal from "./UserProfileModal";
import LoginService from "../../services/LoginService";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    // const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
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
        setModalAction(() => () => {
            EmployeeService.updateEmployeeStatus(id,"delete").then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
                closeModal();
            });
            // if moderator is now deleting him/herself once confirm he no longer has the permission to access
            // we will navigate him to login page
            if (id === JSON.parse(sessionStorage.getItem('currentUser')).id) {
                LoginService.logout();
                navigate('/login');
                window.location.reload();
            }
        });
        setIsModalOpen(true);
    };

    const banEmployee = (id,status) => {
        setModalAction(() => () => {
            EmployeeService.updateEmployeeStatus(id,status === "ban" ? "active" : "ban").then(() => {
                loadEmployees();
                closeModal();
            });
        });
        setIsModalOpen(true);
    };

    const editEmployee = (id) => {
        navigate(`/users/edit/${id}`);
    };

    const addEmployee = () => {
        navigate('/users/add');
    };

    const viewEmployee = (id) => {
        // setSelectedEmployee(id);
        navigate(`/userProfile/${id}`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };

    const confirmModalAction = () => {
        if (modalAction) {
            modalAction();
        }
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
                                <button onClick={() => banEmployee(employee.id,employee.status)}>{employee.status === "ban" ? "activate":"ban"}</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {/*{selectedEmployee && (*/}
            {/*    <UserProfileModal id={selectedEmployee} onClose={()=>setSelectedEmployee(null)} />*/}
            {/*)}*/}
            {/* prompt out a modal to ensure moderator want to delete or ban this user*/}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmModalAction}
                title="Confirm Action"
            >
                <p>Are you sure you want to proceed with this action?</p>
            </Modal>
        </div>
    );
};

export default EmployeeList;
