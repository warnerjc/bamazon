// read and set environment variables
require("dotenv").config();

// Required NPM packages for Bamazon Storefront Application
const MYSQL = require("mysql");
const INQUIRER = require("inquirer");
const SQL_SERVER = require("./sqlServerSettings");
const TABLE = require("cli-table");

const connection = MYSQL.createConnection(SQL_SERVER.connection);

function startApp() {

    connection.connect(function (err) {
        if (err) throw err;
        console.log(`\nconnected as id ${connection.threadId}\n`);

        readProducts();
    });    

};

function readProducts() {

    var productsTable = new TABLE({
        head: ["Item ID", "Product Name", "Product Cost"], 
        colWidths: [10, 105, 15]
    });

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        for (let i of Object.keys(results)) {
            productsTable.push([results[i].item_id, results[i].product_name, `$ ${results[i].price}`]);
        };

        return console.log(productsTable.toString());
        
    });    
  
};

startApp();