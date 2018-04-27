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
        ]).then(function (res) {

            switch (res.action) {
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

        console.log(`\n${productsTable.toString()}\n`);

        managerAction();
    });

};

function viewLowInventory() {

    let quantity = 5;

    var productsTable = new TABLE({
        head: ["Item ID", "Product Name", "Product Cost", "Quantity"],
        colWidths: [10, 105, 15, 15]
    });

    connection.query("SELECT * FROM products WHERE stock_quantity <= ?", [quantity], function (err, results) {
        if (err) throw err;

        if (results.length === 0) {
            console.log(`\nThere are no products below a stock quantity of 5\n`);

            managerAction();
        } else {

            for (let i of Object.keys(results)) {
                productsTable.push([results[i].item_id, results[i].product_name, `$ ${results[i].price}`, results[i].stock_quantity]);
            };

            console.log(`\nViewing all products equal to or below a quantity of ${quantity}.\n`);
            console.log(`\n${productsTable.toString()}\n`);

            managerAction();
        }
    });

};

function addInventory() {

    INQUIRER
        .prompt([
            {
                type: "input",
                name: "productID",
                message: "Enter the product ID to add inventory:"
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter the product quantity to add to inventory:"
            }
        ]).then(function (res) {

            let currentStock;
            let updatedStock;
            let productID = parseInt(res.productID);

            var productsTable = new TABLE({
                head: ["Item ID", "Old Quantity", "New Quantity"],
                colWidths: [10, 15, 15]
            });

            connection.query("SELECT * FROM products WHERE item_id= ?", [productID], function (err, results) {

                if (results.length === 0) {
                    console.log(`\nThere is no product matching that ID.\n`);
                    managerAction();
                } else {


                    currentStock = results[0].stock_quantity;
                    updatedStock = currentStock + parseInt(res.quantity);

                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedStock, productID], function (err, results) {
                        if (err) throw err;

                        connection.query("SELECT * FROM products WHERE item_id= ?", [productID], function (err, results) {
                            
                            for (let i of Object.keys(results)) {
                                console.log(`${results[i].item_id} ${currentStock} ${results[i].stock_quantity}`);
                                productsTable.push([results[i].item_id, currentStock, results[i].stock_quantity]);
                            };

                            console.log(`\nProduct inventory updated.\n`);
                            console.log(`\n${productsTable.toString()}\n`);

                            managerAction();
                        });

                    });
                }

            });

        });

};

function addProduct() {

};

startApp();