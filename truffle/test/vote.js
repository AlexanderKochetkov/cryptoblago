let ExpertList = artifacts.require("./ExpertList.sol");
let ExpertVote = artifacts.require("./ExpertVote.sol");
let Orders = artifacts.require("./Orders.sol");

let address1 = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C2';
/*let expert1 = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c111';
 let expert2 = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c222';
 let expert3 = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c333';*/
let vote;
let list;
let orders;
let accountsAr;
let account1;
let account2;
let accountSponsor;
let client1;
let expert1;
let expert2;
let expert3;
let accountWorker;
let accountWorker2;

let ether = 1000000000000000000;

contract('ExpertList', function (accounts) {
    accountsAr = accounts;

    account1 = accounts[0];
    account2 = accounts[1];

    client1 = accounts[2];
    client2 = accounts[3];

    expert1 = accounts[4];
    expert2 = accounts[5];
    expert3 = accounts[6];

    accountWorker = accounts[7];
    accountWorker2 = accounts[8];
    accountSponsor = accounts[9];

    it("should add expert, check expert, remove expert", function () {
        return ExpertList.deployed().then(function (instance) {
            list = instance;
            return list.addExpert(expert1);
        }).then(function () {
            return list.isExpert(expert1);
        }).then(function (result) {
            assert.equal(result, true, 'expert added and cheched');
        }).then(function () {
            return list.removeExpert(expert1);
        }).then(function () {
            return list.isExpert(expert1);
        }).then(function (result) {
            assert.equal(result, false, 'expert removed and cheched');
        });
    });

    it("should add many expert, check expert, remove second expert", function () {
        return list.addExpert(expert1).then(function () {
            return list.addExpert(expert2);
        }).then(function () {
            return list.addExpert(expert3);
        }).then(function () {
            return list.removeExpert(expert1);
        }).then(function () {
            return list.isExpert(expert1);
        }).then(function (result) {
            assert.equal(result, false, 'expert1 removed and cheched');
        }).then(function () {
            return list.isExpert(expert2);
        }).then(function (result) {
            assert.equal(result, true, 'expert2 cheched');
        }).then(function () {
            return list.isExpert(expert3);
        }).then(function (result) {
            assert.equal(result, true, 'expert3 cheched');
        }).then(function () {
            return list.addExpert(expert1);
        });
    });
});

contract('ExpertVote', function (accounts) {
    it("should vote", function () {

        return ExpertVote.deployed().then(function (instance) {
            vote = instance;
            list.addExpert.sendTransaction(expert1);
            list.addExpert.sendTransaction(expert2);
            list.addExpert.sendTransaction(expert3);
            list.isExpert(expert2).then(function (res) {
                console.log('is expert2 = ', res)
            });
            return vote.countPositiveVotes.call(accountWorker);
        }).then(function (count) {
            assert.equal(count, 0);
            vote.doVote.sendTransaction(accountWorker, true, {from: expert1});
            vote.doVote.sendTransaction(accountWorker, true, {from: expert2});
            return vote.doVote.sendTransaction(accountWorker, false, {from: expert3});
        }).then(function () {
            list.isExpert(accountWorker).then(function (res) {
                console.log('isAccountWorker = ', res)
            });

            return vote.countPositiveVotes.call(accountWorker);
        }).then(function (count) {
            console.log('countPositiveVotes=', count.valueOf());

            vote.getVotedWorkersCount.call().then(function (count) { console.log('getVotedWorkersCount', count.valueOf()) });

            return vote.getVotedWorker.call(0);
        }).then(function (adr) {
            console.log('worker1=', adr);

            /*return vote.countNegativeVotes.call(accountWorker);
        }).then(function (count) {
            console.log('countNegativeVotes=', count.valueOf());*/
            //assert.equal(count, 1);
        });
    });

    it("should give worker list", function () {
        return vote.getVotedWorkersCount().then(function (count) {
            console.log('count=', count.valueOf());
        });
    });

});

contract('Orders', function () {
    let orderId = 111;
    let choosenWorker;

    it("should create order", function () {
        return Orders.deployed().then(function (instance) {
            orders = instance;

            list.addExpert.sendTransaction(expert1);
            list.addExpert.sendTransaction(expert2);
            list.addExpert.sendTransaction(expert3);

            vote.doVote.sendTransaction(accountWorker, true, {from: expert1});
            vote.doVote.sendTransaction(accountWorker, true, {from: expert2});

            vote.doVote.sendTransaction(accountWorker2, true, {from: expert2});
            vote.doVote.sendTransaction(accountWorker2, true, {from: expert3});

            vote.getVotedWorkersCount.call().then(function (count) {
                console.log('getVotedWorkersCount=', count.valueOf());
            });

            orders.newOrder.sendTransaction(222, {from: client1});
            orders.newOrder.sendTransaction(333, {from: client1});

            return orders.newOrder.sendTransaction(orderId, {from: client1});
        }).then(function (newId) {
            //orderId = 2; //newId.valueOf();
            //console.log('order id = ', orderId);
            //assert.equal(orderId, 2);

            return orders.payOrder.sendTransaction(orderId, {from: accountSponsor, value: 0.1 * ether});
        }).then(function (result) {
            console.log('payOrder result = ' + result);

            return orders.ordersMap.call(orderId);
        }).then(function (result) {
            console.log('test returns', result.valueOf(), result[1]);

            choosenWorker = result[1];

            orders.approveByWorker.sendTransaction(orderId, {from: choosenWorker});
            orders.approveByClient.sendTransaction(orderId, {from: client1});

            return orders.ordersMap.call(orderId);
        }).then(function (result) {
            console.log('after approve = ', result);

            console.log('accountWorker ', web3.eth.getBalance(accountWorker).valueOf());
            console.log('accountWorker2 ', web3.eth.getBalance(accountWorker2).valueOf());
            console.log('expert1 ', web3.eth.getBalance(expert1).valueOf());
            console.log('expert2 ', web3.eth.getBalance(expert2).valueOf());
            console.log('expert3 ', web3.eth.getBalance(expert3).valueOf());
            console.log('owner ', web3.eth.getBalance(accountsAr[0]).valueOf());

            //getBalance(accountsAr[0]);

            return orders.claimReward.sendTransaction(orderId);
        }).then(function () {
            console.log('accountWorker ', web3.eth.getBalance(accountWorker).valueOf());
            console.log('accountWorker2 ', web3.eth.getBalance(accountWorker2).valueOf());
            console.log('expert1 ', web3.eth.getBalance(expert1).valueOf());
            console.log('expert2 ', web3.eth.getBalance(expert2).valueOf());
            console.log('expert3 ', web3.eth.getBalance(expert3).valueOf());
            console.log('owner ', web3.eth.getBalance(accountsAr[0]).valueOf());
        });
    })
});



