import React, { useState, useEffect } from 'react';
import CreateProposal from './components/CreateProposal';
import ProposalStatus from './components/ProposalStatus';
import VotingHistory from './components/VotingHistory';
import ProposalFilter from './components/ProposalFilter';
import VoteStats from './components/VoteStats';

function App() {
  const [proposals, setProposals] = useState([]);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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
      },
      {
        id: 1,
        title: "Change Treasury Rules",
        description: "Modify the governance voting threshold from 51% to 60%",
        yesVotes: 8,
        noVotes: 15,
        endTime: Date.now() + 172800000
      }
    ]);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setConnected(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
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

  const getFilteredAndSortedProposals = () => {
    let filtered = [...proposals];

    // Apply filter
    switch (filterType) {
      case 'active':
        filtered = filtered.filter(p => Date.now() < p.endTime);
        break;
      case 'expired':
        filtered = filtered.filter(p => Date.now() >= p.endTime);
        break;
      case 'voted':
        // Mock: assume every other proposal is voted
        filtered = filtered.filter((_, index) => index % 2 === 0);
        break;
      case 'not-voted':
        // Mock: assume every other proposal is not voted
        filtered = filtered.filter((_, index) => index % 2 === 1);
        break;
      default:
        break;
    }

    // Apply sort
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'ending-soon':
        filtered.sort((a, b) => a.endTime - b.endTime);
        break;
      case 'most-votes':
        filtered.sort((a, b) => (b.yesVotes + b.noVotes) - (a.yesVotes + a.noVotes));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  };

  const filteredProposals = getFilteredAndSortedProposals();

  return (
    <div className="container">
      <div className="header">
        <h1>VoteChain</h1>
        <p>Decentralized Voting Platform</p>

        {!connected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div className="wallet-info">
            <p>✅ Wallet Connected</p>
            <p className="wallet-address">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
          </div>
        )}
      </div>

      {connected && (
        <>
          <VotingHistory walletAddress={walletAddress} proposals={proposals} />
          <CreateProposal onCreateProposal={createProposal} />
        </>
      )}

      <div className="proposals">
        <div className="proposals-header">
          <h2>Proposals ({filteredProposals.length})</h2>
          <ProposalFilter
            filterType={filterType}
            sortBy={sortBy}
            onFilterChange={setFilterType}
            onSortChange={setSortBy}
          />
        </div>
        {filteredProposals.map(proposal => (
          <div key={proposal.id} className="proposal-card">
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            <div className="proposal-meta">
              <ProposalStatus endTime={proposal.endTime} />
            </div>

            <VoteStats yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} />

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