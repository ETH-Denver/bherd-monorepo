//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Proposal {
    // Funding deadline constant
    uint256 public constant FUNDING_LEAD = 30 days;

	// Proposal parameters
	uint256 public startDay;			// Date range of the ad, for specified time: start = end
	uint256 public endDay;
	uint256 public lat;					// Latitude of ad
	uint256 public long;				// Longitude of ad
	string public target;				// Event description
	string public message;				// Proposed message
	bool public contentType;			// 0 - Banner plane, 1 - Skywriter
	
	uint256 public fundingDeadline;		// Fundraising deadline if fundingTarget not met users can request a refund
	uint256 public fundingTarget;		// Ad cost 
	address public provider;			// default provider is the team
	uint256 public amountFunded;		// current funding total
	string public url;					// proof of execution

    uint256 public fundingDeadline; // Fundraising deadline if fundingTarget not met users can request a refund
    uint256 public fundingTarget; // Ad cost
    address public provider; // default provider is the team
    uint256 public amountFunded; // current funding total
    uint256 public contributorCount; // # of contributers
    bool public proposalAccepted; // tracks proposal status

    mapping(address => uint256) private donations; // track donations in event of refunds

	// Proposal Status
    enum Status {
        Todo,
        Accepted,
        Completed
    }

    // Defaults to first item, e.g., "Todo"
    Status public status;

	constructor(
		uint256 _startDay,
		uint256 _endDay,
		uint256 _lat,
		uint256 _long,
		string memory _target,
		string memory _message,
		bool _contentType
	){
		startDay = _startDay;
		endDay = _endDay;
		lat = _lat;
		long = _long;
		target = _target;
		message = _message;
		contentType = _contentType;

    constructor(
        uint256 _startDay,
        uint256 _endDay,
        uint256 _lat,
        uint256 _long,
        string memory _target,
        string memory _message,
        bool _contentType
    ) {
        startDay = _startDay;
        endDay = _endDay;
        lat = _lat;
        long = _long;
        target = _target;
        message = _message;
        contentType = _contentType;

        // Calculate ad cost based on content type
        if (contentType == true) {
            fundingTarget = 6e18; // 6 ETH for Skywriter
        } else {
            fundingTarget = 1e18; // 1 ETH for Banner Plane
        }

        // Set funding deadline
        fundingDeadline =
            block.timestamp +
            (startDay * 24 * 60 * 60) -
            FUNDING_LEAD;
    }

    // Allows users to contribute funds to a proposal if the funding target has not been reached
    function Contribute(uint256 _amount) public payable {
        require(
            amountFunded + _amount <= fundingTarget,
            "cannot contribute more than the funding target"
        );

        // Update funding total
        amountFunded += _amount;

        // Track users donation
        donations[msg.sender] = _amount;
        contributorCount++;
    }

    // Allows contributions by directly sending ether to this contract
    receive() external payable {
        contribute(msg.value);
    }

    // Allows providers to confirm a proposal once the funding target is met
    // Add modifier so that only provider can call this function
    function AcceptProposal() private {
        require(
            amountFunded == fundingTarget,
            "proposal has not been fully funded"
        );
        // Update proposal status
        proposalAccepted = true;
        // ** Set provider
    }

    // Allows user to request a refund after the funding deadline
    function Refund() public {
        uint256 amount = donations[msg.sender];
        require(
            proposalAccepted == false,
            "Proposal has already been accepted"
        );
        require(amount > 0, "No funds to refund");
        require(
            block.timestamp > fundingDeadline,
            "funding deadline has not been reached"
        );
        // Execute refund
        donations[msg.sender] = 0; // Reset the donor's balance before sending to prevent re-entrancy attacks.
        bool sent = payable(msg.sender).send(amount);
        require(sent, "Failed to send Ether");
    }
}
