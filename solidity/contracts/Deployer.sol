// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Proposal.sol";

contract Deployer {
    address public owner;
    address[] public proposals;
    mapping(address => bool) public providers;

    function CreateProposal(
        uint _startDay,
        uint _endDay,
        uint256 _lat,
        uint256 _long,
        string memory _target,
        bool _contentType,
        string memory _contentMessage
    ) external returns (Proposal) {
        address _deployer = address(this);
        Proposal proposal = new Proposal(
            _deployer,
            _startDay,
            _endDay,
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

    function AddProvider(address _address) public _ownerOnly {
        providers[_address] = true;
    }

    function GetProposals() public view returns (address[] memory) {
        return proposals;
    }

    function IsProvider(address _address) public view returns (bool) {
        return providers[_address] == true;
    }
}
