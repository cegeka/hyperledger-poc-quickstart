#!/usr/bin/env node
'use strict';

var request = require('request-promise');

var rootUrl = 'http://localhost:3000/api/';

/**
 * Create user admin
*/
function createAdmin() {
    var options = {
        method: 'POST',
        uri: rootUrl + 'Q8Admin',
        body: {
            userId: 'admin-q8-1',
            name: 'Q8 Admin'
        },
        json: true
    };

    request(options)
        .then(function(response) {
            console.log('createAdmin', response);
        }, function(err) {
            console.error('createAdmin', err);
        });
}

/**
 * Create a customer
 */
function createCustomer(customerId, firstName, lastName) {
    var options = {
        method: 'POST',
        uri: rootUrl + 'Customer',
        body: {
            customerId: customerId,
            firstName: firstName,
            lastName: lastName
        },
        json: true
    };

    request(options).then(function(response) {
        console.log('createCustomer ' + customerId, response);
    }, function(err) {
        console.error('createCustomer ' + customerId, err);
    });

    options = {
        method: 'POST',
        uri: rootUrl + 'LoyaltyCard',
        body: {
            cardId: 'card-' + customerId,
            owner: 'resource:com.cegeka.Customer#' + customerId
        },
        json: true
    };

    request(options).then(function(response) {
        console.log('createCustomer LoyaltyCard ' + customerId, response);
    }, function(err) {
        console.error('createCustomer LoyaltyCard ' + customerId, err);
    });
}

/**
 * Creates a new shop
 */
function createShop(shopId, name) {
    var options = {
        method: 'POST',
        uri: rootUrl + 'Shop',
        body: {
            shopId: shopId,
            name: name,
        },
        json: true
    };

    request(options).then(function(response) {
        console.log('createShop ' + shopId, response);
    }, function(err) {
        console.error('createShop ' + shopId, err);
    });

    options = {
        method: 'POST',
        uri: rootUrl + 'ShopAccount',
        body: {
            shopId: 'shop-' + shopId,
            owner: 'resource:com.cegeka.Shop#' + shopId
        },
        json: true
    };

    request(options).then(function(response) {
        console.log('createShop Account ' + shopId, response);
    }, function(err) {
        console.error('createShop Account ' + shopId, err);
    });
}

/**
* Buy fuel
 */
function buyFuel(amount, customerId) {
    var options = {
        method: 'POST',
        uri: rootUrl + 'BuyFuel',
        body: {
            amount: amount,
            product: 'fuel',
            card: 'resource:com.cegeka.LoyaltyCard#card-' + customerId
        },
        json: true
    };

    request(options).then(function(response) {
        console.log('buyFuel ' + customerId, response);
    }, function(err) {
        console.error('buyFuel ' + customerId, err);
    });
}

createAdmin();
createCustomer('customer1', 'Paulien', 'Lemay');
createCustomer('customer2', 'Nele', 'Daels');
createCustomer('customer3', 'Cristian', 'Sandu');

createShop('delhaize', 'Delhaize');
createShop('bol.com', 'Bol.com');

//buyFuel(10.5, 'customer1');
