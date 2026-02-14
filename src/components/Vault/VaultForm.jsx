import React, { useState, useEffect } from 'react';

const VaultForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    domain: ''
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
    setFormData({ ...formData, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="vault-form">
      <h3>{initialData ? 'Edit Entry' : 'Save New Password'}</h3>
      
      <div className="password-generator">
        <h4>Password Generator</h4>
        <input
          type="number"
          min="8"
          max="128"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
        <button type="button" onClick={generatePassword} className="btn" style={{ marginTop: '10px' }}>
          Generate Password
        </button>
        {generatedPassword && (
          <div className="generated-password">
            <strong>Generated:</strong> {generatedPassword}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn"
              style={{ width: 'auto', padding: '12px 20px' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="domain"
            placeholder="Domain (e.g., google.com)"
            value={formData.domain}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn" style={{ flex: 1 }}>
            {initialData ? 'Update' : 'Save'}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="btn" style={{ flex: 1, backgroundColor: '#6c757d' }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VaultForm;