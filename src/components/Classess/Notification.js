// Notification.js
import React, { useState } from 'react';

const Notification = ({ message }) => {
    return (
        <div className="card" style={{ marginBottom:'20px'}}>
            <div className="card-body">
            <div className="d-flex justify-content-between" >
                <div>
                    <h3 style={{ margin: '0', padding: '0' }}>User ID: {message.id}</h3>
                    <h5 className="text-muted" style={{ margin: '0', padding: '0' }}>{message.timestamp}</h5>
                </div>
            </div>
            <p className="card-text">{message.content}</p>

            </div>
       </div>
    );
};

export default Notification;
