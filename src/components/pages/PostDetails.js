import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

import CommentList from '../Classess/CommentList';
import CommentForm from '../Classess/CommentForm'; 
import TagLists from '../Classess/taglists';
import ReportButton from '../button_utils/ReportButton'
import PC_MsgService from '../../services/PC_MsgService';
import LikeButton from '../button_utils/LikeButton';


import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch post and comments concurrently
        PC_MsgService.getPostById(id)
        .then(response => {
            console.log('Fetched post:', response.data);
            setPost(response.data.pcmsg);
            setComments(response.data.comments);
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
                        <h3 style={{ margin: '0', padding: '0' }}>{post.user.name}</h3>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="comments" sx={{ mr: 1 }}>
                            <CommentIcon />
                        </IconButton>{comments.length}
                        <LikeButton  userId={post.user?.id} msgId={post.id}/>

                    </div>
                    <ReportButton
                        userId={post.user_id}
                        reportId={post.id}
                        onReportSubmit={handleReportSubmit}
                    />
                </div>
                <hr />
                <p>{post.Comment}</p>
                {/* Comment Form */}
                <CommentForm sourceId={post.id} onCommentSubmit={handleCommentSubmit} userId={4} />

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
