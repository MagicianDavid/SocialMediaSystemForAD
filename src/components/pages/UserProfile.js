import React, { useEffect, useState } from 'react';
import Post from '../Classess/Post';

const UserProfile = () => {

    //API Call
    // const [posts, setPosts] = useState([]);

    //Fetch Post by User ID
    // useEffect(() => {
    //     // Example fetch from API
    //     fetch('API_ENDPOINT')
    //         .then(response => response.json())
    //         .then(data => setPosts(data))
    //         .catch(error => console.error('Error fetching posts:', error));
    // }, []);


    // Example posts data
    const posts = [
        {
            id: 1,
            user_id: 101,
            content: 'This is the first post.',
            timestamp: '2023-07-01',
            visibility: 'public',
            status: 'active',
            likes: 10,
            comments: [
                { id: 1, user_id: 105, content: 'This is the first comment.', timestamp: '2023-07-01', visibility: 'public', status: 'active', likes: 2 },
                { id: 2, user_id: 105, content: 'This is the second comment.', timestamp: '2023-07-02', visibility: 'private', status: 'inactive', likes: 2 },
                { id: 3, user_id: 105, content: 'This is the third comment.', timestamp: '2023-07-03', visibility: 'public', status: 'active', likes: 5 },
            ],
        },
        {
            id: 2,
            user_id: 101,
            content: 'This is the second post.',
            timestamp: '2023-07-02',
            visibility: 'private',
            status: 'inactive',
            likes: 5,
            comments: [
                { id: 4, user_id: 106, content: 'This is another comment.', timestamp: '2023-07-04', visibility: 'public', status: 'active', likes: 3 },
            ],
        },
        {
            id: 3,
            user_id: 101,
            content: 'This is the third post.',
            timestamp: '2023-07-03',
            visibility: 'public',
            status: 'active',
            likes: 7,
            comments: [],
        },
    ];

    return (
        <div className="contentDiv">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};



export default UserProfile;
