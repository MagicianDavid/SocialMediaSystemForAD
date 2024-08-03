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
        console.log(currentUser.id)
        PC_MsgService.findAllPosts()
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
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
            <h3> Trending </h3>
            {/*  Post Form  */}
            {currentUser && <PostForm onSubmit={handlePostSubmit} userId={currentUser.id} />} 
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};



export default PostList;
