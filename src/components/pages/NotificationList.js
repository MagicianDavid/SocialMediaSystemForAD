import React  from 'react';
import Notification from '../Classess/Notification';

const NotificationList = () => {


    // Example posts data
    const messages = [
        {
            id: 1,
            content: 'This is the first notification.',
            timestamp: '2023-07-01',
        },
        {
            id: 2,
            content: 'This is the second notification.',
            timestamp: '2023-07-02',
        },
        {
            id: 3,
            content: 'This is the third notification.',
            timestamp: '2023-07-03',
        },
    ];

   return (
        <div className="contentDiv">
            {messages.map(message => (
                <Notification key={message.id} message={message} />
            ))}
        </div>
    );
};



export default NotificationList;
