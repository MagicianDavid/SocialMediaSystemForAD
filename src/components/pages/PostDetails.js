import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

import CommentList from '../Classess/CommentList';
import CommentForm from '../Classess/CommentForm'; 
import TagLists from '../Classess/taglists';
import ReportButton from '../button_utils/ReportButton'
import PostService from '../../services/PostService';
import CommentService from '../../services/CommentService';


import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch post and comments concurrently
        Promise.all([
            PostService.getPostById(id),
            CommentService.getlistComment(id)
        ])
        .then(([postResponse, commentsResponse]) => {
            console.log('Fetched post:', postResponse.data);
            console.log('Fetched comments:', commentsResponse.data);
            setPost(postResponse.data);
            setComments(commentsResponse.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [id]);

    const handleCommentSubmit = (newComment) => {
        setComments([...comments, newComment]);
    };

    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
    };

    if (!post) {
        return <p>Loading post...</p>;
    }

    return (
        <div className="card mb-3 contentDiv">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 style={{ margin: '0', padding: '0' }}>{post.user_id?.username}</h3>
                        <p className="text-muted" style={{ margin: '0', padding: '0' }}>{post.timeStamp}</p>
                        <span>  
                            <TagLists tagsString={post.tag?.tag || ''} />
                        </span>
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
                        </IconButton>{comments.length}
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

                {/* Comment Form */}
                <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />

                <h3>Comments</h3>
                {comments.length > 0 ? (
                    <CommentList comments={comments} />
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
