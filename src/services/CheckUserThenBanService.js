import axios from 'axios';

const Ban_API_BASE_URL = "http://localhost:8080/api/checkThenBan";

class CheckThenBanService {

    updateUserAuthAndNotify(userId) {
        return axios.put(`${Ban_API_BASE_URL}/${userId}`);
    }

}

export default new CheckThenBanService();
