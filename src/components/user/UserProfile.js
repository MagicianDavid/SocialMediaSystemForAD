// src/components/user/UserProfile.js
import UserDetail from "./UserDetail";
import {useParams} from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams();

    if (!id) {
        return UserDetail(parseInt(id), 10);
    } else {
        return UserDetail();
    }
};

export default UserProfile;