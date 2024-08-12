import React, {useState} from 'react';
import { Table, Button, Form, ButtonGroup, Modal } from 'react-bootstrap';
import ReportService from "../../services/ReportService";
import useCurrentUser from "../customhook/CurrentUser";
import NotificationService from "../../services/NotificationService.";
import PC_MsgService from "../../services/PC_MsgService";
import {useReport} from "../../services/ReportContext";

const ReportList = () => {
    const { reports } = useReport();
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
            updateReport(selectedReport,false);
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
            updateReport(selectedReport,true);
            handleCloseModal();
        }
    };

    const updateReport = (report,isAppeal) => {
        ReportService.updateReport(report.id, report)
            .then((response) => {
                if (isAppeal) {
                    // Notify the moderator
                    NotificationService.sendToAllModerators(
                        "Appeal Submitted",
                        `User ${currentUser.username} has appealed your decision on report ID ${selectedReport.id}.`,
                    ).then().catch(error => {
                        alert("Error sending notification: " + error);
                        console.log("Error sending notification: ", error);
                    });
                } else {
                    // send notification to reportUser
                    NotificationService.saveNotification({
                        notificationUser: { id: report.reportUser.id },
                        title: "Report status update",
                        message: "Your report has been processed, please check.",
                        // other notification fields if needed
                    }).then().catch((error) => {
                        alert("Error sending notification: " + error);
                        console.log("Error sending notification: ", error);
                    });
                }
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

    const handleReportedIdNavigation = (reportedId) => {
        const nId = reportedId.slice(1);
        if (reportedId.startsWith('p')) {
            // Navigate to the post page
            window.location.href = `/postsdetails/${nId}`;
        } else if (reportedId.startsWith('c')) {
            // Navigate to the comment page
            PC_MsgService.getPostIdByCommentId(nId).then(response => {
                window.location.href = `/postsdetails/${response.data}?chosenId=${nId}`;
            }).catch((error)=> {
                alert("Error fetching post/comment: " + error);
                console.log("Error fetching post/comment: ", error);
            });
        } else if (reportedId.startsWith('u')) {
            // Navigate to the user profile page
            window.location.href = `/userProfile/${nId}`;
        }
    };

    if (reports === undefined) {
        return <p>Loading reports...</p>; // Or a spinner/loading indicator
    }

    return (
        <>
            <Table striped  hover>
                <thead>
                <tr>
                    <th>Report User</th>
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
                {reports.map(report => (
                    <tr key={report.id}>
                        <td>{report.reportUser.username}</td>
                        {/* can click and view the post or comment or userprofile according to the id*/}
                        <td style={{cursor: 'pointer', color: 'brown', textDecoration: 'none'}}
                            onClick={() => handleReportedIdNavigation(report.reportedId)}>
                            {report.reportedId}
                        </td>
                        {/*<td>*/}
                        {/*    {report.reportedId}*/}
                        {/*</td>*/}
                        <td>{report.reason}</td>
                        <td>{report.status}</td>
                        <td>{new Date(report.reportDate).toLocaleString()}</td>
                        {/*<td>*/}
                        {/*    <Form.Control type="text" defaultValue={report.remarks} disabled/>*/}
                        {/*</td>*/}
                        <td>
                            <ButtonGroup>
                                <Button variant="info" className="rounded-button"
                                        onClick={() => handleViewDetail(report)}>View Detail</Button>
                            </ButtonGroup>
                        </td>
                        <td>{report.caseCloseDate ? new Date(report.caseCloseDate).toLocaleString() : 'N/A'}</td>
                        <td>
                            <ButtonGroup>
                                {report.status === "Complete" && (currentUser && currentUser.role.type === "Moderator" ? (
                                    <>
                                        waiting to be appealed.
                                    </>) : (
                                    <>
                                        <Button variant="warning" className="rounded-button"
                                                onClick={() => handleShowModal(report, 'appeal')}>Appeal</Button>
                                    </>
                                ))}
                                {report.status === "Pending" && (currentUser && currentUser.id === report.reportUser.id ? (
                                    <>
                                        Moderator is still pending
                                    </>
                                ) : (
                                    <>
                                        <Button variant="success" className="me-2 rounded-button"
                                                onClick={() => handleShowModal(report, 'approve')}>Approve</Button>
                                        <Button variant="danger" className="rounded-button"
                                                onClick={() => handleShowModal(report, 'reject')}>Reject</Button>
                                    </>
                                ))}
                                {report.status === "Appeal" &&
                                    (currentUser && currentUser.id === report.reportUser.id ? (
                                            <>
                                                waiting to be pended.
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="success" className="me-2 rounded-button"
                                                        onClick={() => handleShowModal(report, 'approve')}>Approve</Button>
                                                <Button variant="danger" className="rounded-button"
                                                        onClick={() => handleShowModal(report, 'reject')}>Reject</Button>
                                            </>
                                        )
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
                            <p><strong>Report User</strong> {selectedReport.reportUser.username}</p>
                            <p><strong>Reported ID:</strong> {selectedReport.reportedId}</p>
                            <p><strong>Reason:</strong> {selectedReport.reason}</p>
                            <p><strong>Status:</strong> {selectedReport.status}</p>
                            <p><strong>Label::</strong> {selectedReport.label.label}</p>
                            <p><strong>Report Time:</strong> {new Date(selectedReport.reportDate).toLocaleString()}</p>
                            <p><strong>CaseClose
                                Time:</strong> {selectedReport.caseCloseDate ? new Date(selectedReport.caseCloseDate).toLocaleString() : 'N/A'}
                            </p>

                            <h4>Reply Stream</h4>
                            <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                                {selectedReport.remarks ?
                                    JSON.parse(selectedReport.remarks).map((remark, index) => (
                                        <div key={index} style={{marginBottom: '15px'}}>
                                            <p>
                                                <strong>{remark.user}</strong> ({new Date(remark.timestamp).toLocaleString()}):
                                            </p>
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
