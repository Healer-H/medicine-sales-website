import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Input, Spin } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);
        await onSearch(query);
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-box-container">
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        suffix={
          isLoading ? (
            <Spin size="small" />
          ) : (
            searchTerm && (
              <CloseOutlined onClick={handleClear} style={{ cursor: 'pointer' }} />
            )
          )
        }
        style={{ width: 300 }}
      />
    </div>
  );
};

export default SearchBar;