import React, {useEffect, useState} from 'react';
import { Table, Button, Form, ButtonGroup, Modal } from 'react-bootstrap';
import ReportService from "../../services/ReportService";
import useCurrentUser from "../customhook/CurrentUser";

const ReportList = ({ reports = [] }) => {

    const [reportList, setReportList] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const currentUser = useCurrentUser();

    const handleShowModal = (report, action) => {
        setSelectedReport(report);
        setActionType(action);
        setRemarks('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleViewDetail = (report) => {
        setSelectedReport(report);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedReport(null);
    };

    const updateRemark = (selectedReport,userRole) => {
        const newRemark = {
            user: userRole,
            timestamp: new Date().toISOString(),
            text: remarks
        };

        const existingRemarks = selectedReport.remarks ? JSON.parse(selectedReport.remarks) : [];
        const updatedRemarks = [
            ...existingRemarks,
            newRemark
        ];
        return updatedRemarks;
    };

    const handleApproveOrReject = () => {
        if (selectedReport) {
            selectedReport.status = "Complete";
            selectedReport.caseCloseDate = new Date();
            // Optional for approve
            selectedReport.remarks = JSON.stringify(updateRemark(selectedReport,"Admin"));
            updateReport(selectedReport);
            handleCloseModal();
        }
    };

    const handleAppeal = () => {
        if (selectedReport) {
            if (!remarks) {
                alert("Remarks are required for appeal.");
                return;
            }
            selectedReport.status = "Appeal";
            selectedReport.remarks = JSON.stringify(updateRemark(selectedReport,currentUser.username));
            updateReport(selectedReport);
            handleCloseModal();
        }
    };

    const updateReport = (report) => {
        ReportService.updateReport(report.id, report)
            .then((response) => {
                setReportList((prevList) =>
                    prevList.map((r) =>
                        r.id === response.data.id ? response.data : r
                    )
                );
            })
            .catch((error) => {
                alert("Error updating report: " + error);
                console.log("Error updating report: ", error);
            });
    };

    const handleModalConfirm = () => {
        if (actionType === 'approve' || actionType === 'reject') {
            handleApproveOrReject();
        } else if (actionType === 'appeal') {
            handleAppeal();
        }
    };

    useEffect(() => {
        setReportList(reports);
    }, [reportList]);

    return (
        <>
            <Table striped  hover>
                <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Reported ID</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Report Date</th>
                    <th>Remarks</th>
                    <th>CaseClose Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {reportList.map(report => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.reportedId}</td>
                        <td>{report.reason}</td>
                        <td>{report.status}</td>
                        <td>{new Date(report.reportDate).toLocaleString()}</td>
                        {/*<td>*/}
                        {/*    <Form.Control type="text" defaultValue={report.remarks} disabled/>*/}
                        {/*</td>*/}
                        <td>
                            <ButtonGroup>
                                <Button variant="info" className="rounded-button" onClick={() => handleViewDetail(report)}>View Detail</Button>
                            </ButtonGroup>
                        </td>
                        <td>{report.caseCloseDate ? new Date(report.caseCloseDate).toLocaleString() : 'N/A'}</td>
                        <td>
                            <ButtonGroup>
                                {report.status === "Complete" && (
                                    <>
                                        <Button variant="warning" className="rounded-button" onClick={() => handleShowModal(report, 'appeal')}>Appeal</Button>
                                    </>
                                )}
                                {report.status === "Pending" && (
                                    <>
                                        <Button variant="success" className="me-2 rounded-button" onClick={() => handleShowModal(report, 'approve')}>Approve</Button>
                                        <Button variant="danger" className="rounded-button" onClick={() => handleShowModal(report, 'reject')}>Reject</Button>
                                    </>
                                )}
                                {report.status === "Appeal" && (
                                    <>
                                        <Button variant="success" className="me-2 rounded-button" onClick={() => handleShowModal(report, 'approve')}>Approve</Button>
                                        <Button variant="danger" className="rounded-button" onClick={() => handleShowModal(report, 'reject')}>Reject</Button>
                                    </>
                                )}
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === 'approve' ? 'Approve Report' : actionType === 'reject' ? 'Reject Report' : 'Appeal Report'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to {actionType === 'approve' ? 'approve' : actionType === 'reject' ? 'reject': 'appeal'} this report?</p>
                    <Form.Group controlId="remarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Please provide remarks."
                            required = {actionType === 'reject' || actionType === 'appeal'}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleModalConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Report Detail Modal*/}
            <Modal show={isDetailModalOpen} onHide={closeDetailModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Report Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReport ? (
                        <>
                            <h4>Report Information</h4>
                            <p><strong>ID:</strong> {selectedReport.id}</p>
                            <p><strong>Reported ID:</strong> {selectedReport.reportedId}</p>
                            <p><strong>Reason:</strong> {selectedReport.reason}</p>
                            <p><strong>Status:</strong> {selectedReport.status}</p>
                            <p><strong>Report Time:</strong> {new Date(selectedReport.reportDate).toLocaleString()}</p>
                            <p><strong>CaseClose Time:</strong> {selectedReport.caseCloseDate ? new Date(selectedReport.caseCloseDate).toLocaleString() : 'N/A'}</p>

                            <h4>Reply Stream</h4>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {selectedReport.remarks ?
                                    JSON.parse(selectedReport.remarks).map((remark, index) => (
                                        <div key={index} style={{ marginBottom: '15px' }}>
                                            <p><strong>{remark.user}</strong> ({new Date(remark.timestamp).toLocaleString()}):</p>
                                            <p>{remark.text}</p>
                                        </div>
                                    )) :
                                    <p>No remarks available.</p>
                                }
                            </div>
                        </>
                    ) : (
                        <p>No report selected.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReportList;
