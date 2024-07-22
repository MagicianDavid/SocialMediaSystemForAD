import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AuthList = () => {
    const [auths, setAuths] = useState([]);
    const [loading, setLoading] = useState(true); // loading status
    const navigate = useNavigate();

    useEffect(() => {
        loadAuths();
    }, []);

    const loadAuths = () => {
        AuthService.getAllAuths()
            .then((response) => {
                const authsWithParsedMenu = response.data.map(auth => ({
                    ...auth,
                    parsedMenu: JSON.parse(auth.menuViewJason || '[]'),
                    isExpanded: false
                }));
                setAuths(authsWithParsedMenu);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load auths:', error);
                setLoading(false);
            });
    };

    const addAuth = () => {
        navigate('/auths/add');
    };

    const editAuth = (id) => {
        navigate(`/auths/edit/${id}`);
    };

    const deleteAuth = (id) => {
        AuthService.deleteAuth(id)
            .then(() => {
                setAuths(prevAuths => prevAuths.filter(auth => auth.id !== id));
            })
            .catch(error => {
                console.error('Failed to delete auth:', error);
            });
    };

    // const toggleExpand = (index) => {
    //     setAuths(prevAuths =>
    //         prevAuths.map((auth, i) => (
    //             i === index ? { ...auth, isExpanded: !auth.isExpanded } : auth
    //         ))
    //     );
    // };

    return (
        <div>
            <h2>Auth List</h2>
            <button onClick={addAuth}>Add Auth</button>
            {loading ? (
                <p>Loading...</p>
            ) : auths.length === 0 ? (
                <p>No auths found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rank</th>
                        <th>Menu View JSON</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {auths.map((auth, index) => (
                        <tr key={auth.id}>
                            <td>{auth.id}</td>
                            <td>{auth.rank}</td>
                            <td>
                                {/*<button onClick={() => toggleExpand(index)}>*/}
                                {/*    {auth.isExpanded ? 'Collapse' : 'Expand'}*/}
                                {/*</button>*/}
                                {/*{auth.isExpanded && (*/}
                                {/*    <ul>*/}
                                {/*        {auth.parsedMenu.map((menuItem, i) => (*/}
                                {/*            <li key={i}>*/}
                                {/*                {menuItem.menuName}*/}
                                {/*                {menuItem.children && (*/}
                                {/*                    <ul>*/}
                                {/*                        {menuItem.children.map((child, j) => (*/}
                                {/*                            <li key={j}>{child.menuName}</li>*/}
                                {/*                        ))}*/}
                                {/*                    </ul>*/}
                                {/*                )}*/}
                                {/*            </li>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*)}*/}

                                <ul>
                                    {auth.parsedMenu.map((menuItem, i) => (
                                        <li key={i}>
                                            {menuItem.menuName}
                                            {menuItem.children && (
                                                <ul>
                                                    {menuItem.children.map((child, j) => (
                                                        <li key={j}>{child.menuName}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => editAuth(auth.id)}>Edit</button>
                                <button onClick={() => deleteAuth(auth.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AuthList;
