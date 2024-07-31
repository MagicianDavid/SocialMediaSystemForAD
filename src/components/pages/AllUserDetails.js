import React, { useState } from 'react';
import UserDetails from '../Classess/UserDetails'; // Ensure the path is correct

const AllUserDetails = () => {
    const userdetaillists = [
        {
            User_id: 1,
            Name: 'Eithan',
            Email: 'eithan@gmail.com',
            Password: 'password123',
            Gender: 'M',
            SocialScore: 100,
            PhoneNumber: 98756531,
            Auth_id: 1,
            Role_id: 1,
            joinDate: '2023-07-01',
            BlockList: [2, 3],
            Country: 'Singapore',
            Status: 'Default'
        },
        {
            User_id: 2,
            Name: 'James',
            Email: 'james@gmail.com',
            Password: 'password123',
            Gender: 'F',
            SocialScore: -100,
            PhoneNumber: 98756532,
            Auth_id: 1,
            Role_id: 1,
            joinDate: '2023-07-01',
            BlockList: [],
            Country: 'Singapore',
            Status: 'Default'
        },
        {
            User_id: 3,
            Name: 'Alice',
            Email: 'alice@gmail.com',
            Password: 'password123',
            Gender: 'F',
            SocialScore: 50,
            PhoneNumber: 98756533,
            Auth_id: 1,
            Role_id: 2,
            joinDate: '2023-07-01',
            BlockList: [1],
            Country: 'Singapore',
            Status: 'Blocked'
        }
        // Add more users as needed
    ];

    const [statusFilter, setStatusFilter] = useState('All');

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filteredUsers = statusFilter === 'All'
        ? userdetaillists
        : userdetaillists.filter(user => user.Status === statusFilter);

    return (
        <div>
            <div className="filter">
                <label htmlFor="statusFilter">Filter by Status: </label>
                <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
                    <option value="All">All</option>
                    <option value="Default">Default</option>
                    <option value="Blocked">Blocked</option>
                    {/* Add other statuses as needed */}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Social Score</th>
                        <th>Phone Number</th>
                        <th>Auth ID</th>
                        <th>Role ID</th>
                        <th>Join Date</th>
                        <th>Block List</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(userdetail => (
                        <UserDetails key={userdetail.User_id} userdetail={userdetail} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUserDetails;
