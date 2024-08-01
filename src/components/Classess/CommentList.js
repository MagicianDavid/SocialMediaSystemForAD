import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, reportPost }) => {

    return (
        <div className="list-group" >
            {comments.map(comment => (
                <div key={comment.id} className="list-group-item">
                    <Comment 
                        comment={comment} 
                        reportPost={reportPost} 
                    />
                </div>
            ))}
        </div>
    );
};

export default CommentList;
