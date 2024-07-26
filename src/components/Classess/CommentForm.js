// CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control me-2"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write your comment here"
                />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
