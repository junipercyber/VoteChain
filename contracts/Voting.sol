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
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_durationHours > 0 && _durationHours <= 168, "Duration must be 1-168 hours");

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

    function getProposalsByCreator(address _creator) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](proposalCount);
        uint256 counter = 0;

        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].creator == _creator) {
                result[counter] = i;
                counter++;
            }
        }

        uint256[] memory trimmedResult = new uint256[](counter);
        for (uint256 i = 0; i < counter; i++) {
            trimmedResult[i] = result[i];
        }

        return trimmedResult;
    }

    function getUserVoteStatus(uint256 _proposalId, address _user) public view returns (bool) {
        return hasVoted[_proposalId][_user];
    }
}