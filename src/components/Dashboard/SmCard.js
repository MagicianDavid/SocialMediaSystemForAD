import React from 'react';

const SmCard = ({ title, number }) => {
  return (
    <div className="col-12 sm-card">
    <div className="sm-card" style={{ textAlign: 'left' , padding:'9px'}}>
      <h2>{title}</h2>
        <p style={{ fontSize: '20px' }}>{number}</p>
      </div>
    </div>
  );
};

export default SmCard;
