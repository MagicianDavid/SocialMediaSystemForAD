import React, { useState, useEffect } from 'react';


const LabelList = () => {
    return ( 
        <div>
            <h2>Label List</h2>
            <button>Add Role</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* {this.state.roles.map(role => ( */}
                    <tr>
                        <td>role_id</td>
                        <td>role_type</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                {/* ))} */}
                </tbody>
            </table>
        </div>
    );
};
export default LabelList;