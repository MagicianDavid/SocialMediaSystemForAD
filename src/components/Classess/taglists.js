import React, {useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';
import LabelService from "../../services/LabelService";

const TagLists = ({ tagsString }) => {
    const [labelsColors, setLabelsColors] = useState({});

    // Fetch color codes from the backend service
    useEffect(() => {
        LabelService.findColorCodeByLabel().then((response)=>{
            setLabelsColors(response.data);
        }).catch((err) => {
            console.log("Error getting color code", err);
        });
    }, []);

    const getTagsArray = (tagsString) => {
        return tagsString ? tagsString.split(",").filter(tag => tag !== 'none') : [];
    };

    return (
        <div>
            {getTagsArray(tagsString).map((tag, index) => (
                <Chip key={index} label={tag.trim()} className="tag"
                      style={{
                          backgroundColor: labelsColors[tag.trim()] || 'defaultColor', // Apply RGB color based on the tag name
                          color: '#fff', // Adjust text color for better contrast
                      }}/>
            ))}
        </div>
    );
};

export default TagLists;