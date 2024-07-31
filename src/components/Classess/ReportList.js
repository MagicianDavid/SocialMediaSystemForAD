// ReportList.js
import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReportList = ({ reports }) => {
    return (
        <ListGroup>
            {reports.map(report => (
                <ListGroup.Item key={report.report_id}>
                    <Row className="align-items-center">
                        <Col xs={6}>
                            <div><strong>Report ID:</strong> {report.report_id}</div>
                            <div><strong>Reported User ID:</strong> {report.reported_user_id}</div>
                            <div><strong>Reported By User ID:</strong> {report.reported_by_user_id}</div>
                            <div><strong>Type of Report:</strong> {report.typeOfReport}</div>
                            <div><strong>Reason:</strong> {report.reason}</div>
                            <div><strong>Status:</strong> {report.status}</div>
                            <div><strong>Timestamp:</strong> {report.timestamp}</div>
                            {report.emp_id && <div><strong>Emp ID:</strong> {report.emp_id}</div>}
                            {report.remarks && <div><strong>Remarks:</strong> {report.remarks}</div>}
                            {report.endTimestamp && <div><strong>End Timestamp:</strong> {report.endTimestamp}</div>}
                        </Col>
                        <Col xs={6} className="d-flex justify-content-end">
                            <Link to={`users/reportdetail/${report.report_id}`}>
                                <Button variant="primary">
                                    View Details
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ReportList;
