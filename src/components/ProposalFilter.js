import React from 'react';

const ProposalFilter = ({ filterType, sortBy, onFilterChange, onSortChange }) => {
  return (
    <div className="proposal-filter">
      <div className="filter-controls">
        <div className="filter-group">
          <label>Filter by:</label>
          <select value={filterType} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">All Proposals</option>
            <option value="active">Active Only</option>
            <option value="expired">Expired Only</option>
            <option value="voted">I Voted</option>
            <option value="not-voted">Not Voted</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="ending-soon">Ending Soon</option>
            <option value="most-votes">Most Votes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProposalFilter;