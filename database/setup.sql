DROP TABLE IF EXISTS user_dog;
DROP TABLE IF EXISTS initial_adoption_cost;
DROP TABLE IF EXISTS monthly_adoption_cost;
DROP TABLE IF EXISTS long_term_adoption_cost;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS users;


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
    photo TEXT NOT NULL,
    shelter_location_postcode VARCHAR(25) NOT NULL,
    adopted BOOLEAN NOT NULL DEFAULT FALSE, -- still available
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (dog_id)
);

CREATE TABLE initial_adoption_cost (
    initial_id INT GENERATED ALWAYS AS IDENTITY,
    initial_price INT NOT NULL,
    neutered BOOLEAN NOT NULL,
    microchipped BOOLEAN NOT NULL,
    -- size_of_bed BOOLEAN NOT NULL,
    bed_size_price INT NOT NULL, --25 , 30 ,35
    -- bed_size_id INT NOT NULL,
    collar_leash BOOLEAN NOT NULL,
    obedience_classes_needed BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL,
    PRIMARY KEY (initial_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
    -- FOREIGN KEY (bed_size_id) REFERENCES bed_size(bed_size_id)
);

CREATE TABLE monthly_adoption_cost (
    monthly_id INT GENERATED ALWAYS AS IDENTITY,
    monthly_price INT,
    amount_of_food INT NOT NULL, -- how much food would the owner spend on the dog
    pet_insurance INT,
    veterinary_care INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL,
    PRIMARY KEY (monthly_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE long_term_adoption_cost (
    long_term_id INT GENERATED ALWAYS AS IDENTITY,
    major_medical_expenses INT NOT NULL,
    end_of_life INT NOT NULL,
    dog_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (long_term_id),
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



-- Insert data into users table 
-- MAYBE COMMENT THIS OUT
INSERT INTO users (first_name, last_name, email, username, post_code, admin, password)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'johndoe', '12345', FALSE, 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', '54321', FALSE, 'password456');


-- Insert data into preferences table
INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, 
other_animals, fencing, previous_experience_years, annual_income, user_id)
VALUES 
(TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', 3, 60000, 1),
(FALSE, TRUE, 'Medium', 'Small', TRUE, 'Medium', FALSE, '4', 1, 40000, 2),
(TRUE, FALSE, 'Low', 'Medium', TRUE, 'High', TRUE, '5', 2, 50000, 1),
(FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Low', FALSE, '5', 2, 45000, 2);



-- Insert data into dogs table
INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, fencing, experience_required)
VALUES 
('Max', 'Male', 'Brown', 4, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', FALSE),
('Bella', 'Female', 'Black', 3, 'Small', 'Pomeranian', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Medium', TRUE, '4', TRUE),
('Charlie', 'Male', 'White', 5, 'Large', 'German Shepherd', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '8', FALSE),
('Luna', 'Female', 'Gray', 2, 'Medium', 'Siberian Husky', FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', FALSE, '5', TRUE);


-- Insert data into initial_adoption_cost table
INSERT INTO initial_adoption_cost (initial_price, neutered, microchipped, bed_size_price, collar_leash, obedience_classes_needed, dog_id)
VALUES 
(200, TRUE, TRUE, 30, TRUE, TRUE, 1),
(150, TRUE, TRUE, 25, TRUE, FALSE, 2),
(300, TRUE, TRUE, 35, TRUE, TRUE, 3),
(180, TRUE, TRUE, 30, TRUE, TRUE, 4);


-- Insert data into monthly_adoption_cost table
INSERT INTO monthly_adoption_cost (monthly_price, amount_of_food, pet_insurance, veterinary_care, dog_id)
VALUES 
(50, 30, 20, 25, 1),
(45, 20, 15, 20, 2),
(60, 35, 25, 30, 3),
(55, 25, 18, 28, 4);

-- Insert data into long_term_adoption_cost table
INSERT INTO long_term_adoption_cost (major_medical_expenses, end_of_life, dog_id)
VALUES 
(500, 200, 1),
(400, 150, 2),
(600, 250, 3),
(450, 180, 4);


-- Insert data into user_dog table
INSERT INTO user_dog (user_id, dog_id, adoption_date)
VALUES 
(1, 2, '2024-02-20'),
(2, 4, '2024-04-05');