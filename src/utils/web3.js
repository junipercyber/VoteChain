import Web3 from 'web3';

const VOTING_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_durationHours", "type": "uint256"}
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_proposalId", "type": "uint256"},
      {"internalType": "bool", "name": "_vote", "type": "bool"}
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "proposals",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "yesVotes", "type": "uint256"},
      {"internalType": "uint256", "name": "noVotes", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "bool", "name": "active", "type": "bool"},
      {"internalType": "address", "name": "creator", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

let web3;
let contract;

export const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return true;
  }
  return false;
};

export const initContract = (contractAddress) => {
  if (web3) {
    contract = new web3.eth.Contract(VOTING_ABI, contractAddress);
    return contract;
  }
  return null;
};

export const getProposal = async (proposalId) => {
  if (contract) {
    return await contract.methods.proposals(proposalId).call();
  }
  return null;
};

export const getProposalCount = async () => {
  if (contract) {
    return await contract.methods.proposalCount().call();
  }
  return 0;
};

export const vote = async (proposalId, voteChoice, account) => {
  if (contract) {
    return await contract.methods.vote(proposalId, voteChoice).send({ from: account });
  }
  return null;
};

export const createProposal = async (title, description, duration, account) => {
  if (contract) {
    return await contract.methods.createProposal(title, description, duration).send({ from: account });
  }
  return null;
};