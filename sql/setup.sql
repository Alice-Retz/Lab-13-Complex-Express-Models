DROP TABLE IF EXISTS orders, species CASCADE;

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id BIGINT, 
    animal_species TEXT NOT NULL,
    extinct BOOLEAN    
);

INSERT INTO species (order_id, animal_species, extinct)
    VALUES ('1', 'Thylacine', true), ('1', 'Numbat', false), ('2', 'Okapi', false), ('3', 'Jerboa', false);
    


CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_name TEXT NOT NULL
);

INSERT INTO orders (order_name)
    VALUES ('Dasyuromorphia'), ('Artiodactyla'), ('Rodentia');