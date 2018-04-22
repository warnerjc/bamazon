CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,3) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

-- dummy product one --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Samsung 4K TV", "Electronics", 499.95, 43);

-- dummy product two --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Apple iPhone 8", "Electronics", 799.95, 28);

-- dummy product three --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Razer Laptop", "Electronics", 1459.59, 12);

-- dummy product four --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Colgac Toothbrush 2-pack", "Toiletries", 7.88, 25);

-- dummy product five --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Charmin Toilet Paper 6-pack", "Toiletries", 12.98, 52);

-- dummy product six --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Puff's Ultra Soft Tissues", "Toiletries", 2.65, 30);

-- dummy product seven --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Levi 505 Jean Men's", "Clothing", 38.50, 102);

-- dummy product eight --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Levi 505 Jean Women's", "Clothing", 38.50, 98);

-- dummy product nine --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Standard Black Tee", "Clothing", 12.95, 240);

-- dummy product ten --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Silver Ware Set", "Kitchen", 48.99, 18);

-- dummy product eleven --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Dinner Plate Set", "Kitchen", 63.50, 23);

-- dummy product twelve --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Drinking Glass Set", "Kitchen", 38.00, 15);

