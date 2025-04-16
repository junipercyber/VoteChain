import React, { useState } from 'react';

const VotingHistory = ({ walletAddress, proposals }) => {
  const [showHistory, setShowHistory] = useState(false);

  const getUserVotedProposals = () => {
    // In a real app, this would query the blockchain
    // For now, simulate some voting history
    return proposals.filter((_, index) => index % 2 === 0).map(proposal => ({
      ...proposal,
      userVote: Math.random() > 0.5 ? 'YES' : 'NO',
      votedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
  };

  const votedProposals = getUserVotedProposals();

  return (
    <div className="voting-history">
      <button
        className="history-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide' : 'Show'} Voting History ({votedProposals.length})
      </button>

      {showHistory && (
        <div className="history-content">
          <h3>Your Voting History</h3>
          {votedProposals.length === 0 ? (
            <p>No voting history found.</p>
          ) : (
            <div className="history-list">
              {votedProposals.map((proposal, index) => (
                <div key={index} className="history-item">
                  <div className="history-proposal">
                    <h4>{proposal.title}</h4>
                    <p>{proposal.description}</p>
                  </div>
                  <div className="history-vote">
                    <span className={`vote-badge ${proposal.userVote.toLowerCase()}`}>
                      {proposal.userVote}
                    </span>
                    <small>Voted on {proposal.votedAt}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VotingHistory;