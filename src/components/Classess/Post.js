import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Comment as CommentIcon, Favorite as FavoriteIcon, MoreHoriz as MoreHorizIcon, FavoriteBorder as FavoriteBorderIcon} from '@mui/icons-material';
import ReportButton from '../button_utils/ReportButton';
import MoreOption from '../button_utils/moreOption';
import TagLists from './taglists';
import PC_MsgService from '../../services/PC_MsgService';
import LikeButton from '../button_utils/LikeButton';

const Post = ({ post }) => {
    const navigate = useNavigate();
    const [commentCount, setCommentCount] = useState(0);
    const userID = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (post && post.id) {
                    const [countCommentResponse] = await Promise.all([
                        PC_MsgService.getCountCommentsByPostId(post.id),
                        //PC_MsgService.hasUserLikedPost(post.id,userID)
                    ]);
                    setCommentCount(countCommentResponse.data);
                    //setIsLiked(!likestate);
                    console.log('Fetched Comment Count:', countCommentResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [post]);



    if (!post) {
        return null; // Add a safeguard in case post is undefined
    }

    const getPostDetails = (id) => {
        navigate(`/postsdetails/${post.id}`);
        console.log(`Detail post with id: ${id}`);
    };


    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
    };

    const formatDate = (dateString) => {
        const options = { 
            year: "numeric", 
            month: "long", 
            day: "numeric", 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 style={{ margin: '0', padding: '0' }}>{post.user_id.username}</h3> {/* Use optional chaining */}
                   
                    </div>
                    <MoreOption id={post.id} />
                </div>

                <div className="d-flex justify-content-between">
                    <div>
                    <p className="text-muted" style={{ margin: '0', padding: '0' }}>{formatDate(post.timeStamp)}</p>
                        <span>  
                            <TagLists tagsString={post.tag.tag} />
                        </span>
                    </div>
                </div>

                <p className="card-text">{post.content}</p>
    
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <IconButton aria-label="comments" sx={{ mr: 1 }} onClick={(event) => { event.stopPropagation(); getPostDetails(post.id); }}>
                            <CommentIcon />
                        </IconButton>{commentCount}
                        <LikeButton  userId={post.user?.id} msgId={post.id}/>
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
