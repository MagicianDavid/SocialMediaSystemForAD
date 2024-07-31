// src/components/navigation/Navigation.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext'; // get the current user's auth details
import {useLocation, useNavigate} from 'react-router-dom';
import LoginService from '../../services/LoginService';
import './Navigation.css'; // Create and import CSS for styling

const Navigation = () => {
    const { currentUser,setCurrentUser } = useAuth(); // Use your auth context or another method to get the current user
    const [menuItems, setMenuItems] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // every time the url change, we set the current user auth
    useEffect(() => {
        setCurrentUser(LoginService.getCurrentUser());
    }, [location,setCurrentUser]);

    useEffect(() => {
        if (currentUser && currentUser.auth) {
            const menuViewJason = JSON.parse(currentUser.auth.menuViewJason || '[]');
            setMenuItems(menuViewJason);
        }
    }, [currentUser]);

    const toggleSubmenu = (index, path, hasChildren) => {
        // if the main item has no children, then the click should let them link to that page.
        if (!hasChildren) {
            navigate(path);
            return;
        }
        setMenuItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, open: !item.open } : item
            )
        );
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogOut = () => {
        LoginService.logout();
        navigate('/login');
        window.location.reload();
    };

    return (
        <>{currentUser ? (
            <div className={`navigation ${isCollapsed ? 'collapsed' : ''}`}>
                <button className="collapse-btn" onClick={toggleCollapse}>
                    {isCollapsed ? 'Expand' : 'Collapse'}
                </button>
                {currentUser ? (
                    <button className="collapse-btn" onClick={handleLogOut}>
                        Log Out
                    </button>
                ):(<></>)}
                {!isCollapsed && (
                    <>
                        <h3>Navigation</h3>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index} className="menu-item">
                                    <div onClick={() => toggleSubmenu(index,item.path, item.children.length > 0)} className="menu-title">
                                        {item.menuName}
                                    </div>
                                    {item.open && item.children && (
                                        <ul className="submenu">
                                            {/* Since user can not edit something only through like employees/edit
                                                not knowing  which one to edit exactly. so simply do not show
                                                edit in navigation bar */}
                                            {item.children.filter(c=>!c.path.includes("edit") && !c.path.includes("detail"))
                                                .map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <a href={subItem.path}>{subItem.menuName}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        ):(<></>)}</>
    );
};

export default Navigation;
