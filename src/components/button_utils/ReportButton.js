  // ReportButton.js
import React, { useEffect, useState } from 'react';
import { IconButton, Modal, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';
import { FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';
import LabelService from '../../services/LabelService';
import ReportService from '../../services/ReportService';
import PC_MsgService from '../../services/PC_MsgService';

const ReportButton = ({ userId, objType, reportId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [labels, setLabels] = useState([]);
    const [reportType, setReportType] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        LabelService.getAllLabels()
            .then((response) => {
                setLabels(response.data);
                console.log(userId);
            })
            .catch((error) => {
                console.error('There was an error retrieving the labels!', error);
            });
    }, []);

    const handleReportClick = () => {
        setIsModalOpen(true);
    };

    const handleReportClose = () => {
        setIsModalOpen(false);
        setReportType('');
        setReason('');
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let prefixedReportId = '';
        if (objType === 'user') {
            prefixedReportId = `u${reportId}`;
        } else if (objType === 'post') {
            prefixedReportId = `p${reportId}`;
        } else if (objType === 'comment') {
            prefixedReportId = `c${reportId}`;
        }

        const report = {
            label: { id: labels.find(label => label.label === reportType).id },
            reason: reason,
            reportedId: prefixedReportId,
            reportUser: { id: parseInt(userId) }, // Use a User object
            reportDate: new Date().toISOString(),
            status:'Pending'
        };

        ReportService.createReport(report)
            .then(() => {
                // Clear the form fields
                setReportType('');
                setReason('');
                setError('');
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error('There was an error saving the report!', error);
                setError('There was an error saving the report. Please try again.');
            });
    };


    return (
        <>
            <IconButton
                aria-label="Report"
                onClick={(e) => {
                    e.stopPropagation();
                    handleReportClick();
                }}>
                <FlagOutlinedIcon />
            </IconButton>
            <Modal
                open={isModalOpen}
                onClose={handleReportClose}
                aria-labelledby="report-modal-title"
                aria-describedby="report-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="report-modal-title" variant="h6" component="h2">
                        Report
                    </Typography>
                 <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <RadioGroup
                        aria-labelledby="report-type-group-label"
                        name="reportType"
                        value={reportType}
                        onChange={handleReportTypeChange}
                    >
                        {labels.map(label => (
                            <FormControlLabel 
                                key={label.id} 
                                value={label.label} 
                                control={<Radio />} 
                                label={label.label} 
                            />
                        ))}
                    </RadioGroup>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Reason"
                        name="reason"
                        value={reason}
                        onChange={handleReasonChange}
                        required
                        multiline
                        rows={4} // Adjust the number of rows to make the TextField bigger
                        fullWidth
                    />
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
                </Box>
            </Modal>
        </>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default ReportButton;