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
                console.log('Fetched posts:', response.data); // Log the response data
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);


    const handlePostSubmit = (newPost) => {
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
