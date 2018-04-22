// read and set environment variables
require("dotenv").config();

// Required NPM packages for Bamazon Storefront Application
const mysql = require("mysql");
const inquirer = require("inquirer");
const sqlServer = require("./sqlServerSettings");

const connection = mysql.createConnection(sqlServer.connection);