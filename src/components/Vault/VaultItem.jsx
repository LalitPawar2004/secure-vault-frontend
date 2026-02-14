import React from 'react';

const VaultItem = ({ entry, onEdit, onDelete }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="vault-item">
      <p><strong>Domain:</strong> {entry.domain}</p>
      <p><strong>Username:</strong> {entry.username}</p>
      <p><strong>Email:</strong> {entry.email}</p>
      <p><strong>Password:</strong> ••••••••</p>
      
      <div className="item-actions">
        <button
          onClick={() => copyToClipboard(entry.username)}
          className="btn-copy"
          title="Copy Username"
        >
          Copy Username
        </button>
        <button
          onClick={() => copyToClipboard(entry.password)}
          className="btn-copy"
          title="Copy Password"
        >
          Copy Password
        </button>
        <button
          onClick={() => onEdit(entry)}
          className="btn-edit"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(entry._id)}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VaultItem;