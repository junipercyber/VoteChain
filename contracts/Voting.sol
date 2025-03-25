// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Proposal {
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 endTime;
        bool active;
        address creator;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed proposalId, string title, address creator);
    event VoteCast(uint256 indexed proposalId, address voter, bool vote);

    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _durationHours
    ) public {
        uint256 proposalId = proposalCount++;

        proposals[proposalId] = Proposal({
            title: _title,
            description: _description,
            yesVotes: 0,
            noVotes: 0,
            endTime: block.timestamp + (_durationHours * 1 hours),
            active: true,
            creator: msg.sender
        });

        emit ProposalCreated(proposalId, _title, msg.sender);
    }

    function vote(uint256 _proposalId, bool _vote) public {
        require(_proposalId < proposalCount, "Invalid proposal");
        require(proposals[_proposalId].active, "Proposal not active");
        require(block.timestamp < proposals[_proposalId].endTime, "Voting ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        hasVoted[_proposalId][msg.sender] = true;

        if (_vote) {
            proposals[_proposalId].yesVotes++;
        } else {
            proposals[_proposalId].noVotes++;
        }

        emit VoteCast(_proposalId, msg.sender, _vote);
    }
}