import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon, FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';
import ReportButton from '../button_utils/ReportButton'


const Post = ({ post }) => {
    const navigate = useNavigate();

    const getPostDetails = (id) => {
        navigate(`/posts/${post.id}`, { state: { post } });
        console.log(`Detail post with id: ${id}`);
    };

    const reportPost = (id) => {
        //navigate(`/report/${id}`);
    };

    const handleLikeClick = (event) => {
        event.stopPropagation();
        // Handle like logic here
        console.log('Liked post:', post.id);
    };

    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
        
    };

    return (
        <div className="card" style={{ marginBottom:'20px'}}>

            <div className="card-body">
            <div className="d-flex justify-content-between" >
                <div>
                    <h3 style={{ margin: '0', padding: '0' }}>User ID: {post.user_id}</h3>
                    <h5 className="text-muted" style={{ margin: '0', padding: '0' }}>{post.timestamp}</h5>
                </div>
            </div>
            <p className="card-text">{post.content}</p>
            <hr />
            <div className="d-flex justify-content-between">
                <div>
                    <IconButton aria-label="comments" sx={{ mr: 1 }} onClick={() => getPostDetails(post.id)} >
                        <CommentIcon />
                    </IconButton>{post.comments.length}
                    <IconButton aria-label="likes" sx={{ ml: 2 }} onClick={handleLikeClick}>
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

        </div>
        </div>

    );
};



export default Post;
