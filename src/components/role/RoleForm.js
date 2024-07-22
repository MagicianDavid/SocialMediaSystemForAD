import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoleService from '../../services/RoleService';

const RoleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            RoleService.getRoleById(id).then((response) => {
                let role = response.data;
                setType(role.type);
            }).catch(error => {
                console.error("There was an error retrieving the role!", error);
            });
        }
    }, [id]);

    const saveOrUpdateRole = (e) => {
        e.preventDefault();
        let role = { type: type };
        if (id) {
            RoleService.updateRole(id, role).then(() => {
                navigate('/roles');
            }).catch(error => {
                if (error.response && error.response.status === 409) {
                    setError(error.response.data);
                } else {
                    console.error("There was an error updating the role!", error);
                }
            });
        } else {
            RoleService.createRole(role).then(() => {
                navigate('/roles');
            }).catch(error => {
                // in spring boot we create DuplicateRoleTypeException
                // and use HttpStatus.CONFLICT (409) to represent something
                // like DuplicateRole error
                if (error.response && error.response.status === 409) {
                    setError(error.response.data);
                } else {
                    console.error("There was an error creating the role!", error);
                }
            });
        }
    };

    const cancel = () => {
        navigate('/roles');
    };

    return (
        <div>
            <h2>{id ? 'Update Role' : 'Add Role'}</h2>
            <form>
                <div>
                    <label>Type: </label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button onClick={saveOrUpdateRole}>{id ? 'Update' : 'Save'}</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default RoleForm;
