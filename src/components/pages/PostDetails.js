import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import CommentList from '../Classess/CommentList';
import CommentForm from '../Classess/CommentForm'; // Import the CommentForm component
import ReportButton from '../button_utils/ReportButton'

import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon, FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';

const PostDetails = () => {
    const location = useLocation();
    const { post } = location.state;

    //API Call FETCH post ID
    // const { id } = useParams();
    // const [post, setPost] = useState(null);

    // useEffect(() => {
    //     // Fetch post data based on the id from the API or state management
    //     // Example fetch from API:
    //     fetch(`API_ENDPOINT/posts/${id}`)
    //         .then(response => response.json())
    //         .then(data => setPost(data))
    //         .catch(error => console.error('Error fetching post:', error));
    // }, [id]);


    const [comments, setComments] = useState(post.comments);

    const handleCommentSubmit = (newComment) => {
        const newCommentData = {
            id: comments.length + 1,
            user_id: 107, // Example user_id, you might want to use actual logged-in user's id
            content: newComment,
            timestamp: new Date().toISOString(),
            visibility: 'public',
            status: 'active',
            likes: 0,
        };
        setComments([...comments, newCommentData]);
    };

    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
    };
    

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <div className="card mb-3 contentDiv">
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <div>
                    <h5 className="card-title">User ID: {post.user_id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{post.timestamp}</h6>
                </div>
                <div>
                    <Link to="/mainmenu" className="btn btn-outline-secondary btn-sm">Back to Posts</Link>
                </div>
            </div>
            <p className="card-text">{post.content}</p>

            <hr />
            <div className="d-flex justify-content-between">
                <div>
                    <IconButton aria-label="comments" sx={{ mr: 1 }}>
                            <CommentIcon />
                    </IconButton>{post.comments.length}
                    <IconButton aria-label="likes" sx={{ ml: 2 }}>
                            <FavoriteIcon />
                    </IconButton>{post.likes}
                </div>
                <ReportButton
                        userId={post.user_id}
                        reportId={post.id}
                        onReportSubmit={handleReportSubmit}
                    />
            </div>
            <hr />

            {/*  Comment Form  */}
            <CommentForm onSubmit={handleCommentSubmit} />

            <h3>Comments</h3>
            <CommentList comments={comments}/>
            </div>

    </div>
    );
};


export default PostDetails;
