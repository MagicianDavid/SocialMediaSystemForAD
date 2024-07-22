// src/components/employee/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import RoleService from '../../services/RoleService';
import AuthService from '../../services/AuthService';
import {useAuth} from "../../services/AuthContext";
import PasswordUtils from '../../utils/pwdEncryption';


const EmployeeForm = () => {
    const { currentUser,setCurrentUser } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        phoneNum: '',
        joinDate: '',
        role: { id: '' },
        auth: { id: '' },
    });
    const [roles, setRoles] = useState([]);
    const [auths, setAuths] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        RoleService.getAllRoles().then((response) => {
            setRoles(response.data);
        });

        AuthService.getAllAuths().then((response) => {
            setAuths(response.data);
        });

        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                let employeeData = response.data;
                setEmployee({
                    ...employeeData,
                    role: employeeData.role || { id: '' },
                    auth: employeeData.auth || { id: '' },
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePwdChange = (e) => {
        const pwd = PasswordUtils.encryptUserPassword(e.target.value);
        setEmployee((prevState) => ({
            ...prevState,
            password: pwd,
        }));
    };

    const handleRoleChange = (e) => {
        const roleId = e.target.value;
        const selectedRole = roles.find(role => role.id === parseInt(roleId));
        setEmployee((prevState) => ({
            ...prevState,
            role: selectedRole,
        }));
    };

    const handleAuthChange = (e) => {
        const authId = e.target.value;
        const selectedAuth = auths.find(auth => auth.id === parseInt(authId));
        setEmployee((prevState) => ({
            ...prevState,
            auth: selectedAuth,
        }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // in situations like when the admin login the system and want to change his/her
    // own auth ,the navigation bar and url should change immediately when he clicks
    // the update button, in other words:
    // the employee should be the one who has logged and also the one being updated
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (id) {
            EmployeeService.updateEmployee(id, employee).then(() => {
                const { auth, username } = employee;  // retrieve id & auth
                // if the updated employee is the one who logging in
                if(currentUser.username === username){
                    setCurrentUser(JSON.stringify({ id, auth, username }));
                    sessionStorage.setItem('currentUser', JSON.stringify({ id, auth, username }));
                }
                navigate('/employees');
            });
        } else {
            EmployeeService.createEmployee(employee).then(() => {
                navigate('/employees');
            });
        }
    };

    const cancel = () => {
        navigate('/employees');
    };

    return (
        <div>
            <h2>{id ? 'Update Employee' : 'Add Employee'}</h2>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={employee.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={showPassword ? PasswordUtils.decryptUserPassword(employee.password) : '•'.repeat(PasswordUtils.decryptUserPassword(employee.password).length)}
                        onChange={handlePwdChange}
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input type="text" name="phoneNum" value={employee.phoneNum} onChange={handleChange}/>
                </div>
                <div>
                <label>Join Date: </label>
                    <input type="date" name="joinDate" value={employee.joinDate} onChange={handleChange}/>
                </div>
                <div>
                    <label>Role: </label>
                    <select name="role" value={employee.role.id} onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Auth: </label>
                    <select name="auth" value={employee.auth.id} onChange={handleAuthChange}>
                        <option value="">Select Auth</option>
                        {auths.map(auth => (
                            <option key={auth.id} value={auth.id}>{auth.rank}</option>
                        ))}
                    </select>
                </div>
                <button onClick={saveOrUpdateEmployee}>{id ? 'Update' : 'Save'}</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
