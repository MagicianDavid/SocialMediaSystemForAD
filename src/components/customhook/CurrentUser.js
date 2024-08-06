import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('currentUser');
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
        } else {
            console.error('No currentUser found in sessionStorage');
        }
    }, []);

    return currentUser;
};

export default useCurrentUser;
