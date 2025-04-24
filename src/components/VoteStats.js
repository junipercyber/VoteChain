import React from 'react';

const VoteStats = ({ yesVotes, noVotes }) => {
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;

  return (
    <div className="vote-stats">
      <div className="stats-header">
        <span>Total Votes: {totalVotes}</span>
      </div>

      <div className="vote-bar">
        <div
          className="vote-segment yes-segment"
          style={{ width: `${yesPercentage}%` }}
        >
          {yesVotes > 0 && <span className="vote-label">YES ({yesVotes})</span>}
        </div>
        <div
          className="vote-segment no-segment"
          style={{ width: `${noPercentage}%` }}
        >
          {noVotes > 0 && <span className="vote-label">NO ({noVotes})</span>}
        </div>
      </div>

      <div className="percentage-display">
        <span className="yes-percent">{yesPercentage.toFixed(1)}% YES</span>
        <span className="no-percent">{noPercentage.toFixed(1)}% NO</span>
      </div>
    </div>
  );
};

export default VoteStats;