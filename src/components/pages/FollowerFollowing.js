// FollowerFollowing.js
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserList from '../Classess/UsersList';


const FollowerFollowing = () => {
    // Sample data for users
    const initialFollowingUsers = [
        { id: 1, description: 'Following User 1 description', isFollowing: true },
        { id: 2, description: 'Following User 2 description', isFollowing: true },
        { id: 3, description: 'Following User 3 description', isFollowing: true },
        // Add more following users as needed
    ];

    const initialFollowerUsers = [
        { id: 4, description: 'Follower User 1 description', isFollowing: false },
        { id: 5, description: 'Follower User 2 description', isFollowing: false },
        { id: 6, description: 'Follower User 3 description', isFollowing: false },
        // Add more follower users as needed
    ];

    const [tabIndex, setTabIndex] = useState('following');
    const [followingUsers, setFollowingUsers] = useState(initialFollowingUsers);
    const [followerUsers, setFollowerUsers] = useState(initialFollowerUsers);

    const handleFollow = (userId) => {
        setFollowingUsers(followingUsers.map(user =>
            user.id === userId ? { ...user, isFollowing: true } : user
        ));
        setFollowerUsers(followerUsers.map(user =>
            user.id === userId ? { ...user, isFollowing: true } : user
        ));
    };

    const handleUnfollow = (userId) => {
        setFollowingUsers(followingUsers.map(user =>
            user.id === userId ? { ...user, isFollowing: false } : user
        ));
        setFollowerUsers(followerUsers.map(user =>
            user.id === userId ? { ...user, isFollowing: false } : user
        ));
    };

    const handleTabChange = (selectedTab) => {
        setTabIndex(selectedTab);
    };

    //remove users from followers
    //add users to block lists (followers / Others)
    //report user id


    const displayedUsers = tabIndex === 'following' ? followingUsers : followerUsers;

    
    return (
        <div className='contentDiv'>
            <h2>Followers and Following</h2>
            <Tabs
                id="follower-following-tabs"
                activeKey={tabIndex}
                onSelect={handleTabChange}
                className="mb-3"
            >
                <Tab eventKey="following" title="Following">
                    <UserList users={displayedUsers} onFollow={handleFollow} onUnfollow={handleUnfollow} />
                </Tab>
                <Tab eventKey="followers" title="Followers">
                    <UserList users={displayedUsers} onFollow={handleFollow} onUnfollow={handleUnfollow} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default FollowerFollowing;