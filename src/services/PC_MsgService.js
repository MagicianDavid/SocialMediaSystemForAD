// src/services/RoleService.js
import axios from 'axios';

const ROLE_API_BASE_URL = "http://localhost:8080/api/pcmsgs";

class RoleService {

    findAllPosts(){
        return axios.get(`${ROLE_API_BASE_URL}/findHotPosts`);
    }

    getAllPostsByUserId(id) {
        return axios.get(`${ROLE_API_BASE_URL}/findAllPostsByUserId/${id}`);
    }

    getPostById(postId) {
        return axios.get(`${ROLE_API_BASE_URL}/findPostDetailById/${postId}`);
    }

    getCountCommentsByPostId(postId){
        return axios.get(`${ROLE_API_BASE_URL}/countAllCommentsByPostId/${postId}`);
    }

    getCountLikesByPostId(postId){
        return axios.get(`${ROLE_API_BASE_URL}/countLikesByPCMsgId/${postId}`);
    }

    hasUserLikedPost(userId,pcmsgId){
        return axios.get(`${ROLE_API_BASE_URL}/${pcmsgId}/likes/${userId}`);
    }

    getChildrenByPCMId(sourceId){
        return axios.get(`${ROLE_API_BASE_URL}/${sourceId}/children`);
    }


    LikeOrUnlikePCMsg(userId,pcmsgId){
        return axios.put(`${ROLE_API_BASE_URL}/likeOrUnlikePCMsg/${userId}/${pcmsgId}`);
    }

    createPost(post) {
        return axios.post(`${ROLE_API_BASE_URL}/createPost`, post);
    }

    createComment(comment) {
        return axios.post(`${ROLE_API_BASE_URL}/createComment`, comment);
    }


    deletePost(postId){
        return axios.put(`${ROLE_API_BASE_URL}/delete/${postId}`, postId);
    }

    hidePost(postId){
        return axios.put(`${ROLE_API_BASE_URL}/hide/${postId}`, postId);
    }
}

export default new RoleService();
