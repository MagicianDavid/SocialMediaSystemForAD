// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import LoginService from '../../services/LoginService';

import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

import Slider from '@mui/material/Slider';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();
    const [itemNb, setItemNb] = React.useState(4);


    const handleLogout = () => {
        LoginService.logout();
        setCurrentUser(null);
        navigate('/login');
        window.location.reload();
    };

    const handleItemNbChange = (event, newValue) => {
        if (typeof newValue !== 'number') {
          return;
        }
        setItemNb(newValue);
        setItemNb(newValue);
      };
    

    const data = [
        { tags: 'angry', value: 500, color: '#f00' },
        { tags: 'sad', value: 100, color: '#00f' },
        { tags: 'violent', value: 700, color: '#FF5733' },
        { tags: 'undefined', value: 600, color: '#0f0' },
        // Add more data as needed
      ];

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
    ];


    return (
        <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-left">Dashboard</h2>
          </div>
        </div>
        
        {/* Check if the user is logged in */}
        {currentUser ? (
          <div className="row">
            {/* Container for PieChart and Slider */}
            <div className="col-lg-4 col-md-12 mb-4">
              <PieChart
                skipAnimation
                series={[
                  {
                    data: data.slice(0, itemNb).map((item) => ({
                      id: item.tags,
                      value: item.value,
                      color: item.color,
                    })),
                    arcLabel: (item) => `${item.id} (${item.value})`,
                  },
                ]}
                width={400}
                height={400}
              />
              <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={4}
                aria-labelledby="input-item-number"
              />
            </div>
      
            {/* Container for LineChart */}
            <div className="col-lg-8 col-md-12">
                <div style={{ height: "450px",width: '100%' }}>
                <LineChart
                    series={[
                    { data: pData, label: 'pv' },
                    { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
                </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <p>Loading...</p>
            </div>
          </div>
        )}
      
        {/* Grid container for additional information */}
        <div className="row mt-4">
          <div className="col-md-4 col-sm-12 mb-4">
            <div className="grid-item">API call latest Report</div>
          </div>
          <div className="col-md-4 col-sm-12 mb-4">
            <div className="grid-item">API call latest Enquiries</div>
          </div>
          <div className="col-md-4 col-sm-12 mb-4">
            <div className="grid-item">API call top Post</div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
