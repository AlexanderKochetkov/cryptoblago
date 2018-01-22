pragma solidity ^0.4.18;

import "./owned.sol";

interface ExpertListInterface {
    function getExpertsCount() public view returns(uint);
    function getExpert(uint i) public view returns(address);
}

interface ExpertVoteAddress {
    function getVotedWorkersCount() public view returns(uint);
    function getVotedWorker(uint i) public view returns(address);
}

contract Orders is owned {
    ExpertListInterface expertList;
    ExpertVoteAddress expertVote;
    
    struct OrderInfo {
        address sponsor;
        address worker;
        address client;
        bool approvedByClient;
        bool approvedByWorker;
        uint reward;
        bool rewardClaimed;
    }
    
    //OrderInfo[] public ordersMap;
    mapping(uint => OrderInfo) public ordersMap;
    
    uint public nextOrderId;
    
    function Orders(address expertListAddress, address expertVoteAddress) public {
        expertList = ExpertListInterface(expertListAddress);
        expertVote = ExpertVoteAddress(expertVoteAddress);
    }
    
    function newOrder(uint orderId) public {
        ordersMap[orderId] = OrderInfo({
            sponsor: address(0),
            worker: address(0),
            client: msg.sender,
            approvedByClient: false,
            approvedByWorker: false,
            reward: 0.1 ether,
            rewardClaimed: false
        });
    }
    
    function payOrder(uint orderId) public payable {

        // sum exactly match reward
        require(msg.value == ordersMap[orderId].reward);
        // check if sponsor already exist
        require(ordersMap[orderId].sponsor == address(0));
        
        // appoint worker
        require(expertVote.getVotedWorkersCount() > 0);
        
        ordersMap[orderId].worker = expertVote.getVotedWorker(random(expertVote.getVotedWorkersCount()));
        //ordersMap[orderId].worker = 0x2ecdba9eca792f5b6d620d9031d9c237ce480924;
        ordersMap[orderId].sponsor = msg.sender;
    }

    function approveByWorker(uint orderId) public {
        require(ordersMap[orderId].worker == msg.sender);
        ordersMap[orderId].approvedByWorker = true;
    }
    
    function approveByClient(uint orderId) public {
        require(ordersMap[orderId].client == msg.sender);
        ordersMap[orderId].approvedByClient = true;
    }
    
    function claimReward(uint orderId) public {
        require(ordersMap[orderId].sponsor != address(0));
        require(ordersMap[orderId].approvedByClient);
        require(ordersMap[orderId].approvedByWorker);
        require(!ordersMap[orderId].rewardClaimed);
        
        var workerReward = ordersMap[orderId].reward * 8 / 10;
        ordersMap[orderId].worker.transfer(workerReward);
        
        var length = expertList.getExpertsCount();
        var expertReward = ordersMap[orderId].reward * 1 / length / 10;
        for(uint i = 0; i < length; i++){
            expertList.getExpert(i).transfer(expertReward);
        }
        
        var ownerReward = ordersMap[orderId].reward * 1 / 10;
        owner.transfer(ownerReward);
        
        ordersMap[orderId].rewardClaimed = true;
    }
    
    function random(uint upper) public view returns (uint randomNumber) {
        return uint(keccak256(block.blockhash(block.number), now)) % upper;
    }
    
    function getOrderWorker(uint orderId) public view returns(address){
        return ordersMap[orderId].worker;
    }
}
