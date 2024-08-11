import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={keyword}
                className="form-control mb-3 me-2"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
    );
};

export default SearchBar;
