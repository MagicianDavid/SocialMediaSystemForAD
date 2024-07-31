import React, { useEffect, useState } from 'react';
import Post from '../Classess/Post';
import PostForm from '../Classess/PostForm'
import PostService from '../../services/PostService';

const PostList = () => {

    //API Call
    const [posts, setPosts] = useState([]);

    //Fetch Post by User ID, User Follower
    useEffect(() => {
        PostService.getAllPosts()
            .then(response => {
                //console.log('Fetched posts:', response.data); // Log the response data
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    // Example posts data
    // const [posts, setPosts] = useState([
    //     {
    //         id: 1,
    //         user_id: 101,
    //         content: 'This is the first post.',
    //         timestamp: '2023-07-01',
    //         visibility: 'public',
    //         status: 'active',
    //         likes: 10,
    //         comments: [
    //             { id: 1, user_id: 105, content: 'This is the first comment.', timestamp: '2023-07-01', visibility: 'public', status: 'active', likes: 2 },
    //             { id: 2, user_id: 105, content: 'This is the second comment.', timestamp: '2023-07-02', visibility: 'private', status: 'inactive', likes: 2 },
    //             { id: 3, user_id: 105, content: 'This is the third comment.', timestamp: '2023-07-03', visibility: 'public', status: 'active', likes: 5 },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         user_id: 102,
    //         content: 'This is the second post.',
    //         timestamp: '2023-07-02',
    //         visibility: 'private',
    //         status: 'inactive',
    //         likes: 5,
    //         comments: [
    //             { id: 4, user_id: 106, content: 'This is another comment.', timestamp: '2023-07-04', visibility: 'public', status: 'active', likes: 3 },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         user_id: 103,
    //         content: 'This is the third post.',
    //         timestamp: '2023-07-03',
    //         visibility: 'public',
    //         status: 'active',
    //         likes: 7,
    //         comments: [],
    //     },
    // ]);

    const handlePostSubmit = (newPost) => {
        // const newPost = {
        //     id: posts.length + 1,
        //     user_id: 104, // Replace with actual user session id
        //     content: content,
        //     timestamp: new Date().toISOString(),
        //     visibility: 'public',
        //     status: 'active',
        //     likes: 0,
        //     comments: [],
        // };
        setPosts([...posts, newPost]);
    };

    return (
        <div className="contentDiv">
            {/*  Post Form  */}
            <PostForm onSubmit={handlePostSubmit} /> 
            
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};



export default PostList;
