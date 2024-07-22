// src/components/auth/LoginForm.js
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LoginService from '../../services/LoginService';
import {useAuth} from "../../services/AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && currentUser.auth) {
            navigate('/dashboard');
        }
    }, [currentUser,navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        LoginService.login(username, password).then().catch(() => {
            setError('Invalid username or password');
        });

    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Login</button>
                <br></br>
                <Link to={"/register"}>Haven't Signed in yet? Register Now!</Link>
            </form>
        </div>
    );
};

export default LoginForm;
