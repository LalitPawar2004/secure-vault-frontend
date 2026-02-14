import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import VaultForm from './VaultForm';
import VaultList from './VaultList';

const VaultDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchEntries();
    } else {
      fetchEntries();
    }
  }, [searchTerm]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/vault');
      setEntries(response.data.entries);
      setError(null);
    } catch (err) {
      setError('Failed to fetch entries');
      console.error('Error fetching entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vault/search?domain=${searchTerm}`);
      setEntries(response.data.entries);
      setError(null);
    } catch (err) {
      setError('Failed to search entries');
      console.error('Error searching entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntry = async (entryData) => {
    try {
      const response = await api.post('/vault', entryData);
      setEntries([response.data.entry, ...entries]);
      setEditingEntry(null);
    } catch (err) {
      setError('Failed to create entry');
      console.error('Error creating entry:', err);
    }
  };

  const handleUpdateEntry = async (entryData) => {
    try {
      const response = await api.put(`/vault/${editingEntry._id}`, entryData);
      const updatedEntries = entries.map(entry =>
        entry._id === editingEntry._id ? response.data.entry : entry
      );
      setEntries(updatedEntries);
      setEditingEntry(null);
    } catch (err) {
      setError('Failed to update entry');
      console.error('Error updating entry:', err);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/vault/${id}`);
        setEntries(entries.filter(entry => entry._id !== id));
      } catch (err) {
        setError('Failed to delete entry');
        console.error('Error deleting entry:', err);
      }
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingEntry) {
      handleUpdateEntry(formData);
    } else {
      handleCreateEntry(formData);
    }
  };

  if (loading && entries.length === 0) {
    return <div className="loading">Loading your vault...</div>;
  }

  return (
    <div className="container">
      <h2>Secure Vault Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard">
        <VaultForm
          onSubmit={handleFormSubmit}
          initialData={editingEntry}
          onCancel={handleCancelEdit}
        />
        
        <VaultList
          entries={entries}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default VaultDashboard;