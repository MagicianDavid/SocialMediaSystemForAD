// src/components/user/UserDetail.js
import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import useCurrentUser from '../customhook/CurrentUser';
import PC_MsgService from '../../services/PC_MsgService';
import Post from '../Classess/Post';
import FollowerFollowing from '../Classess/FollowerFollowingCount';


import { useParams, useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const UserDetail = () => {
    const { id } = useParams(); // Use useParams to get the id from the URL
    const [user, setUser] = useState(null);
    const currentUser = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if(currentUser)
                try {
                    setLoading(true);
                    const findId = id ? id : currentUser.id;
                    const [employeeResponse, postsResponse] = await Promise.all([
                        EmployeeService.getEmployeeById(findId),
                        PC_MsgService.getAllPostsByUserId(findId)
                    ]);

                    const employeeData = employeeResponse.data;
                    const postsData = postsResponse.data;
                    console.log(currentUser.id);

                    setUser({
                        ...employeeData,
                        role: employeeData.role || { id: '' },
                        auth: employeeData.auth || { id: '' },
                    });

                    setPosts(postsData);

                    if (id) {
                        const currentUserResponse = await EmployeeService.getEmployeeById(currentUser.id);
                        const currentUserData = currentUserResponse.data;
                        if (Array.isArray(currentUserData.blockList)) {
                            setIsBlocked(currentUserData.blockList.includes(id));
                        } else {
                            setIsBlocked(false);
                        }
                    }

                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
        };

        fetchUserData();
    }, [currentUser, id]);


    const toggleFollow = () => {
        if (!currentUser || !id) return; // Add null check

        if (isFollowed) {
            EmployeeService.unfollowUser(currentUser.id, id)
                .then(() => {
                    setIsFollowed(false);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            EmployeeService.followUser(currentUser.id, id)
                .then(() => {
                    setIsFollowed(true);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    const toggleBlock = () => {
        EmployeeService.blockUser(currentUser.id, id).then().catch((error) => {
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
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <IconButton onClick={toggleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 style={styles.headerTitle}>User Profile</h1>
            </div>
            {user && (
                // <div>
                //     <p><strong>ID:</strong> {user.id}</p>
                //     <p><strong>Name:</strong> {user.name}</p>
                //     <p><strong>Email:</strong> {user.email}</p>
                //     <p><strong>Username:</strong> {user.username}</p>
                //     <p><strong>Gender:</strong> {user.gender}</p>
                //     <p><strong>Country:</strong> {user.country}</p>
                //     <p><strong>Status:</strong> {user.status}</p>
                //     <p><strong>Social Score:</strong> {user.socialScore}</p>
                //     <p><strong>Block List:</strong> {user.blockList}</p>
                //     <p><strong>Phone Number:</strong> {user.phoneNum}</p>
                //     <p><strong>Join Date:</strong> {user.joinDate}</p>
                //     <p><strong>Role:</strong> {user.role ? user.role.type : 'N/A'}</p>
                //     <p><strong>Auth:</strong> {user.auth ? user.auth.rank : 'N/A'}</p>
                // </div>
                <div style={styles.profileContainer}>
                    <div style={styles.profileHeader}>
                    <h2 style={{ margin: '0' }}>{user.name}</h2>
                    <p style={{ margin: '0' }}>@{user.username}</p>
                    
                    <p style={{ margin: '0' }}>{user.email} | {user.country} | Joined: {new Date(user.joinDate).toLocaleDateString()} </p>
                    <FollowerFollowing 
                        userId={user.id} 
                    />

                    </div>
                <div style={styles.profileDetails}>
                    
                </div>
                   
                    {/* when user view it own profile, this should not show*/}
                    {(id && id !== currentUser.id) && (
                       <div style={styles.buttonContainer}>
                        <button className="btn btn-primary" style={styles.roundedButton} onClick={toggleFollow}>
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                        <button className="btn btn-secondary" style={styles.roundedButton} onClick={toggleBlock}>
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        {/* <button className="btn btn-success" style={styles.roundedButton} onClick={toggleLike}>
                            {isLiked ? 'Unlike' : 'Like'}
                        </button> */}
                      </div>
                    )}
                </div>
            )}
                <h2>Posts</h2>
                {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}

        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: '10px',
    },
    profileContainer: {
        position: 'relative',  // Ensure the container is relatively positioned
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
    },
    profileHeader: {
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '10px',
    },

    buttonContainer: {
        position: 'absolute',  // Position absolute to the profile container
        top: '22px',
        right: '10px',
        display: 'flex',
        flexDirection: 'row',  // Align buttons side by side
        gap: '10px',  // Space between buttons
    },
    roundedButton: {
        width: '100px',  // Fixed width for uniform button size
        borderRadius: '25px',  // Rounded edges
        padding: '5px',  // Padding for rectangular shape
        textAlign: 'center',  // Center text
    },
};


export default UserDetail;
