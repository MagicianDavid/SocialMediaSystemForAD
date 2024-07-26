import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <input type="text" placeholder="Search..." style={searchStyle} />
        </header>
    );
};

const headerStyle = {
    padding: '10px',
    background: '#f4f4f4',
    textAlign: 'center',
};

const searchStyle = {
    padding: '8px',
    width: '50%',
};

export default Header;
