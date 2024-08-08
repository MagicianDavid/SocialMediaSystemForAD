import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Notification from '../Classess/Notification';
import './NotificationList.css'
import {useNotification} from "../../services/NotificationContext";

const NotificationList = () => {
    const { unreadNotifications,readNotifications, markAsRead } = useNotification();
    const [showModal, setShowModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleNotificationClick = (notification) => {
        setSelectedNotification(notification);
        setShowModal(true);
        if (notification.notificationStatus === 'Unread') {
            markAsRead(notification.id);
        }
    };

    return (
        <div className="notification-list">

            {unreadNotifications.length > 0 &&
                <>
                    Unread:
                    {unreadNotifications
                        .sort((a, b) => new Date(b.notificationTime) - new Date(a.notificationTime))
                        .map(notification => (
                            <Notification
                                key={notification.id}
                                message={notification}
                                onClick={() => handleNotificationClick(notification)}
                            ></Notification>
                        ))}
                </>
            }
            {readNotifications.length > 0 &&
                <>
                    Read:
                    {readNotifications.sort((a, b) => new Date(b.notificationTime) - new Date(a.notificationTime))
                        .map(notification => (
                            <Notification
                                key={notification.id}
                                message={notification}
                                onClick={() => handleNotificationClick(notification)}
                            ></Notification>
                        ))}
                </>
            }
            {readNotifications.length === 0 && unreadNotifications.length === 0 && <>No Notifications yet!</>}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNotification?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{selectedNotification?.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NotificationList;