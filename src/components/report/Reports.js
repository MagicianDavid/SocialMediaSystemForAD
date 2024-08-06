// FollowerFollowing.js
import React, { useEffect, useState } from 'react';
import ReportList from './ReportList';
import ReportService from '../../services/ReportService';

const FollowerFollowing = () => {
    const [reports, setReports] = useState();

    useEffect(()=>{
        ReportService.getAllReports()
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.error('There was an error retrieving the reports!', error);
            });
    }, []);

    return (
        <div>
            <h2>Reports</h2>
            <ReportList reports={reports} />
        </div>
    );
};


export default FollowerFollowing;
