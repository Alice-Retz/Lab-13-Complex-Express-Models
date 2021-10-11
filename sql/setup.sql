DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS species CASCADE;

    
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_name TEXT NOT NULL
);

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id BIGINT,
    FOREIGN KEY (order_id) REFERENCES orders(id), 
    animal_species TEXT NOT NULL,
    extinct BOOLEAN    
);


INSERT INTO orders (order_name)
    VALUES ('Dasyuromorphia'), ('Artiodactyla'), ('Rodentia');

INSERT INTO species (order_id, animal_species, extinct)
    VALUES ('1', 'Thylacine', true), ('1', 'Numbat', false), ('2', 'Okapi', false), ('3', 'Jerboa', false);