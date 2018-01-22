pragma solidity ^0.4.18;

import "./owned.sol";

interface ExpertListInterface {
    function isExpert(address expertAddress) public view returns(bool);
}

contract ExpertVote {
    
    ExpertListInterface expertList;
    
    struct VoteStruct {
        address expert;
        address worker;
        bool decision;
    }
    
    VoteStruct[] public votes;
    address[] public votedWorkers;
    mapping (address => address) public votesLog;
    
    modifier isExpert() {
        require(expertList.isExpert(msg.sender));
        _;
    }
    
    function ExpertVote(address expertListAddress) public {
        expertList = ExpertListInterface(expertListAddress);
    }
    
    function doVote(address workerAddress, bool decision) public isExpert {
        require(votesLog[msg.sender] != workerAddress);
        
        var voteStruct = VoteStruct({expert: msg.sender, worker: workerAddress, decision: decision});
        votes.push(voteStruct);
        
        votesLog[msg.sender] = workerAddress;
        
        if(countPositiveVotes(workerAddress) == 2) {
            votedWorkers.push(workerAddress);
        }
    }
    
    function countPositiveVotes(address workerAddress) public view returns(uint) {
        uint count = 0;
        for(uint i = 0; i < votes.length; i++ ){
            if((votes[i].worker == workerAddress) && (votes[i].decision == true)){
                count++;
            }
        }
        return count;
    }
    
    function countNegativeVotes(address workerAddress) public view returns(uint) {
        uint count = 0;
        for(uint i = 0; i < votes.length; i++ ){
            if((votes[i].worker == workerAddress) && (votes[i].decision == false)){
                count++;
            }
        }
        return count;
    }
    
    function getVotedWorkersCount() public view returns(uint){
        return votedWorkers.length;
    }
    
    function getVotedWorker(uint i) public view returns(address){
        return votedWorkers[i];
    }
    
    function isVotedWorker() public view returns(bool){
        for(uint i=0; i<votedWorkers.length; i++){
            if(votedWorkers[i] == msg.sender) return true;
        }
        return false;
    }
    
}
