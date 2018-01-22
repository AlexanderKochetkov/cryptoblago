pragma solidity ^0.4.18;

import "./owned.sol";

contract ExpertList is owned {
    
    address[] public experts;

    function ExpertList() public {

    }
    
    function isExpert(address expertAddress) public view returns(bool){
        //return true;
        for(uint i = 0; i < experts.length; i++){
             if(experts[i] == expertAddress) return true;
        }
        return false;
        //return experts[expertAddress];
    }
    
    function addExpert(address expertAddress) public onlyOwner {
        experts.push(expertAddress);
    }
    
    function removeExpert(address expertAddress) public onlyOwner {
        for(uint i = 0; i < experts.length; i++){
            if(experts[i] == expertAddress){
        
                experts[i] = experts[experts.length - 1];
                delete experts[experts.length - 1];
                experts.length--;
        
                return;
            }
        }
        //experts[expertAddress] = false;
    }
    
    function getExpertsCount() public view returns(uint){
        return experts.length;
    }
    
    function getExpert(uint i) public view returns(address){
        return experts[i];
    }

}
