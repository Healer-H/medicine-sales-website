import React from 'react';
import Breadcrumb from './Breadcrumb';
import FilterButton from './FilterButton';
import SortButton from './SortButton';

const Subheader = ({
  showSearchBar = true,
  onSearch,
  showFilter = true,
  onFilter,
  showSorter = true,
  onSort,
  actions = []
}) => {
  return (
    <div className="flex justify-between items-center p-4 h-14 bg-gradient-to-r from-blue-400 to-cyan-300 shadow-md mb-4">
      <div className="flex items-center space-x-1">
        {/* Breadcrumb */}
        <Breadcrumb />
      </div>


      <div className='flex justify-between items-center space-x-3'>
        {/* Filter Button */}
        {showFilter && (
          <FilterButton />
        )}

        {/* Sort Button */}
        {showSorter && (
          <SortButton />
        )}

        {/* Action Buttons */}
        {actions.length > 0 && 
          actions.map((action, index) => (
            <button
              key={index}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Subheader;