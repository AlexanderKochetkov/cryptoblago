let ExpertList = artifacts.require("./ExpertList.sol");
let ExpertVote = artifacts.require("./ExpertVote.sol");
let Orders = artifacts.require("./Orders.sol");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(ExpertList).then(function () {
        console.log(ExpertList.address);
        return deployer.deploy(ExpertVote, ExpertList.address);
    }).then(function () {
        console.log(ExpertVote.address);
        return deployer.deploy(Orders, ExpertList.address, ExpertVote.address);
    }).then(function () {
        console.log(Orders.address);
    });
};

// ExpertList
// ExpertVote
// Orders
