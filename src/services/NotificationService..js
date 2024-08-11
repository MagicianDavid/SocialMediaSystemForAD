import axios from 'axios';

const NOTIFICATION_API_BASE_URL = "http://localhost:8080/api/notifications";

class NotificationService {

    getAllNotifications() {
        return axios.get(`${NOTIFICATION_API_BASE_URL}/findAll`);
    }

    getAllNotificationsByUserId(userId) {
        return axios.get(`${NOTIFICATION_API_BASE_URL}/findAllByUserId/${userId}`);
    }

    getAllUnreadNotificationsByUserId(userId) {
        return axios.get(`${NOTIFICATION_API_BASE_URL}/unReadList/${userId}`);
    }

    getAllReadNotificationsByUserId(userId) {
        return axios.get(`${NOTIFICATION_API_BASE_URL}/readList/${userId}`);
    }

    isNotificationRead(id) {
        return axios.get(`${NOTIFICATION_API_BASE_URL}/isRead/${id}`);
    }

    markNotificationAsRead(id) {
        return axios.put(`${NOTIFICATION_API_BASE_URL}/updateStatusToRead/${id}`);
    }

    saveNotification(notification) {
        return axios.post(`${NOTIFICATION_API_BASE_URL}/create`, notification);
    }

    sendToAllModerators() {
        return axios.post(`${NOTIFICATION_API_BASE_URL}/sendToAllModerators`, {})
    }

    updateNotification(id, newNotification) {
        return axios.put(`${NOTIFICATION_API_BASE_URL}/update/${id}`, newNotification);
    }

    deleteNotification(id) {
        return axios.delete(`${NOTIFICATION_API_BASE_URL}/delete${id}`);
    }

    sendEmail(emailRequest) {
        return axios.post(`${NOTIFICATION_API_BASE_URL}/sendEmail`, emailRequest);
    }
}

export default new NotificationService();
