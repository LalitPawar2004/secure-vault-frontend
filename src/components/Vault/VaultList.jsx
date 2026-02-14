import React from 'react';
import VaultItem from './VaultItem';

const VaultList = ({ entries, onEdit, onDelete, searchTerm, onSearchChange }) => {
  return (
    <div className="vault-list">
      <h3>Your Vault</h3>
      <input
        type="text"
        placeholder="Search by domain..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-box"
      />
      
      {entries.length === 0 ? (
        <div className="empty-state">
          <p>No entries found. Add your first password!</p>
        </div>
      ) : (
        entries.map((entry) => (
          <VaultItem
            key={entry._id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default VaultList;