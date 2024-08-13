
import React from 'react';
import CSVService from '../../../services/CSVService';

const CSVList = () => {

    const getUserCsv = async () => {
        try {
            const response = await CSVService.getUserCsv();

            // Create a URL for the blob and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.csv'); // Specify the filename
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error during CSV download:', error);
        }
    };
    
    return (
        <div>
        <h2>CSV Lists</h2>
        <table>
            <thead>
                <tr>
                <th>Data Info</th>
                <th>Download</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span>User CSV</span></td>
                <td><button onClick={getUserCsv} className="ml-5">
                    Download Users CSV
                </button></td>
                </tr>
            </tbody>
      </table>
    </div>
    );
};

export default CSVList;