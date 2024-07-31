// src/components/user/UserDetail.js
import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import {useNavigate} from "react-router-dom";

const UserDetail = (id) => {
    const [user, setUser] = useState(null);
    const currentUserId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let findId = id ? id : currentUserId;
        EmployeeService.getEmployeeById(findId).then((response) => {
            let employeeData = response.data;
            setUser({
                ...employeeData,
                role: employeeData.role || { id: '' },
                auth: employeeData.auth || { id: '' },
            });
            if (id) {
                EmployeeService.getEmployeeById(currentUserId).then((response)=>{
                    setIsBlocked(response.data.blockList.includes(id));
                });
            }
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    },[currentUserId,id]);

    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    const toggleBlock = () => {
        // add this user into currentUser's blockList
        // remove this user from currentUser's blockList
        EmployeeService.blockUser(currentUserId,id).then().catch((error) => {
            setError(error.message);
            setLoading(false);
        });
        setIsBlocked(!isBlocked);
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const toggleBack = () => {
        navigate(-1);
    };

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
            {!id ? <></> :
                <div style={{marginTop: '20px'}}>
                    <button onClick={toggleFollow}>
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                    <button onClick={toggleBlock} style={{marginLeft: '10px'}}>
                        {isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button onClick={toggleLike} style={{marginLeft: '10px'}}>
                        {isLiked ? 'Unlike' : 'Like'}
                    </button>
                </div>}
            <button onClick={toggleBack}>
                back
            </button>
        </div>
    );
};

export default UserDetail;
