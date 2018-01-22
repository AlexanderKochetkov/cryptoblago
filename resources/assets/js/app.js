/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let ether = 1000000000000000000;

function init() {
    //web3.eth.accounts[0];

    ExpertListABI = web3.eth.contract(eval(document.head.querySelector('meta[name="ExpertListABI"]').content));
    //ExpertListABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"getExpertsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"expertAddress","type":"address"}],"name":"removeExpert","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"expertAddress","type":"address"}],"name":"addExpert","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"expertAddress","type":"address"}],"name":"isExpert","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"experts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getExpert","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    ExpertVoteABI = web3.eth.contract(eval(document.head.querySelector('meta[name="ExpertVoteABI"]').content));
    OrdersABI = web3.eth.contract(eval(document.head.querySelector('meta[name="OrdersABI"]').content));

    ExpertListAddress = document.head.querySelector('meta[name="ExpertListAddress"]').content;
    ExpertVoteAddress = document.head.querySelector('meta[name="ExpertVoteAddress"]').content;
    OrdersAddress = document.head.querySelector('meta[name="OrdersAddress"]').content;

    ExpertList = ExpertListABI.at(ExpertListAddress);
    ExpertVote = ExpertVoteABI.at(ExpertVoteAddress);
    Orders = OrdersABI.at(OrdersAddress);

    kk = web3.eth.accounts[0];
    $('.k').val(kk);

    if (location.href.indexOf(kk) === -1) {
        if (location.href.indexOf(kk) !== '/0x') {
            location.href = location.href.split('/0x')[0] + '/' + kk;
        } else {
            location.href = location.href + '/' + kk;
        }

    }


    $('#testWeb').click(function () {
        //console.log('aaa', web3.eth.accounts[0]);
        console.log('aaa');

        /* ExpertVote.getVotedWorkersCount(function (error, result) {
         console.log(result);
         });*/

    });

    $('#testWeb, #clientButton').click(function (e) {

        var newOrderId = (new Date).getTime();
        var nnn = Orders.newOrder(newOrderId, function (error, result) {
            if (!error) {
                $('#orderId').val(newOrderId);
                $('form').submit();
            }
            //alert(result);
            console.log(result, error, newOrderId);
        });

        /*var nnn = Orders.newOrder(function (v) {
         var strName = v.toString();
         console.log("Name: " + strName);
         });*/

        console.log(nnn);

        e.preventDefault();
    });

    $('.acceptOrderByClient').each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            var orderId = $(this).closest('.card').data('order-id');
            Orders.approveByClient(orderId, function (error, result) {
                if (!error) {
                }
            });
        });
    });

    $('.acceptOrderByWorker').each(function () {
        var orderId = $(this).closest('.card').data('order-id');

        $(this).click(function (e) {
            e.preventDefault();
            var orderId = $(this).closest('.card').data('order-id');
            Orders.approveByWorker(orderId, function (error, result) {
                if (!error) {
                }
            });
        });

        Orders.getOrderWorker(orderId, function (error, result) {
            console.log(result);
            if (result != kk) {
                $('.card[data-order-id=' + orderId + ']').hide();
            }
        })
    });

    $('.workerClaimReward').each(function () {
        var orderId = $(this).closest('.card').data('order-id');
        $(this).click(function (e) {
            Orders.claimReward(orderId, function (error, result) {
            });
        });
    });

    $('.payOrderBySponsor').each(function () {
        var orderId = $(this).closest('.card').data('order-id');


        $(this).click(function (e) {
            e.preventDefault();
            var orderId = $(this).closest('.card').data('order-id');

            Orders.payOrder(orderId, {from: kk, value: ether * 0.1}, function (error, result) {

            });
            /*Orders.approveByClient(orderId, function (error, result) {
             if (!error) {
             }
             });*/
        });
    });

    $('.approveWorker').each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            var workerK = $(this).closest('.card').data('worker-k');

            ExpertVote.doVote(workerK, true, function (error, result) {

            });
        });
    });

    $('.card').each(function () {
        var orderId = $(this).data('order-id');

        /*Orders.getVotedWorkersCount(function (error, result) {
         console.log(result);
         });*/
    });

    ExpertList.isExpert(kk, function (error, result) {
        $('.export-block').hide();
        if (!result) {
            $('.export-block-no').show();
        } else {
            $('.export-block-list').show();
        }
    });

    $('.addExperts').each(function () {
        $(this).click(function () {
            expert1 = '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d';
            expert2 = '0xd03ea8624C8C5987235048901fB614fDcA89b117';
            expert3 = '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC';

            ExpertList.addExpert(expert1, function (error, result) {
            });
            ExpertList.addExpert(expert2, function (error, result) {
            });
            ExpertList.addExpert(expert3, function (error, result) {
            });
        });
    });


    ExpertVote.isVotedWorker(function (error, result) {
        console.log(result);
        $('.worker-block').hide();
        if (!result) {
            $('.worker-block-no').show();
        } else {
            $('.worker-block-list').show();
        }
    });
}

$(document).ready(function () {

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);

        if (typeof web3 !== 'undefined') {
            init();
        } else {
            if (location.href.indexOf('nometamask') === -1)
                location = '/nometamask';
            //$("body").html('Войдите в свой кошелек MetaMask!');
        }

    } else {
        if (location.href.indexOf('nometamask') === -1)
            location = '/nometamask';

        //$("body").html('Запустите MetaMask!');

        //var contractAbi = eth.contract(AbiOfContract);
        //var myContract = contractAbi.at(contractAddress);
        //var getData = myContract.myFunction.getData(function parameters);
        //web3.eth.sendTransaction({to:Contractaddress, from:Accountaddress, data: getData});
    }

});

$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});
