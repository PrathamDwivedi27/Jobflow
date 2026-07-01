-- Custom SQL migration file, put your code below! --
INSERT INTO categories (name, charge) VALUES
    ('Electronics', 50),
    ('Apparel', 30),
    ('Home & Kitchen', 40),
    ('Grocery', 20),
    ('Furniture', 60),
    ('Sports & Outdoors', 40),
    ('Health & Beauty', 30),
    ('Office Supplies', 40),
    ('Toys & Games', 30)
ON CONFLICT (name) DO NOTHING;