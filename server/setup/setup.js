#!/usr/bin/env node
'use strict';

var request = require('request-promise');

var rootUrl = 'http://localhost:3000/api/';

/**
 * Create admin user function
*/
function createAdmin() {
    var options = {
        method: 'POST',
        uri: rootUrl + 'Admin',
        body: {
            userId: 'admin',
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
 * Create customer user function
 */
function createCustomer(customerId, password, firstName, lastName) {
    var options = {
        method: 'POST',
        uri: rootUrl + 'Customer',
        body: {
            customerId: customerId,
            password: password,
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

/**
 * Execute functions
 */
createAdmin();
createCustomer('customer1', '', 'First', 'Customer');
createCustomer('customer2', '', 'Second', 'Customer');
createCustomer('customer3', '', 'Third', 'Customer');
