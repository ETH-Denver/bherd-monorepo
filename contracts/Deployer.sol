// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Deployer {
    address[] public proposals;
    address[] public providers;

    function CreateProposal(
        string memory _content_type,
        string memory _content_message,
        string memory _target,
        uint _start_date,
        uint _end_date
    ) external {
        ProposalContract proposal = new ProposalContract(
            _content_type,
            _content_message,
            _target,
            _start_date,
            _end_date
        );

        proposals.push(address(proposal));
    }
}

contract ProposalContract {
    uint public start_date;
    string public target;
    uint public end_date;
    address public proposer;
    Content public content;
    struct Content {
        string content_type;
        string message;
    }

    constructor(
        string memory _content_type,
        string memory _content_message,
        string memory _target,
        uint _start_date,
        uint _end_date
    ) {
        content = Content(_content_type, _content_message);
        start_date = _start_date;
        end_date = _end_date;
        target = _target;
    }
}
