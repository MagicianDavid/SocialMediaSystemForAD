import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserList from '../Classess/UsersList';
import EmployeeService from '../../services/EmployeeService';
import { useParams } from 'react-router-dom';


const TAB_NAMES = {
    FOLLOWING: 'following',
    FOLLOWERS: 'followers',
    BLOCKED: 'blocked',
};

const FollowerFollowing = ({ userId }) => {
    const { id: paramId } = useParams();
    const currentUserId = JSON.parse(sessionStorage.getItem('currentUser')).id;
    const actualUserId = userId || paramId || currentUserId;

    const [tabIndex, setTabIndex] = useState(TAB_NAMES.FOLLOWING);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                let response;
                if (tabIndex === TAB_NAMES.FOLLOWING) {
                    response = await EmployeeService.getFollowingList(actualUserId);
                } else if (tabIndex === TAB_NAMES.FOLLOWERS) {
                    response = await EmployeeService.getFollowList(actualUserId);
                }
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [tabIndex, actualUserId]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
