DROP TABLE IF EXISTS initial_adoption_cost;
DROP TABLE IF EXISTS monthly_adoption_cost;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS dogs;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(75) NOT NULL,
    username VARCHAR(15) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    password VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE preferences (
    preference_id INT GENERATED ALWAYS AS IDENTITY,
    small_animals BOOLEAN NOT NULL,
    young_children BOOLEAN NOT NULL,
    activity VARCHAR(10) NOT NULL, -- low, medium high
    living_space_size VARCHAR(50) NOT NULL,
    garden BOOLEAN NOT NULL,
    allergy_information VARCHAR(10) NOT NULL,
    other_animals BOOLEAN NOT NULL,
    fencing VARCHAR(10) NOT NULL, -- FEET
    previous_experience_years INT NOT NULL,
    annual_income INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (preference_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);



CREATE TABLE dogs (
    dog_id INT GENERATED ALWAYS AS IDENTITY,
    dog_name VARCHAR(25) NOT NULL,
    dog_initial_price INT NOT NULL,
    dog_monthly_price INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    colour VARCHAR(25) NOT NULL,
    age INT NOT NULL,
    size VARCHAR(20) NOT NULL, -- small,medium,large?
    breed VARCHAR(50) NOT NULL, -- REPEATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    young_children_compatibility BOOLEAN NOT NULL,
    small_animal_compatibility BOOLEAN NOT NULL,
    activity_levels VARCHAR(10) NOT NULL, -- High Medium Low,
    living_space VARCHAR(50) NOT NULL,
    garden BOOLEAN NOT NULL,
    allergenic VARCHAR(10) NOT NULL, -- low medium high
    other_animals BOOLEAN NOT NULL,
    fencing VARCHAR(5) NOT NULL, -- FEET
    experience_required BOOLEAN NOT NULL,
    adopted BOOLEAN NOT NULL, -- still available
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (dog_id)
);

CREATE TABLE initial_adoption_cost (
    initial_id INT GENERATED ALWAYS AS IDENTITY,
    price INT NOT NULL,
    neutered BOOLEAN NOT NULL,
    microchipped BOOLEAN NOT NULL,
    size_of_bed BOOLEAN NOT NULL,
    breed VARCHAR(50) NOT NULL, -- REPEATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    collar_leash BOOLEAN NOT NULL,
    obediance_classes_needed BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL,
    PRIMARY KEY (initial_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE monthly_adoption_cost (
    monthly_id INT GENERATED ALWAYS AS IDENTITY,
    prices INT,
    amount_of_food INT NOT NULL, -- how much food would the owner spend on the dog
    major_medical_expenses INT NOT NULL,
    pet_insurance INT,
    veterinary_care INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL,
    PRIMARY KEY (monthly_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);


CREATE TABLE user_dog (
    user_dog_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    dog_id INT NOT NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_dog_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);



-- Insert data into users table 
-- MAYBE COMMENT THIS OUT
INSERT INTO users (first_name, last_name, email, username, admin, password) VALUES
('John', 'Doe', 'john.doe@example.com', 'johndoe', FALSE, 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', TRUE, 'password456');

-- Insert data into preferences table
INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, other_animals, fencing, previous_experience_years, annual_income, user_id) VALUES
(TRUE, TRUE, 'High', 'Large House', TRUE, 'Low', TRUE, '6', 5, 75000, 1),
(FALSE, TRUE, 'Medium', 'Medium House', TRUE, 'Medium', TRUE, '5', 2, 85000, 2);

-- Insert data into dogs table
INSERT INTO dogs (dog_name, dog_initial_price, dog_monthly_price, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, living_space, garden, allergenic, other_animals, fencing, experience_required, adopted) VALUES
('Buddy', 500, 100, 'Male', 'Brown', 3, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large House', TRUE, 'Low', TRUE, '6', FALSE, FALSE),
('Bella', 600, 80, 'Female', 'Black', 2, 'Medium', 'German Shepherd', TRUE, FALSE, 'High', 'Medium House', TRUE, 'Medium', TRUE, '5', TRUE, FALSE),
('Charlie', 400, 90, 'Male', 'Golden', 4, 'Large', 'Golden Retriever', TRUE, TRUE, 'Medium', 'Large House', TRUE, 'Low', TRUE, '6', FALSE, FALSE),
('Lucy', 450, 70, 'Female', 'White', 1, 'Small', 'Poodle', FALSE, TRUE, 'Low', 'Small Apartment', FALSE, 'High', FALSE, '4', TRUE, TRUE),
('Max', 550, 110, 'Male', 'Black', 5, 'Large', 'Rottweiler', FALSE, FALSE, 'High', 'Large House', TRUE, 'Medium', FALSE, '6', TRUE, FALSE);

-- Insert data into initial_adoption_cost table
INSERT INTO initial_adoption_cost (price, neutered, microchipped, size_of_bed, breed, collar_leash, obediance_classes_needed, dog_id) VALUES
(500, TRUE, TRUE, TRUE, 'Labrador Retriever', TRUE, TRUE, 1),
(600, TRUE, TRUE, TRUE, 'German Shepherd', TRUE, TRUE, 2),
(400, TRUE, TRUE, TRUE, 'Golden Retriever', TRUE, TRUE, 3),
(450, TRUE, TRUE, TRUE, 'Poodle', TRUE, FALSE, 4),
(550, TRUE, TRUE, TRUE, 'Rottweiler', TRUE, TRUE, 5);

-- Insert data into monthly_adoption_cost table
INSERT INTO monthly_adoption_cost (prices, amount_of_food, major_medical_expenses, pet_insurance, veterinary_care, dog_id) VALUES
(100, 30, 50, 20, 50, 1),
(80, 25, 40, 25, 45, 2),
(90, 35, 45, 20, 50, 3),
(70, 20, 30, 15, 40, 4),
(110, 40, 55, 30, 60, 5);

-- Insert data into user_dog table
INSERT INTO user_dog (user_id, dog_id, purchase_date) VALUES
(1, 1, '2023-01-15'),
(2, 2, '2023-02-20');