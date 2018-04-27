# bamazon
CLI application for an Amazon-like storefront using MySQL to communicate with a SQL Database. 

## SQL Database
SQL Database containing storefront Products

1. item_id - unique, primary id assigned to product
2. product_name - name of product
3. department_name - department product is assigned to
4. price - current product price to customer
5. stock_quantity - current product stock in store

![alt text][logo]

[logo]: https://github.com/warnerjc/bamazon/blob/master/productsDB.PNG "Example Bamazon DB"

## Customer View
The Customer View allows a customer to view:

1. Current products for sale
2. Make purchases from the store

[Watch a demo video](https://drive.google.com/file/d/1cWFg9yK4ZKdf9jDKtBRPGygjDkVXf5HI/view)

## Manager View
The Manager View allows a manager to view:

1. Currect products for sale
2. Low inventory levels (default at stock levels below or equal to 5)
3. Add inventory for a specific product ID
4. Add a new product to the products database

[Watch a demo video](https://drive.google.com/file/d/1tlNsoU_QWQGX8RbhWek4MPasRTQKaFav/view)

---
Copyright (c) Jason Warner 2018

Credit to all developers / contributors for use of their npm packages
