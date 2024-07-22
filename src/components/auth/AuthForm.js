import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import RouteSelectionForm from './RouteSelectionForm';
import {useAuth} from "../../services/AuthContext";

const AuthForm = () => {
    const { id } = useParams();
    const { currentUser,setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        rank: '',
        menuViewJason: '[]',
    });

    // routes controls the whole routes
    // using the structure below:
    const [routes] = useState([
        { path: '/dashboard', component: 'Dashboard', menuName: 'Dashboard'},
        { path: '/employees', component: 'EmployeeList', menuName: 'Employees', children: [
                { path: '/employees', menuName: 'Employee List' },
                { path: '/employees/add', menuName: 'Add Employee' },
                { path: '/employees/edit', menuName: 'Edit Employee' },
            ] },
        { path: '/roles', component: 'RoleList', menuName: 'Roles', children: [
                { path: '/roles', menuName: 'Roles List' },
                { path: '/roles/add', menuName: 'Add Role' },
                { path: '/roles/edit', menuName: 'Edit Role' },
            ] },
        { path: '/auths', component: 'AuthList', menuName: 'Auths', children: [
                { path: '/auths', menuName: 'Auth List' },
                { path: '/auths/add', menuName: 'Add Auth' },
                { path: '/auths/edit', menuName: 'Edit Auth' },
            ] },
    ]);
    const [selectedRoutes, setSelectedRoutes] = useState([]);

    useEffect(() => {
        if (id) {
            AuthService.getAuthById(id).then((response) => {
                const authData = response.data;
                setAuth(authData);
                setSelectedRoutes(JSON.parse(authData.menuViewJason));
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRoutesChange = (newRoutesJson) => {
        setSelectedRoutes(JSON.parse(newRoutesJson));
    };

    const saveOrUpdateAuth = (e) => {
        e.preventDefault();
        const updatedAuth = { ...auth, menuViewJason: JSON.stringify(selectedRoutes) };
        if (id) {
            AuthService.updateAuth(id, updatedAuth).then(() => {
                // update user session if the updated user is the one who logged in
                if(JSON.stringify(currentUser.auth.id) === id){
                    currentUser.auth = updatedAuth;
                    console.log("newUser",currentUser);
                    setCurrentUser(JSON.stringify(currentUser));
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
                navigate('/auths');
            });
        } else {
            AuthService.createAuth(updatedAuth).then(() => {
                navigate('/auths');
            });
        }
    };

    const cancel = () => {
        navigate('/auths');
    };

    const getAllPaths = (routes) => {
        return routes.flatMap(route => {
            const childrenPaths = route.children ? getAllPaths(route.children) : [];
            return [route.path, ...childrenPaths];
        });
    };

    return (
        <div>
            <h2>{id ? 'Update Auth' : 'Add Auth'}</h2>
            <form onSubmit={saveOrUpdateAuth}>
                <div>
                    <label>Rank: </label>
                    <input type="text" name="rank" value={auth.rank} onChange={handleChange} />
                </div>
                <div>
                    <RouteSelectionForm
                        routes={routes}
                        initialSelectedRoutes={getAllPaths(selectedRoutes)}
                        onChange={handleRoutesChange}
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Save'}</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AuthForm;
