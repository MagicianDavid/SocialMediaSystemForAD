// ReportButton.js
import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';
import { FlagOutlined as FlagOutlinedIcon } from '@mui/icons-material';

const ReportButton = ({ userId, reportId, onReportSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportType, setReportType] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleReportClick = () => {
        setIsModalOpen(true);
    };

    const handleReportClose = () => {
        setIsModalOpen(false);
        setReportType('');
        setRemarks('');
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const timestamp = new Date().toISOString();
        onReportSubmit({
            userId,
            reportId,
            reportType,
            remarks,
            timestamp,
        });
        handleReportClose();
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
                        <RadioGroup
                            aria-labelledby="report-type-group-label"
                            name="reportType"
                            value={reportType}
                            onChange={handleReportTypeChange}
                        >
                            <FormControlLabel value="spam" control={<Radio />} label="Spam" />
                            <FormControlLabel value="abuse" control={<Radio />} label="Abuse" />
                            <FormControlLabel value="harassment" control={<Radio />} label="Harassment" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <TextField
                            fullWidth
                            label="Remarks"
                            multiline
                            rows={4}
                            value={remarks}
                            onChange={handleRemarksChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleReportClose}>
                                Cancel
                            </Button>
                        </Box>
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
