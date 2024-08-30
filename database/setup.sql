DROP TABLE IF EXISTS user_dog;
DROP TABLE IF EXISTS initial_adoption_cost;
DROP TABLE IF EXISTS monthly_adoption_cost;
DROP TABLE IF EXISTS long_term_adoption_cost;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bed_size;
DROP TABLE IF EXISTS neutering_price;
DROP TABLE IF EXISTS amount_of_food;
DROP TABLE IF EXISTS pet_insurance;
DROP TABLE IF EXISTS veterinary_care;
DROP TABLE IF EXISTS end_of_life;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(75) NOT NULL,
    username VARCHAR(15) NOT NULL,
    post_code VARCHAR(10) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    password VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE bed_size (
    bed_size_id INT GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    bed_price INT NOT NULL,
    PRIMARY KEY (bed_size_id)
);

CREATE TABLE neutering_price (
    neutering_price_id INT GENERATED ALWAYS AS IDENTITY,
    gender VARCHAR (30) NOT NULL,
    size VARCHAR(30) NOT NULL,
    neutering_price INT NOT NULL,
    PRIMARY KEY (neutering_price_id)
);

CREATE TABLE amount_of_food (
    amount_of_food_id INT GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    food_price INT,
    PRIMARY KEY (amount_of_food_id)
);

CREATE TABLE pet_insurance (
    pet_insurance_id INT GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    insurance_price INT,
    PRIMARY KEY (pet_insurance_id)
);

CREATE TABLE veterinary_care (
    veterinary_care_id INT GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    vet_price FLOAT NOT NULL,
    PRIMARY KEY (veterinary_care_id)
);

CREATE TABLE end_of_life (
    end_of_life_id INT GENERATED ALWAYS AS IDENTITY,
    size VARCHAR(10) NOT NULL,
    end_of_life_price INT,
    PRIMARY KEY (end_of_life_id)
);


CREATE TABLE preferences (
    preference_id INT GENERATED ALWAYS AS IDENTITY,
    small_animals TEXT,
    young_children TEXT,
    activity TEXT, -- low, medium high
    living_space_size TEXT,
    garden TEXT,
    allergy_information TEXT,
    other_animals TEXT,
    fencing TEXT, -- FEET
    previous_experience_years TEXT,
    annual_income TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (preference_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);



CREATE TABLE dogs (
    dog_id INT GENERATED ALWAYS AS IDENTITY,
    dog_name VARCHAR(25) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    colour VARCHAR(25) NOT NULL,
    age INT NOT NULL,
    size VARCHAR(20) NOT NULL, -- small,medium,large?
    breed VARCHAR(50) NOT NULL, -- REPEATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    young_children_compatibility BOOLEAN NOT NULL,
    small_animal_compatibility BOOLEAN NOT NULL,
    activity_levels VARCHAR(10) NOT NULL, -- High Medium Low,
    living_space_size VARCHAR(50) NOT NULL,
    garden BOOLEAN NOT NULL,
    allergenic VARCHAR(10) NOT NULL, -- low medium high
    other_animals BOOLEAN NOT NULL,
    fencing VARCHAR(10) NOT NULL, -- FEET
    experience_required BOOLEAN NOT NULL,
    adopted BOOLEAN NOT NULL DEFAULT FALSE, -- still available
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    neutered BOOLEAN NOT NULL,
    microchipped BOOLEAN NOT NULL,
    collar_leash BOOLEAN NOT NULL,
    obedience_classes_needed BOOLEAN NOT NULL,
    photo TEXT NOT NULL,
    shelter_location_postcode VARCHAR(25) NOT NULL,
    PRIMARY KEY (dog_id)
);

CREATE TABLE initial_adoption_cost (
    initial_id INT GENERATED ALWAYS AS IDENTITY,
    calculated_price INT NOT NULL,
    neutering_price_id INT NOT NULL,
    microchip_price FLOAT NOT NULL,
    bed_size_id INT NOT NULL,
    collar_leash_price INT NOT NULL,
    obedience_classes_price INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL,
    PRIMARY KEY (initial_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE,
    FOREIGN KEY (bed_size_id) REFERENCES bed_size(bed_size_id) ON DELETE CASCADE,
    FOREIGN KEY (neutering_price_id) REFERENCES neutering_price(neutering_price_id) ON DELETE CASCADE
);

-- CREATE TABLE monthly_adoption_cost (
--     monthly_id INT GENERATED ALWAYS AS IDENTITY,
--     -- monthly_price INT,
--     amount_of_food INT NOT NULL, -- how much food would the owner spend on the dog
--     pet_insurance INT,
--     veterinary_care INT NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     dog_id INT NOT NULL,
--     PRIMARY KEY (monthly_id),
--     FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
-- );

CREATE TABLE monthly_adoption_cost (
    monthly_id INT GENERATED ALWAYS AS IDENTITY,
    amount_of_food_id INT NOT NULL,
    pet_insurance_id INT NOT NULL,
    veterinary_care_id INT NOT NULL,
    dog_id INT NOT NULL,
    PRIMARY KEY (monthly_id),
    FOREIGN KEY (amount_of_food_id) REFERENCES amount_of_food(amount_of_food_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_insurance_id) REFERENCES pet_insurance(pet_insurance_id) ON DELETE CASCADE,
    FOREIGN KEY (veterinary_care_id) REFERENCES veterinary_care(veterinary_care_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE long_term_adoption_cost (
    long_term_id INT GENERATED ALWAYS AS IDENTITY,
    -- major_medical_expenses INT NOT NULL,
    end_of_life_id INT NOT NULL,
    average_medical_cost INT NOT NULL,
    dog_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (long_term_id),
    FOREIGN KEY (end_of_life_id) REFERENCES end_of_life(end_of_life_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE user_dog (
    user_dog_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    dog_id INT NOT NULL,
    adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_dog_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

-- CREATE TABLE bed_size (
--     bed_size_id INT GENERATED ALWAYS AS IDENTITY,
--     size VARCHAR(10) NOT NULL,
--     bed_price INT,
--     PRIMARY KEY (bed_size_id)
-- );

-- CREATE TABLE amount_of_food (
--     amount_of_food_id INT GENERATED ALWAYS AS IDENTITY,
--     size VARCHAR(10) NOT NULL,
--     food_price INT,
--     PRIMARY KEY (amount_of_food_id)
-- );

-- CREATE TABLE pet_insurance (
--     pet_insurance_id INT GENERATED ALWAYS AS IDENTITY,
--     size VARCHAR(10) NOT NULL,
--     insurance_price INT,
--     PRIMARY KEY (pet_insurance_id)
-- );

-- CREATE TABLE veterinary_care (
--     veterinary_care_id INT GENERATED ALWAYS AS IDENTITY,
--     size VARCHAR(10) NOT NULL,
--     vet_price INT,
--     PRIMARY KEY (veterinary_care_id)
-- );

-- CREATE TABLE end_of_life (
--     end_of_life_id INT,
--     size VARCHAR(10) NOT NULL,
--     end_of_life_price INT,
--     PRIMARY KEY (end_of_life_id)
-- );


-- Insert data into users table 
-- MAYBE COMMENT THIS OUT
INSERT INTO users (first_name, last_name, email, username, post_code, admin, password)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'johndoe', '12345', FALSE, 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', '54321', FALSE, 'password456');

INSERT INTO bed_size (size, bed_price)
values
('Small', 25),
('Medium', 30),
('Large', 35);

INSERT INTO neutering_price (gender, size, neutering_price)
VALUES
('Male', 'Small', 248),
('Male', 'Medium', 278),
('Male', 'Large', 316),
('Female', 'Small', 326),
('Female', 'Medium', 369),
('Female', 'Large', 414),
('Male Female', 'Small Large Medium', 0);

INSERT INTO amount_of_food (size, food_price)
VALUES
('Small', 20),
('Medium', 30),
('Large', 50);

INSERT INTO pet_insurance (size, insurance_price)
VALUES
('Small', 25),
('Medium', 30),
('Large', 45);

INSERT INTO veterinary_care (size, vet_price)
VALUES
('Small', 55),
('Medium', 57.50),
('Large', 62.50);

INSERT INTO end_of_life (size, end_of_life_price)
VALUES
('Small', 265),
('Medium', 335),
('Large', 410);

-- INSERT INTO long_term_adoption_cost (end_of_life_id, average_medical_cost, dog_id)
-- VALUES
-- (2, 822, 1),
-- (1, 822, 2),
-- (3, 822, 3),
-- (2, 822, 4);

-- INSERT INTO end_of_life (size, end_of_life_price)
-- VALUES
-- ('Small', 265),
-- ('Medium', 335),
-- ('Large', 410);


-- Insert data into preferences table
INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, 
other_animals, fencing, previous_experience_years, annual_income, user_id)
VALUES 
(TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', 3, 60000, 1),
(FALSE, TRUE, 'Medium', 'Small', TRUE, 'Medium', FALSE, '4', 1, 40000, 2),
(TRUE, FALSE, 'Low', 'Medium', TRUE, 'High', TRUE, '5', 2, 50000, 1),
(FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Low', FALSE, '5', 2, 45000, 2);


-- Insert data into dogs table
INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, 
small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, 
fencing, experience_required, neutered, microchipped, collar_leash, obedience_classes_needed, photo, shelter_location_postcode)
VALUES 
('Max', 'Male', 'Brown', 4, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', FALSE, TRUE, TRUE, FALSE, TRUE, 'https://images.unsplash.com/photo-1537204696486-967f1b7198c8', 'E1 7QX'),
('Bella', 'Female', 'Black', 3, 'Small', 'Pomeranian', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Medium', TRUE, '4', TRUE, FALSE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1719177518277-9bf8126b277d', 'M1 2EH'),
('Charlie', 'Male', 'White', 5, 'Large', 'German Shepherd', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '8', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://images.unsplash.com/photo-1649923625148-1e13d9431053', 'BS1 2LZ'),
('Luna', 'Female', 'Gray', 2, 'Medium', 'Siberian Husky', FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', FALSE, '5', TRUE, TRUE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1668208363137-7ebc4ce6b7b7', 'B5 4HU'),
('Rocky', 'Male', 'Brindle', 6, 'Large', 'Boxer', TRUE, FALSE, 'High', 'Large', TRUE, 'Medium', TRUE, '6', TRUE, FALSE, TRUE, FALSE, TRUE, 'https://images.unsplash.com/photo-1619876451741-407e8350442e', 'SW1A 1AA');


-- Insert data into initial_adoption_cost table
INSERT INTO initial_adoption_cost (calculated_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id)
VALUES 
(110, 7, 0, 2, 15, 65, 1),
(416, 4, 0, 1, 15, 65, 2),
(300, 3, 10.90, 3, 15, 65, 3),
(180, 5, 0, 2, 15, 65, 4);


-- Insert data into monthly_adoption_cost table
-- INSERT INTO monthly_adoption_cost (monthly_price, amount_of_food, pet_insurance, veterinary_care, dog_id)
-- VALUES 
-- (50, 30, 20, 25, 1),
-- (45, 20, 15, 20, 2),
-- (60, 35, 25, 30, 3),
-- (55, 25, 18, 28, 4);

-- Insert data into long_term_adoption_cost table
-- INSERT INTO long_term_adoption_cost (major_medical_expenses, end_of_life, dog_id)
-- VALUES 
-- (500, 200, 1),
-- (400, 150, 2),
-- (600, 250, 3),
-- (450, 180, 4);


-- Insert data into user_dog table
INSERT INTO user_dog (user_id, dog_id, adoption_date)
VALUES 
(1, 2, '2024-02-20'),
(2, 4, '2024-04-05');

-- INSERT INTO bed_size (bed_size_id, size, bed_price, dog_id)
-- values
-- (1, 'Small', 25),
-- (2, 'Medium', 30),
-- (3, 'Large', 35);

INSERT INTO monthly_adoption_cost (amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id)
VALUES
(2, 2, 2, 1),
(1, 1, 1, 2),
(3, 3, 3, 3),
(2, 2, 2, 4);

-- INSERT INTO amount_of_food (amount_of_food_id, size, food_price)
-- VALUES
-- (1, 'Small', 20),
-- (2, 'Medium', 30),
-- (3, 'Large', 50);

-- INSERT INTO pet_insurance (pet_insurance_id, size, insurance_price)
-- VALUES
-- (1, 'Small', 25),
-- (2, 'Medium', 30),
-- (3, 'Large', 45);

-- INSERT INTO veterinary_care (veterinary_care_id, size, vet_price)
-- VALUES
-- (1, 'Small', 55),
-- (2, 'Medium', 57.50),
-- (3, 'Large', 62.50);

INSERT INTO long_term_adoption_cost (end_of_life_id, average_medical_cost, dog_id)
VALUES
(2, 822, 1),
(1, 822, 2),
(3, 822, 3),
(2, 822, 4);

-- INSERT INTO end_of_life (end_of_life_id, size, end_of_life_price)
-- VALUES
-- (1, 'Small', 265),
-- (2, 'Medium', 335),
-- (3, 'Large', 410);
