// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Proposal.sol";

contract Deployer {
    address public owner;
    address[] public proposals;
    mapping(address => bool) public providers;

    function createProposal(
        uint8 _startDay,
        int256 _lat,
        int256 _long,
        string memory _target,
        uint _contentType,
        string memory _contentMessage
    ) external returns (Proposal) {
        address _deployer = address(this);
        Proposal proposal = new Proposal(
            _deployer,
            _startDay,
            _lat,
            _long,
            _target,
            _contentType,
            _contentMessage
        );

        proposals.push(address(proposal));

        return proposal;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier _ownerOnly() {
        if (msg.sender == owner) _;
    }

    function addProvider(address _address) public _ownerOnly {
        providers[_address] = true;
    }

    function getProposals() public view returns (address[] memory) {
        return proposals;
    }

    function isProvider(address _address) public view returns (bool) {
        return providers[_address] == true;
    }
}
