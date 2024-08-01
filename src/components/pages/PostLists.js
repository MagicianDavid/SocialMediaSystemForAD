import React, { useEffect, useState } from 'react';
import useCurrentUser from '../customhook/CurrentUser';
import Post from '../Classess/Post';
import PostForm from '../Classess/PostForm'
import PC_MsgService from '../../services/PC_MsgService';
const PostList = () => {

    const [posts, setPosts] = useState([]);
    //Need session currentUser.id
    const currentUser = useCurrentUser();

    //Fetch Post by User ID, User Follower
    useEffect(() => {      
        if (currentUser) {
        PC_MsgService.getAllPostsByUserId(currentUser.id)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
        }
    }, [currentUser]);

    const handlePostSubmit = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <div className="contentDiv">
            {/*  Post Form  */}
            {currentUser && <PostForm onSubmit={handlePostSubmit} userId={currentUser.id} />} 
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};



export default PostList;
