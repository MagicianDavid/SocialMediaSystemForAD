import React from 'react';
import { Table, Button, Form, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReportList = ({ reports = [] }) => {
    return (
        <Table striped  hover>
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Reported ID</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th>Remarks</th>
                    <th>End Timestamp</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reports.map(report => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.reportedId}</td>
                        <td>{report.reason}</td>
                        <td>{report.status}</td>
                        <td>{report.reportDate}</td>
                        <td>
                            <Form.Control type="text" defaultValue={report.remarks} />
                        </td>
                        <td>{report.caseCloseDate}</td>
                        <td>
                            <ButtonGroup>
                                <Button variant="success" className="me-2 rounded-button">Approve</Button>
                                <Button variant="danger" className="rounded-button">Reject</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReportList;
