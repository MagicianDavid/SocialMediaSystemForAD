import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthContext';

import Post from '../Classess/Post';
import PostForm from '../Classess/PostForm'
import PC_MsgService from '../../services/PC_MsgService';

const PostList = () => {

    const [posts, setPosts] = useState([]);
    //Need session currentUser.id
    const { currentUser } = useAuth();
                        
    //Fetch Post by User ID, User Follower
    useEffect(() => {                      
        PC_MsgService.getAllPostsByUserId(4)
            .then(response => {
                console.log('Fetched posts:', response.data); // Log the response data
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, [currentUser]);


    const handlePostSubmit = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <div className="contentDiv">
            {/*  Post Form  */}
            <PostForm onSubmit={handlePostSubmit} userId={4} /> 
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};



export default PostList;
