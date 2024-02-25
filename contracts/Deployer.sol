// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Deployer {
    address public owner;
    address[] public proposals;
    mapping(address => bool) public providers;

    function CreateProposal(
        string memory _content_type,
        string memory _content_message,
        string memory _target,
        uint _start_date,
        uint _end_date
    ) external {
        _deployer = address(this);
        Proposal proposal = new Proposal(
            _deployer,
            _content_type,
            _content_message,
            _target,
            _start_date,
            _end_date
        );

        proposals.push(address(proposal));
    }

    constructor() {
        owner = msg.sender;
    }

    modifier _ownerOnly() {
        if (msg.sender == owner) _;
    }

    function AddProvider(address _address) public _ownerOnly {
        providers[address] = true;
    }

    function IsProvider(address _address) public view returns (bool) {
        return providers[_address] == true;
    }
}

contract Proposal {
    address public deployer;
    uint public end_date;
    uint public start_date;
    string public target;
    address public proposer;
    Content public content;
    struct Content {
        string content_type;
        string message;
    }

    constructor(
        address memory _deployer,
        string memory _content_type,
        string memory _content_message,
        string memory _target,
        uint _start_date,
        uint _end_date
    ) {
        content = Content(_content_type, _content_message);
        start_date = _start_date;
        deployer = _deployer;
        end_date = _end_date;
        target = _target;
    }
}
