import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // Call onSearch immediately
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Tìm kiếm..."
                className="border rounded-lg py-2 px-4 text-sm w-64"
            />
        </div>
    );
};

export default SearchBar;