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

        managerAction();
    });

};

function managerAction() {
    INQUIRER
        .prompt([
            {
                type: "list",
                name: "action",
                message: "Welcome! What would you like to do?",
                choices: ["View Products", "View Low Inventory", "Add Inventory", "Add Product"],
                filter: function (val) {
                    return val.toLowerCase();
                }
            }
        ]).then (function (res) {

            switch(res.action) {
                case "view products":
                    viewProducts();
                    break;

                case "view low inventory":
                    viewLowInventory();
                    break;

                case "add inventory":
                    addInventory();
                    break;

                case "add product":
                    addProduct();
                    break;

                default:
                    console.log(`\nSomething went wrong. Let's try again.`);
                    managerAction();
                    break;
            }

        });
}

function viewProducts() {

    var productsTable = new TABLE({
        head: ["Item ID", "Product Name", "Product Cost", "Quantity"],
        colWidths: [10, 105, 15, 15]
    });

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        for (let i of Object.keys(results)) {
            productsTable.push([results[i].item_id, results[i].product_name, `$ ${results[i].price}`, results[i].stock_quantity]);
        };

        console.log(`\n${productsTable.toString()}`);

        managerAction();
    });

};

function viewLowInventory() {

};

function addInventory() {

};

function addProduct() {

};

startApp();