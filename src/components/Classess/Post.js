import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Comment as CommentIcon} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useCurrentUser from '../customhook/CurrentUser';

import ReportButton from '../button_utils/ReportButton';
import MoreOption from '../button_utils/moreOption';
import TagLists from './taglists';
import PC_MsgService from '../../services/PC_MsgService';
import LikeButton from '../button_utils/LikeButton';
import TimeFormat from '../Classess/timeFormat';


const Post = ({ post , curId}) => {
    const navigate = useNavigate();
    const [commentCount, setCommentCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const currentUser = useCurrentUser();
    const isAdmin = currentUser?.auth.rank === 'L1';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (post && post.id && currentUser) {
                    const response = await PC_MsgService.getCountCommentsByPostId(post.id);
                    setCommentCount(response.data);
                    console.log('Fetched Comment Count:', response.data);
                    console.log("myid", currentUser);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [post, refresh, currentUser]);


    if (!currentUser) {
        return <div>Loading...</div>;
    }

    //refresh Tags
    const refreshTags = () => {
        setRefresh(prev => !prev); // Toggle the refresh state to trigger useEffect

        // Logic to refresh tags
        // Assuming post is being passed from parent, you may need to trigger a fetch or pass a callback from parent
    };

    if (!post) {
        return null; // Add a safeguard in case post is undefined
    }

    const getPostDetails = (id) => {
        navigate(`/postsdetails/${post.id}`);
        console.log(`Detail post with id: ${id}`);
    };



    return (
        <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 style={{ margin: '0', padding: '0' }}>
                            <Link to={`/userProfile/${post.user_id.id}`}>{post.user_id.name}</Link>
                        </h3>
                    </div>
                    <MoreOption id={post.id} auth={isAdmin} refreshTags={refreshTags}/>
                </div>

                <div className="d-flex justify-content-between">
                    <div>
                    <TimeFormat msgtimeStamp = {post.timeStamp}/>
                        <span>  
                            {isAdmin && <><TagLists tagsString={post.tag?.tag} /></> }
                        </span>
                    </div>
                </div>

                <p className="card-text">{post.content}</p>
    
                <hr />
                <div className="d-flex justify-content-between">
                    <div>
                        <IconButton aria-label="comments" sx={{ mr: 1 }} onClick={(event) => { event.stopPropagation(); getPostDetails(post.id); }}>
                            <CommentIcon />
                        </IconButton>{commentCount}
                        <LikeButton msgId={post.id}/>
                    </div>
                    <ReportButton
                        userId={currentUser.id}
                        reportId={post.id}
                        objType={"post"}
                    />
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Post;
