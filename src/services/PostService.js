// src/services/RoleService.js
import axios from 'axios';

const ROLE_API_BASE_URL = "http://localhost:8080/api/posts";

class RoleService {
    getAllPosts() {
        return axios.get(`${ROLE_API_BASE_URL}/findAll`);
    }


    getPostById(postId) {
        return axios.get(`${ROLE_API_BASE_URL}/findById/${postId}`);
    }

    createPost(post) {
        return axios.post(`${ROLE_API_BASE_URL}/create`, post);
    }

}

export default new RoleService();
