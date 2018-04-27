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

        console.log(`\n${productsTable.toString()}`);

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
        ]).then(function (res) {

            checkOrder(res.itemID, res.quantity);

        });

}

function checkOrder(itemID, quantity) {

    connection.query("SELECT product_name, stock_quantity, price FROM products WHERE item_id=?", [itemID], function (err, results) {
        if (err) throw err;

        console.log(`\nPlease wait while we confirm your purchase: ${quantity} of ${results[0].product_name} for $${results[0].price} each.`);

        if (!checkStock(quantity, results[0].stock_quantity)) {
            console.log(`\nUnfortunately, we don't have enough stock to fulfill your order.`);
            readProducts();
        } else {
            processOrder(itemID, quantity, results[0].stock_quantity, results[0].product_name, results[0].price, function(err, res) {
                if(res) { 
                    console.log(`\nYour order was succesfully processed for ${quantity} of ${results[0].product_name} for a total of $${quantity * results[0].price}.`);
                    readProducts();
                } else {
                    console.log(`\nSomething went wrong while processing your order. Order cancelled.`);
                    readProducts();
                }
            });    
        }
    });
}

function checkStock(custQuantity, stockQuantity) {

    if (custQuantity <= stockQuantity) {
        return true;
    } else {
        return false;
    };

};

function processOrder(itemID, custQuantity, stockQuantity, productName, eachPrice, callback) {
    
    let newQuantity = stockQuantity - custQuantity;

    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id=?", [newQuantity, itemID], function (err, results) {
        if (err) throw err;

        // Console Log to notice if DB was updated
        // console.log(results.affectedRows + " record(s) updated");

        callback(null, true);
    });

};

startApp();