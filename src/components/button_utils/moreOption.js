// moreOption.js
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';



const handleDelete = (id) => {
    console.log("Delete "+ id)
};

const handleEdit = (id) => {
    console.log("Edit "+ id)
};

const handleHide = (id) => {
    console.log("Hide "+ id)
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
                <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
                <MenuItem onClick={() => handleHide(id)}>Hide</MenuItem>
            </Menu>
          </React.Fragment>
        )}
        </PopupState>
    );
};

export default MoreOption;
