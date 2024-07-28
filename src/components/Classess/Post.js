import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon, FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';
import ReportButton from '../button_utils/ReportButton';

const Post = ({ post }) => {
    const navigate = useNavigate();

    console.log('Rendering post:', post); // Add this line to inspect the post object

    if (!post) {
        return null; // Add a safeguard in case post is undefined
    }

    const getPostDetails = (id) => {
        navigate(`/posts/${post.id}`, { state: { post } });
        console.log(`Detail post with id: ${id}`);
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
        <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 style={{ margin: '0', padding: '0' }}>User ID: {post.user_id.username}</h3> {/* Use optional chaining */}
                        <h5 className="text-muted" style={{ margin: '0', padding: '0' }}>{post.timestamp}</h5>
                    </div>
                </div>
                <p className="card-text">{post.content}</p>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <IconButton aria-label="comments" sx={{ mr: 1 }} onClick={() => getPostDetails(post.id)}>
                            <CommentIcon />
                        </IconButton>{post.comments?.length || 0} {/* Use optional chaining */}
                        <IconButton aria-label="likes" sx={{ ml: 2 }} onClick={handleLikeClick}>
                            <FavoriteIcon />
                        </IconButton>{post.likes}
                    </div>
                    <ReportButton
                        userId={post.user?.id}
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
