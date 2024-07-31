// FollowerFollowing.js
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ReportList from '../Classess/ReportList';
import ReportDetail from './ReportDetail';

const FollowerFollowing = () => {
    const initialReportsAndAppeals = [
        {
            report_id: 1,
            reported_user_id: 101,
            reported_by_user_id: 201,
            typeOfReport: 'Spam',
            reason: 'Repeatedly sending unsolicited messages',
            status: 'Completed',
            timestamp: '2023-07-01 10:00:00',
            emp_id: 'EMP123',
            remarks: 'Handled by EMP123',
            endTimestamp: '2023-07-02 15:00:00'
        },
        {
            report_id: 2,
            reported_user_id: 102,
            reported_by_user_id: 202,
            typeOfReport: 'Abuse',
            reason: 'Using offensive language',
            status: 'Pending',
            timestamp: '2023-07-03 11:00:00',
            emp_id: '',
            remarks: '',
            endTimestamp: ''
        },
        {
            report_id: 3,
            reported_user_id: 103,
            reported_by_user_id: 203,
            typeOfReport: 'Harassment',
            reason: 'Persistent unwanted contact',
            status: 'Appeal',
            timestamp: '2023-07-04 12:00:00',
            emp_id: 'EMP124',
            remarks: 'Appeal in process',
            endTimestamp: '2023-07-05 16:00:00'
        },
        // Add more reports and appeals as needed
    ];

    const [tabIndex, setTabIndex] = useState('reports');
    const [reports, setReports] = useState(initialReportsAndAppeals);

    const handleTabChange = (selectedTab) => {
        setTabIndex(selectedTab);
    };

    const displayedReports = tabIndex === 'reports'
        ? reports.filter(report => report.status !== 'Appeal')
        : reports.filter(report => report.status === 'Appeal');

    return (
        <div className='contentDiv'>
            <h2>Reports and Appeals</h2>
            <Tabs
                id="report-appeal-tabs"
                activeKey={tabIndex}
                onSelect={handleTabChange}
                className="mb-3"
            >
                <Tab eventKey="reports" title="Reports">
                    <ReportList reports={displayedReports} />
                </Tab>
                <Tab eventKey="appeals" title="Appeals">
                    <ReportList reports={displayedReports} />
                </Tab>
            </Tabs>

        </div>
    );
};

export default FollowerFollowing;
