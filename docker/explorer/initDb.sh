#!/bin/bash

mysql -u ${DB_USER} --host ${DB_HOST} --password=${DB_PASSWORD} --database fabricexplorer < ./db/fabricexplorer.sql
