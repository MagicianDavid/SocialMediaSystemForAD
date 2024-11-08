// src/components/common/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{title}</h2>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
