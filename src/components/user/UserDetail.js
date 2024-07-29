// src/components/user/UserDetail.js
import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';

const UserDetail = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            let employeeData = response.data;
            setUser({
                ...employeeData,
                role: employeeData.role || { id: '' },
                auth: employeeData.auth || { id: '' },
            });
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>Social Score:</strong> {user.socialScore}</p>
                    <p><strong>Block List:</strong> {user.blockList}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNum}</p>
                    <p><strong>Join Date:</strong> {user.joinDate}</p>
                    <p><strong>Role:</strong> {user.role ? user.role.type : 'N/A'}</p>
                    <p><strong>Auth:</strong> {user.auth ? user.auth.rank : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
