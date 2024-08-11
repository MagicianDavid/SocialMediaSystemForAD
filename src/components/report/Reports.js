// FollowerFollowing.js
import React, { useEffect, useState } from 'react';
import ReportList from './ReportList';
import ReportService from '../../services/ReportService';
import useCurrentUser from "../customhook/CurrentUser";

const FollowerFollowing = () => {
    const [reports, setReports] = useState();
    const currentUser = useCurrentUser();

    useEffect(()=>{
        if (currentUser) {
            if (currentUser.role.type !== 'Moderator') {
                ReportService.getReportByUserId(currentUser.id)
                    .then((response) => {
                        setReports(response.data);
                    })
                    .catch((error) => {
                        console.error('There was an error retrieving the reports for user id: '+ currentUser.id, error);
                    });
            } else {
                ReportService.getAllReports()
                    .then((response) => {
                        setReports(response.data);
                    })
                    .catch((error) => {
                        console.error('There was an error retrieving the reports!', error);
                    });
            }
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Reports</h2>
            <ReportList reports={reports} />
        </div>
    );
};


export default FollowerFollowing;
