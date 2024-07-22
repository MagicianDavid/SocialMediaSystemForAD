import React, { useState, useEffect } from 'react';

const RouteSelectionForm = ({ routes, onChange }) => {
    const [selectedRoutes, setSelectedRoutes] = useState([]);

    useEffect(() => {
        // Initialize selected routes based on existing menuViewJason if available
        if (routes && routes.length > 0) {
            const selected = routes.map(route => ({
                path: route.path,
                selected: false
            }));
            setSelectedRoutes(selected);
        }
    }, [routes]);

    const handleCheckboxChange = (index) => {
        const updatedRoutes = [...selectedRoutes];
        updatedRoutes[index].selected = !updatedRoutes[index].selected;
        setSelectedRoutes(updatedRoutes);

        // Generate JSON string based on selected routes
        const selectedRoutesJson = updatedRoutes
            .filter(route => route.selected)
            .map(route => ({
                path: route.path,
                component: route.component, // assuming you need component info as well
                menuName: route.menuName // assuming you need menu name info as well
            }));

        onChange(JSON.stringify(selectedRoutesJson, null, 2)); // Convert to formatted JSON string
    };

    return (
        <div>
            <h3>Select Routes:</h3>
            {selectedRoutes.map((route, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`route-${index}`}
                        checked={route.selected}
                        onChange={() => handleCheckboxChange(index)}
                    />
                    <label htmlFor={`route-${index}`}>{route.path}</label>
                </div>
            ))}
        </div>
    );
};

export default RouteSelectionForm;
