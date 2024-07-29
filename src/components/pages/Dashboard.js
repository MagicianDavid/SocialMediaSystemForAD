// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import LoginService from '../../services/LoginService';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();

    const handleLogout = () => {
        LoginService.logout();
        setCurrentUser(null);
        navigate('/login');
        window.location.reload();
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {currentUser && currentUser.auth ? (
                <div>
                    <p>Welcome, {currentUser.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
