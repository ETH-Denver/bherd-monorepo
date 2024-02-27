//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Deployer.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Proposal is ERC721 {
    uint256 public constant FUNDING_LEAD = 30 days;

    // Proposal parameters
    address public deployer;
    uint256 public startDay; // Date range of the ad, for specified time: start = end
    uint256 public endDay;
    uint256 public lat; // Latitude of ad
    uint256 public long; // Longitude of ad
    string public target; // Event description
    string public message; // Proposed message
    string public contentType; // Banner plane, Skywriter etc

    uint256 public fundingDeadline; // Fundraising deadline if fundingTarget not met users can request a refund
    uint256 public fundingTarget; // Ad cost
    address public provider; // default provider is the team
    uint256 public amountFunded; // current funding total
    string public url; // proof of execution
    uint256 public nftId; // NFT id

    mapping(address => uint256) contributions; // track contributions in event of refunds

    constructor(
        address _deployer,
        uint256 _startDay,
        uint256 _endDay,
        uint256 _lat,
        uint256 _long,
        string memory _target,
        string memory _contentType,
        string memory _contentMessage
    ) ERC721("B Herd", "HERD") {
        deployer = _deployer;
        startDay = _startDay;
        endDay = _endDay;
        lat = _lat;
        long = _long;
        target = _target;
        message = _contentMessage;
        contentType = _contentType;

        // Calculate ad cost based on content type
        if (keccak256(abi.encodePacked(contentType)) == keccak256(abi.encodePacked("Skywriting"))) {
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
    function contribute() public payable {
        uint _amount = msg.value;
        require(
            amountFunded + _amount <= fundingTarget,
            "cannot contribute more than the funding target"
        );

        // Update funding total
        amountFunded += _amount;

        // Track users donation
        contributions[msg.sender] += _amount;
    }

    // Allows contributions by directly sending ether to this contract
    receive() external payable {
        contribute();
    }

    // Allows providers to confirm a proposal once the funding target is met
    // Add modifier so that only provider can call this function
    function acceptProposal() public {
        require(Deployer(deployer).IsProvider(msg.sender),"Only providers can accept proposals");
        require(
            amountFunded > fundingTarget*99/100,
            "proposal has not been fully funded"
        );
        provider = msg.sender;
    }

    // Allows user to request a refund after the funding deadline
    function refund() public {
        uint256 amount = contributions[msg.sender];
        require(provider == address(0), "Proposal has already been accepted");
        require(amount > 0, "No funds to refund");
        require(
            block.timestamp > fundingDeadline,
            "funding deadline has not been reached"
        );
        // Execute refund
        contributions[msg.sender] = 0; // Reset the donor's balance before sending to prevent re-entrancy attacks.
        bool sent = payable(msg.sender).send(amount);
        require(sent, "Failed to send Ether");
    }

    // Complete Proposal by uploading a url to evidence of the ad
    function completeProposal(string memory _url) public {
        require(msg.sender == provider,"Only the provider can complete proposal");
        url = _url;
        // Disburse funds
        bool sent = payable(msg.sender).send(fundingTarget);
        require(sent, "Failed to send Ether");
    }

    function mint() external {
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "User did not contribute");
        require(bytes(url).length != 0, "Proposal is not complete");

        nftId ++;
        contributions[msg.sender] = 0;

        _safeMint(msg.sender, nftId);

    }
}



