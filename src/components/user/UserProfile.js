// src/components/user/UserProfile.js
import UserDetail from "./UserDetail";
import LoginService from "../../services/LoginService";

const UserProfile = () => {
    return UserDetail(parseInt(LoginService.getCurrentUser().id),10);
};

export default UserProfile;