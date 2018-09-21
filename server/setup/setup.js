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
createCustomer('customer1', 'DEA26157FA355301663174EAC368538CFF8939F36681D6712DEDBA439AB98B70', 'First', 'Customer');
createCustomer('customer2', 'C8C7CB5B9E8F7A1B3D1D02602ADA62327132391DBE0E8EE07913CD550EEA1F3B', 'Second', 'Customer');
createCustomer('customer3', '18C5C9BE898C65C5E5C51AC3E94FEACFF0B991F8463A3A18EB524E9F7E6131A8', 'Third', 'Customer');
