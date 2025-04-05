import React, { useState, useEffect } from 'react';
import CreateProposal from './components/CreateProposal';

function App() {
  const [proposals, setProposals] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Mock data for now
    setProposals([
      {
        id: 0,
        title: "Upgrade Protocol",
        description: "Should we upgrade to v2.0?",
        yesVotes: 25,
        noVotes: 12,
        endTime: Date.now() + 86400000
      }
    ]);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      setConnected(true);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const vote = (proposalId, voteChoice) => {
    alert(`Voted ${voteChoice ? 'YES' : 'NO'} on proposal ${proposalId}`);
  };

  const createProposal = (title, description, duration) => {
    const newProposal = {
      id: proposals.length,
      title,
      description,
      yesVotes: 0,
      noVotes: 0,
      endTime: Date.now() + (duration * 60 * 60 * 1000)
    };
    setProposals([...proposals, newProposal]);
    alert('Proposal created successfully!');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>VoteChain</h1>
        <p>Decentralized Voting Platform</p>

        {!connected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>✅ Wallet Connected</p>
        )}
      </div>

      {connected && (
        <CreateProposal onCreateProposal={createProposal} />
      )}

      <div className="proposals">
        <h2>Active Proposals</h2>
        {proposals.map(proposal => (
          <div key={proposal.id} className="proposal-card">
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            <div className="vote-count">
              <span>Yes: {proposal.yesVotes}</span>
              <span style={{marginLeft: '20px'}}>No: {proposal.noVotes}</span>
            </div>

            {connected && (
              <div className="vote-buttons">
                <button
                  className="yes-btn"
                  onClick={() => vote(proposal.id, true)}
                >
                  Vote YES
                </button>
                <button
                  className="no-btn"
                  onClick={() => vote(proposal.id, false)}
                >
                  Vote NO
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;