import React, { useState } from 'react';

const CreateProposal = ({ onCreateProposal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(24);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onCreateProposal(title, description, duration);
      setTitle('');
      setDescription('');
      setDuration(24);
      setShowForm(false);
    }
  };

  return (
    <div className="create-proposal">
      {!showForm ? (
        <button
          className="create-btn"
          onClick={() => setShowForm(true)}
        >
          Create New Proposal
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="proposal-form">
          <h3>Create New Proposal</h3>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter proposal description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (hours):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="168"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">Create Proposal</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProposal;