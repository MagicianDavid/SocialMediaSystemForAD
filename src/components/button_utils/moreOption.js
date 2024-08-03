// moreOption.js
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PC_MsgService from '../../services/PC_MsgService';


const handleDelete = async (id) => {
    console.log("Delete " + id);
    try {
        const response = await PC_MsgService.deletePost(id);
        console.log(`Post ${id} deleted successfully.`);
        // Perform any additional actions, like updating state or UI
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

const handleHide = async (id) => {
    console.log("Hide " + id);
    try {
        const response = await PC_MsgService.hidePost(id);
        console.log(`Post ${id} hidden successfully.`);
        // Perform any additional actions, like updating state or UI
    } catch (error) {
        console.error('Error hiding post:', error);
    }
};


const MoreOption = ({ id }) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <IconButton aria-label="option" 
                        {...bindTrigger(popupState)}
                        sx={{
                            borderRadius: 1, 
                            width: 40, height: 40,      
                        }}>
                <MoreHorizIcon />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
                {/* <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem> */}
                <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
                <MenuItem onClick={() => handleHide(id)}>Hide</MenuItem>
            </Menu>
          </React.Fragment>
        )}
        </PopupState>
    );
};

export default MoreOption;
