// src/components/RoleList.js
import React, { Component } from 'react';
import RoleService from '../../services/RoleService';
import { useNavigate } from 'react-router-dom';

class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        };
    }

    componentDidMount() {
        this.loadRoles();
    }

    loadRoles() {
        RoleService.getAllRoles().then((response) => {
            this.setState({ roles: response.data });
        }).catch((error) => {
            console.error('There was an error!', error);
        });
    }

    render() {
        const { navigate } = this.props;
        return (
            <div>
                <h2>Role List</h2>
                <button onClick={() => navigate('/roles/add')}>Add Role</button>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.id}</td>
                            <td>{role.type}</td>
                            <td>
                                <button onClick={() => navigate(`/roles/edit/${role.id}`)}>Edit</button>
                                <button onClick={() => this.deleteRole(role.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    deleteRole(id) {
        RoleService.deleteRole(id).then(() => {
            this.loadRoles();
        });
    }
}

const RoleListWithNavigate = (props) => {
    const navigate = useNavigate();
    return <RoleList {...props} navigate={navigate} />;
};

export default RoleListWithNavigate;
