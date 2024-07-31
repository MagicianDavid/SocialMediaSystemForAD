import React, { useEffect, useState } from 'react';
import ReportButton from '../button_utils/ReportButton'
import MoreOption from '../button_utils/moreOption';
import CommentForm from '../Classess/CommentForm'; 

import { IconButton } from '@mui/material';
import { ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon } from '@mui/icons-material';
import LikeButton from '../button_utils/LikeButton';
import PC_MsgService from '../../services/PC_MsgService';

const MAX_NESTING_LEVEL = 1; // Define the maximum nesting level
const MIN_WIDTH = 80; // Define the minimum width percentage

const Comment = ({ comment, addReply, nestingLevel = 0 }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showChildComments, setShowChildComments] = useState(false);
    const [childComments, setChildComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (comment && comment.id) {
                    const response = await PC_MsgService.getChildrenByPCMId(comment.id);
                    setCommentCount(response.data.length);
                    setChildComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [showChildComments, comment.id]);


    const handleReplyClick = () => {
        setShowReplyInput(!showReplyInput);
    };


    const toggleChildComments = () => {
        setShowChildComments(!showChildComments);
    };

    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
    };
    
    const adjustedWidth = `${Math.max(100 - nestingLevel * 5, MIN_WIDTH)}%`;

    return (
        <div style={{ marginLeft: `${nestingLevel * 20}px`, width: adjustedWidth }}>
            <div className="d-flex justify-content-between" > 
                <div>
                    <h6 style={{ margin: '0', padding: '0' }}>{comment.user.name}</h6>
                    <small className="text-muted" style={{ margin: '0', padding: '0' }}>{comment.timeStamp}</small>
                </div>
                <MoreOption id={comment.id} />

            </div>
            <p>{comment.content}</p>
         
            <div className="d-flex justify-content-between">
                <div>
                    {/* <IconButton aria-label="likes">
                        <FavoriteIcon />
                    </IconButton>{comment.likes} */}
                    <IconButton aria-label="reply" sx={{ ml: 1 }} onClick={handleReplyClick}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>{commentCount}
                    <LikeButton  userId={comment.user?.id} msgId={comment.id}/>

                </div>
                <ReportButton
                    userId={comment.user_id}
                    reportId={comment.id}
                    onReportSubmit={handleReportSubmit}
                />
            </div>
            <hr />

            {showReplyInput && (
                <div>
                <CommentForm
                sourceId={comment.id}
                onCommentSubmit={(newReply) => {
                    setShowReplyInput(false);
                }}
                userId={4}
                />
               {childComments.map((childComment) => (
                        <Comment
                            key={childComment.id}
                            comment={childComment}
                            addReply={addReply}
                            userId={4}
                            nestingLevel={Math.min(nestingLevel + 1, MAX_NESTING_LEVEL)} // Cap nesting level
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


export default Comment;
