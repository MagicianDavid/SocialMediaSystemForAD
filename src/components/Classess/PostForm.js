import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';

const PostForm = ({ onSubmit }) => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            content: content,
            imageUrl: null,
            timeStamp: new Date().toISOString(), // Note: changed to timestamp
            visibility: null, // Adjusted to match your data structure
            status: null, // Adjusted to match your data structure
            likes: 0,
            comments: [],
            user: { id: 1 }, // Ensure this matches your backend's expected structure
            tags: []
        };
    
        try {
            const response = await PostService.createPost(post);
            if (onSubmit) {
                onSubmit(response.data);
            }
        } catch (error) {
            console.error("There was an error creating the post!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control mb-3 me-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post here..."
                    required
                />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default PostForm;
