// src/components/auth/RegisterForm.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../services/LoginService';
import CountryService from "../../services/CountryService";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const genderOptions = ['Male', 'Female', 'Other'];

    // get country list
    useEffect(() => {
        CountryService.getAllCountries().then((response) => {
            const countryNames = response.data.map(country => country.name.common);
            setCountries(countryNames);
        });
    },[]);

    const handleRegister = (e) => {
        e.preventDefault();
        LoginService.register(name,username, email, password,phoneNum).then(() => {
            navigate('/login');
        }).catch(() => {
            setError('Failed to register');
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required/>
                </div>
                <div>
                    <label>Gender: </label>
                    <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        {genderOptions.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Country: </label>
                    <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <div style={{color: 'red'}}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
