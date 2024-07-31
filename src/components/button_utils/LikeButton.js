import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon} from '@mui/icons-material';
import PC_MsgService from '../../services/PC_MsgService';

const LikeButton = ({ userId, msgId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchLikeStatusAndCount = async () => {
            try {
                const [likeStatusResponse, likeCountResponse] = await Promise.all([
                    PC_MsgService.hasUserLikedPost(userId, msgId),
                    PC_MsgService.getCountLikesByPostId(msgId)
                ]);
                setIsLiked(likeStatusResponse.data);
                setLikeCount(likeCountResponse.data);
            } catch (error) {
                console.error("Error fetching like status and count:", error);
            }
        };

        fetchLikeStatusAndCount();
    }, [userId, msgId]);

    const handleLikeClick = async (event) => {
        event.stopPropagation();
        try {
            // Optimistically update the UI
            const newIsLiked = !isLiked;
            setIsLiked(newIsLiked);
            setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);

            await PC_MsgService.LikeOrUnlikePCMsg(userId, msgId);
            console.log('Liked post:', msgId);
        } catch (error) {
            console.error("There was an error liking/unliking the post!", error);
            // Revert the UI update if needed
            setIsLiked(isLiked);
            setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
        }
    };

    return (
        <span>
            <IconButton aria-label="likes" sx={{ ml: 2 }} onClick={handleLikeClick}>
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            {likeCount}
        </span>
    );
};

export default LikeButton;
