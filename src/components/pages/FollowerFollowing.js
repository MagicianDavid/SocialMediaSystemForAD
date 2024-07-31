// FollowerFollowing.js
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserList from '../Classess/UsersList';

const TAB_NAMES = {
    FOLLOWING: 'following',
    FOLLOWERS: 'followers',
    BLOCKED: 'blocked',
};

const FollowerFollowing = () => {
    const initialUsers = [
        { id: 1, description: 'Following User 1 description', isFollowing: true, isBlocked: false },
        { id: 2, description: 'Following User 2 description', isFollowing: true, isBlocked: false },
        { id: 3, description: 'Following User 3 description', isFollowing: true, isBlocked: false },
        { id: 4, description: 'Follower User 1 description', isFollowing: false, isBlocked: false },
        { id: 5, description: 'Follower User 2 description', isFollowing: false, isBlocked: false },
        { id: 6, description: 'Follower User 3 description', isFollowing: false, isBlocked: false },
        { id: 7, description: 'Blocked User 1 description', isFollowing: false, isBlocked: true },
        { id: 8, description: 'Blocked User 2 description', isFollowing: false, isBlocked: true },
        { id: 9, description: 'Blocked User 3 description', isFollowing: false, isBlocked: true },
    ];

    const [tabIndex, setTabIndex] = useState(TAB_NAMES.FOLLOWING);
    const [users, setUsers] = useState(initialUsers);

    const handleFollow = (userId) => {
        setUsers(users.map(user => user.id === userId ? { ...user, isFollowing: true } : user));
    };

    const handleUnfollow = (userId) => {
        setUsers(users.map(user => user.id === userId ? { ...user, isFollowing: false } : user));
    };

    const handleBlock = (userId) => {
        setUsers(users.map(user => user.id === userId ? { ...user, isBlocked: true, isFollowing: false } : user));
    };

    const handleUnblock = (userId) => {
        setUsers(users.map(user => user.id === userId ? { ...user, isBlocked: false } : user));
    };

    const handleTabChange = (selectedTab) => {
        setTabIndex(selectedTab);
    };

    const displayedUsers = users.filter(user => {
        if (tabIndex === TAB_NAMES.FOLLOWING) return user.isFollowing && !user.isBlocked;
        if (tabIndex === TAB_NAMES.FOLLOWERS) return !user.isFollowing && !user.isBlocked;
        if (tabIndex === TAB_NAMES.BLOCKED) return user.isBlocked;
        return false;
    });

    return (
        <div className='contentDiv'>
            <h2>Followers and Following</h2>
            <Tabs
                id="follower-following-tabs"
                activeKey={tabIndex}
                onSelect={handleTabChange}
                className="mb-3"
            >
                <Tab eventKey={TAB_NAMES.FOLLOWING} title="Following">
                    <UserList users={displayedUsers} onFollow={handleFollow} onUnfollow={handleUnfollow} onBlock={handleBlock} />
                </Tab>
                <Tab eventKey={TAB_NAMES.FOLLOWERS} title="Followers">
                    <UserList users={displayedUsers} onFollow={handleFollow} onUnfollow={handleUnfollow} onBlock={handleBlock} />
                </Tab>
                <Tab eventKey={TAB_NAMES.BLOCKED} title="Blocked">
                    <UserList users={displayedUsers} onUnblock={handleUnblock} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default FollowerFollowing;
