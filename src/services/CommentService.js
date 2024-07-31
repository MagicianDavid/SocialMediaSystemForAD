// src/services/RoleService.js
import axios from 'axios';

const ROLE_API_BASE_URL = "http://localhost:8080/api/posts";

class CommentService {

    createComment(comment) {
        return axios.post(`${ROLE_API_BASE_URL}/comment`, comment);
    }

    getlistComment(postId){
        return axios.get(`${ROLE_API_BASE_URL}/${postId}/comments` );
    }

}

export default new CommentService();
