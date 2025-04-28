# VoteChain

A decentralized voting platform built on blockchain technology that enables transparent, secure, and tamper-proof voting.

## Features

### Core Functionality
- 🗳️ **Create Voting Proposals** - Submit new proposals with custom durations
- 🔒 **Secure Blockchain Voting** - Immutable vote recording on blockchain
- 📊 **Real-time Results** - Live vote counting with visual statistics
- 🌐 **Web3 Integration** - MetaMask wallet connectivity

### User Interface
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⏰ **Live Status Updates** - Real-time countdown timers for proposals
- 🔍 **Advanced Filtering** - Filter by status, voting history, etc.
- 📈 **Vote Statistics** - Visual progress bars and percentage displays
- 📋 **Voting History** - Track your past voting activity

## Tech Stack

- **Frontend**: React, Web3.js
- **Smart Contracts**: Solidity
- **Development**: Hardhat
- **Blockchain**: Ethereum-compatible networks

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MetaMask browser extension
- Local blockchain (Hardhat Network) or testnet access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/username/VoteChain.git
cd VoteChain
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Smart Contract Deployment

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to local network:
```bash
npm run deploy
```

3. Update the contract address in `src/contractAddress.json`

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to link your MetaMask
2. **View Proposals**: Browse active and expired voting proposals
3. **Create Proposal**: Submit new proposals (requires wallet connection)
4. **Vote**: Cast your vote on active proposals
5. **Track History**: View your voting history and proposal statistics

## Smart Contract Functions

- `createProposal(title, description, duration)` - Create a new voting proposal
- `vote(proposalId, choice)` - Cast a vote on a proposal
- `getProposal(id)` - Retrieve proposal details
- `getUserVoteStatus(proposalId, user)` - Check if user has voted

## Project Structure

```
src/
├── components/          # React components
│   ├── CreateProposal.js
│   ├── ProposalStatus.js
│   ├── VotingHistory.js
│   ├── ProposalFilter.js
│   └── VoteStats.js
├── utils/
│   └── web3.js         # Web3 integration utilities
├── App.js              # Main application component
└── index.js            # Application entry point

contracts/
└── Voting.sol          # Main voting smart contract

scripts/
└── deploy.js           # Contract deployment script
```

## License

MIT