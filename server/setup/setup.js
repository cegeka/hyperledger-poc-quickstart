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
        uri: rootUrl + 'Admin',
        body: {
            userId: 'admin-1',
            name: 'Standard Admin'
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
}

createAdmin();
createCustomer('customer1', 'Paulien', 'Lemay');
createCustomer('customer2', 'Nele', 'Daels');
createCustomer('customer3', 'Cristian', 'Sandu');
