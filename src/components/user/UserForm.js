// src/components/employee/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import CheckUserThenBanService from '../../services/CheckUserThenBanService';
import RoleService from '../../services/RoleService';
import AuthService from '../../services/AuthService';
import CountryService from '../../services/CountryService';
import {useAuth} from "../../services/AuthContext";
import PasswordUtils from '../../utils/pwdEncryption';
import {getUserAllStatus} from "../../utils/userAllStatus";


const EmployeeForm = () => {
    const { currentUser,setCurrentUser } = useAuth();
    const [statuses, setStatuses]  = useState(getUserAllStatus);
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        username: '',
        country: '',
        blockList: '',
        gender: '',
        socialScore: 120,
        status: 'active',
        password: '',
        phoneNum: '',
        joinDate: '',
        role: { id: '' },
        auth: { id: '' },
    });
    const [roles, setRoles] = useState([]);
    const [auths, setAuths] = useState([]);
    const [countries, setCountries] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const genderOptions = ['Male', 'Female', 'Other'];

    useEffect(() => {
        RoleService.getAllRoles().then((response) => {
            setRoles(response.data);
        });

        AuthService.getAllAuths().then((response) => {
            setAuths(response.data);
        });

        CountryService.getAllCountries().then((response) => {
            const countryNames = response.data.map(country => country.name.common);
            setCountries(countryNames);
        });

        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                let employeeData = response.data;
                setEmployee({
                    ...employeeData,
                    // role: employeeData.role || { id: '' },
                    // auth: employeeData.auth || { id: '' },
                });
            });
        } else {
            // when creating new user, his/her status can only be active
            setStatuses(["active"])
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
                // add changeAndBan APi
                CheckUserThenBanService.updateUserAuthAndNotify(id).then(() => {}).catch((error) => {
                    console.log("Error updating Authorization with userId: "+ id,error);
                });
                EmployeeService.getEmployeeById(id).then((response) => {
                    const { auth,role, username } = response.data;  // retrieve id & auth
                    // if the updated employee is the one who logging in
                    if(currentUser.username === username){
                        setCurrentUser(JSON.stringify({ id, auth,role, username }));
                        sessionStorage.setItem('currentUser', JSON.stringify({ id, auth,role, username }));
                    }
                    navigate('/users');
                }).catch((error) => {
                    console.log("Error fetching User with id: "+ id,error);
                });
            }).catch((error) => {
                console.log("Error Updating User with id: "+ id,error);
            });
        } else {
            EmployeeService.createEmployee(employee).then(() => {
                navigate('/users');
            });
        }
    };

    const cancel = () => {
        navigate('/users');
    };

    return (
        <div>
            <h2>{id ? 'Update User' : 'Add User'}</h2>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Gender: </label>
                    <select name="gender" value={employee.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        {genderOptions.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={employee.username} onChange={handleChange}/>
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
                    <label>Country: </label>
                    <select name="country" value={employee.country} onChange={handleChange}>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
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
                <div>
                    <label>Social Score: </label>
                    <input type="text" name="socialScore" value={employee.socialScore == null ? 0 : employee.socialScore} onChange={handleChange}/>
                </div>
                <div>
                    <label>Status: </label>
                    <select name="status" value={employee.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
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
