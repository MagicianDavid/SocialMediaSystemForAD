
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, reportPost }) => {

    // Example posts data
    // const comments = [
    //     { id: 1, user_id: 105, content: 'This is the first Comments.', timestamp: '2023-07-01', visibility: 'public', status: 'active', likes: 10 },
    //     { id: 2, user_id: 105, content: 'This is the second Comments.', timestamp: '2023-07-02', visibility: 'private', status: 'inactive', likes: 5 },
    //     { id: 3, user_id: 105, content: 'This is the third Comments.', timestamp: '2023-07-03', visibility: 'public', status: 'active', likes: 7 },
    // ];

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
