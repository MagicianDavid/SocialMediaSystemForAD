import React from 'react';
import Chip from '@mui/material/Chip';

const TagLists = ({ tagsString }) => {
    // Function to split tags into an array
    const getTagsArray = (tagsString) => {
        return tagsString ? tagsString.split(",") : [];
    };

    return (
        <div>
            {getTagsArray(tagsString).map((tag, index) => (
                <Chip key={index} label={tag.trim()} className="tag" />
            ))}
        </div>
    );
};

export default TagLists;