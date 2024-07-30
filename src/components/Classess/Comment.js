import React, { useState } from 'react';
import ReportButton from '../button_utils/ReportButton'
import MoreOption from '../button_utils/moreOption';

import { IconButton } from '@mui/material';
import { ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon , Favorite as FavoriteIcon, FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';

const Comment = ({ comment, addReply }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleReplyClick = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        addReply(comment.id, replyContent);
        setReplyContent('');
        setShowReplyInput(false);
    };

    const handleReportSubmit = (reportData) => {
        console.log('Report submitted:', reportData);
    };

    return (
        <div >
            <div className="d-flex justify-content-between" > 
                <div>
                    <h6 style={{ margin: '0', padding: '0' }}>User ID: {comment.userId}</h6>
                    <small className="text-muted" style={{ margin: '0', padding: '0' }}>{comment.timeStamp}</small>
                </div>
                <MoreOption id={comment.id} />

            </div>
            <p>{comment.content}</p>
         
            <div className="d-flex justify-content-between">
                <div>
                    <IconButton aria-label="likes">
                        <FavoriteIcon />
                    </IconButton>{comment.likes}
                    <IconButton aria-label="reply" sx={{ ml: 1 }} onClick={handleReplyClick}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                </div>
                <ReportButton
                    userId={comment.user_id}
                    reportId={comment.id}
                    onReportSubmit={handleReportSubmit}
                />
            </div>
            <hr />

            {showReplyInput && (
                <form onSubmit={handleReplySubmit}>
                    <div className="input-group mt-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={replyContent}
                            onChange={handleReplyChange}
                            placeholder="Write your reply here"
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={handleReplyClick}>Cancel</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};


export default Comment;
