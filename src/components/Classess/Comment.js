import React, { useEffect, useState } from 'react';
import ReportButton from '../button_utils/ReportButton'
import MoreOption from '../button_utils/moreOption';
import CommentForm from '../Classess/CommentForm'; 
import CommentChild from '../Classess/CommentChild';
import useCurrentUser from '../customhook/CurrentUser';

import { IconButton } from '@mui/material';
import { ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon } from '@mui/icons-material';
import LikeButton from '../button_utils/LikeButton';
import PC_MsgService from '../../services/PC_MsgService';
import TimeFormat from '../Classess/timeFormat';

const MIN_WIDTH = 80; // Define the minimum width percentage

const Comment = ({ comment, nestingLevel = 0}) => {
    
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showChildComments] = useState(false);
    const [childComments, setChildComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                if (comment) {
                    const response = await PC_MsgService.getChildrenByPCMId(comment.id);
                    setCommentCount(response.data.length);
                    setChildComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [showChildComments, comment, childComments]);


    const handleReplyClick = () => {
        setShowReplyInput(!showReplyInput);
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
                    <TimeFormat msgtimeStamp = {comment.timeStamp}/>
                </div>
                <MoreOption id={comment.id} />

            </div>
            <p>{comment.content}</p>
         
            <div className="d-flex justify-content-between">
                <div>
                    <IconButton aria-label="reply" sx={{ ml: 1 }} onClick={handleReplyClick}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>{commentCount}
                    {currentUser && (
                        <LikeButton  userId={currentUser.id} msgId={comment.id}/>
                    )}
                </div>
                {currentUser && (
                    <ReportButton
                        userId={currentUser.id}
                        reportId={comment.id}
                        onReportSubmit={handleReportSubmit}
                    />
                )}
            </div>
            <hr />

            {showReplyInput && (
                <div>
                <CommentForm
                sourceId={comment.id}
                onCommentSubmit={() => {
                    setShowReplyInput(true);
                }}
                userId={currentUser.id}
                />
                <CommentChild CommentChild = {childComments} nestingLvl = {nestingLevel}/>
                
                </div>
            )}
        </div>
    );
};


export default Comment;
