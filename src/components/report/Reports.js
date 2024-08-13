// FollowerFollowing.js
import React, {useState, useEffect} from 'react';
import ReportList from './ReportList';
import ReportService from '../../services/ReportService';
import useCurrentUser from "../customhook/CurrentUser";

const FollowerFollowing = () => {

    return (
        <div>
            <h2>Reports</h2>
            <ReportList/>
        </div>
    );
};


export default FollowerFollowing;
