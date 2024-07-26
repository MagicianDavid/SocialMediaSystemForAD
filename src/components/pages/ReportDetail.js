// ReportDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ReportDetail = () => {
    const { reportId } = useParams();

    // Fetch or use the report details based on reportId
    // For simplicity, we will assume the data is available

    return (
        <div>
            <h2>Report Detail for ID: {reportId}</h2>
            {/* Display the report details here */}
            <p>Details about report {reportId}...</p>

        </div>
    );
};

export default ReportDetail;
