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
        console.log(`Connected to Bamazon on Session ID: ${connection.threadId}\n`);

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

        console.log(productsTable.toString());

        customerAction();
        
    });    
  
};

function customerAction() {

        INQUIRER
        .prompt([
            {
                type: "input",
                name: "itemID",
                message: "Enter the Item ID of the Product you'd like to purchase:"
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter the Quantity of the Product you'd like to purchase:"
            }
        ]).then( function(res) {

            let itemID = res.itemID;
            let quantity = res.quantity;

            connection.query("SELECT * FROM products WHERE item_id=?", [itemID], function (err, results) {
                if (err) throw err;

                console.log(`\nPlease wait while we confirm your purchase: ${res.quantity} of ${results[0].product_name} for $${results[0].price} each.`);
            });

        });

}

startApp();