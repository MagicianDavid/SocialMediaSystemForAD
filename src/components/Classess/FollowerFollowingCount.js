import React from 'react';
import { useNavigate } from 'react-router-dom';

const FollowerFollowingCount = ({ userId, followingCount, followerCount }) => {
    const navigate = useNavigate();


    
    const handleClick = () => {
        navigate(`/${userId}/friends`);
    };

    return (
        <p style={{ margin: '0', cursor: 'pointer' }} onClick={handleClick}>
            {followingCount} Following {followerCount} Follower
        </p>
    );
};

export default FollowerFollowingCount;
