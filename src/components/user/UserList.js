import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import Modal from '../common/Modal';
import './UserList.css';
import LoginService from "../../services/LoginService";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
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
        navigate(`/userProfile/${id}`);
    };

    const notifyEmployee = (id) => {
      navigate(`/sendNotification/${id}`);
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
        <>
            <div className="employee-list-container">
                <h2>User List</h2>
                <div className="actions">
                    <button className="btn add-btn" onClick={addEmployee}>Add User</button>
                </div>
                {employees.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    <table className="employee-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>SocialScore</th>
                            <th>Username</th>
                            <th>JoinDate</th>
                            <th>Role</th>
                            <th>Authorization</th>
                            <th>Status</th>
                            <th>Detail</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.socialScore}</td>
                                <td>{employee.username}</td>
                                <td>{employee.joinDate}</td>
                                <td>{employee.role ? employee.role.type : 'No Role'}</td>
                                <td>{employee.auth ? employee.auth.rank : 'No Auth'}</td>
                                <td>{employee.status}</td>
                                <td>
                                    <button className="btn view-btn" onClick={() => viewEmployee(employee.id)}>View Detail</button>
                                </td>
                                <td>
                                    <button className="btn edit-btn" onClick={() => editEmployee(employee.id)}>Edit
                                    </button>
                                    <button className="btn notify-btn" onClick={() => notifyEmployee(employee.id)}>Notify
                                    </button>
                                    <button className="btn delete-btn"
                                            onClick={() => deleteEmployee(employee.id)}>Delete
                                    </button>
                                    <button className="btn ban-btn"
                                            onClick={() => banEmployee(employee.id, employee.status)}>
                                        {employee.status === "ban" ? "Activate" : "Ban"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmModalAction}
                    title="Confirm Action"
                >
                    <p>Are you sure you want to proceed with this action?</p>
                </Modal>
            </div>
        </>
    );
};

export default EmployeeList;
