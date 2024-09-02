DROP TABLE IF EXISTS blacklisted_tokens;
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
    calculated_initial_price NUMERIC(10, 2) NOT NULL,
    neutering_price_id INT NOT NULL,
    microchip_price FLOAT NOT NULL,
    bed_size_id INT NOT NULL,
    collar_leash_price INT NOT NULL,
    obedience_classes_price INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dog_id INT NOT NULL UNIQUE,
    PRIMARY KEY (initial_id),
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE,
    FOREIGN KEY (bed_size_id) REFERENCES bed_size(bed_size_id) ON DELETE CASCADE,
    FOREIGN KEY (neutering_price_id) REFERENCES neutering_price(neutering_price_id) ON DELETE CASCADE
);

CREATE TABLE monthly_adoption_cost (
    monthly_id INT GENERATED ALWAYS AS IDENTITY,
    calculated_monthly_cost NUMERIC(10, 2) NOT NULL,
    amount_of_food_id INT NOT NULL,
    pet_insurance_id INT NOT NULL,
    veterinary_care_id INT NOT NULL,
    dog_id INT NOT NULL UNIQUE,
    PRIMARY KEY (monthly_id),
    FOREIGN KEY (amount_of_food_id) REFERENCES amount_of_food(amount_of_food_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_insurance_id) REFERENCES pet_insurance(pet_insurance_id) ON DELETE CASCADE,
    FOREIGN KEY (veterinary_care_id) REFERENCES veterinary_care(veterinary_care_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE long_term_adoption_cost (
    long_term_id INT GENERATED ALWAYS AS IDENTITY,
    -- major_medical_expenses INT NOT NULL,
    calculated_long_term_cost NUMERIC(10, 2) NOT NULL,
    end_of_life_id INT NOT NULL,
    average_medical_cost INT NOT NULL,
    dog_id INT NOT NULL UNIQUE,
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

CREATE TABLE blacklisted_tokens (
    blacklist_id INT GENERATED ALWAYS AS IDENTITY,
    token TEXT NOT NULL UNIQUE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    PRIMARY KEY (blacklist_id)
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
-- INSERT INTO users (first_name, last_name, email, username, post_code, admin, password)
-- VALUES 
-- ('John', 'Doe', 'john.doe@example.com', 'johndoe', '12345', FALSE, 'password123'),
-- ('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', '54321', FALSE, 'password456');
-- ('Emily', 'Johnson', 'emily.johnson@example.com', 'emilyjohnson', '98765', FALSE, 'password123');

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
-- INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, 
-- other_animals, fencing, previous_experience_years, annual_income, user_id)
-- VALUES 
-- (TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', 3, 60000, 1),
-- (FALSE, TRUE, 'Medium', 'Small', TRUE, 'Medium', FALSE, '4', 1, 40000, 2),
-- (TRUE, FALSE, 'Low', 'Medium', TRUE, 'High', TRUE, '5', 2, 50000, 1),
-- (FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Low', FALSE, '5', 2, 45000, 2);


-- Insert data into dogs table
INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, 
small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, 
fencing, experience_required, neutered, microchipped, collar_leash, obedience_classes_needed, photo, shelter_location_postcode)
VALUES 
('Aubrey', 'Male', 'White and Black', 2, 'Small', 'Cockapoo', FALSE, FALSE, 'High', 'Large', TRUE, 'Low', FALSE, '6', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://rspca-suffolkcentral.org.uk/wp-content/uploads/2024/06/449128468_4311004899126147_7320562135513461547_n.jpg', 'IP12 4PD'),
('Frank', 'Male', 'Brown', 3, 'Small', 'French Bulldog', FALSE, FALSE, 'Low', 'Small', TRUE, 'Medium', FALSE, '3', FALSE, FALSE, TRUE, FALSE, FALSE, 'https://rspca-suffolkcentral.org.uk/wp-content/uploads/2024/08/16095.jpg', 'IP12 4PD'),
('MJ', 'Female', 'Black And Tan', 4, 'Medium', 'Cross Breed', FALSE, FALSE, 'High', 'Medium', TRUE, 'Low', FALSE, '6', TRUE, FALSE, FALSE, TRUE, TRUE, 'https://rspca-suffolkcentral.org.uk/wp-content/uploads/2024/05/MG-3_Dogs_MAC.jpg', 'IP12 4PD'),
('Ruby', 'Female', 'Black And Tan', 2, 'Medium', 'Dobermann', FALSE, FALSE, 'High', 'Medium', TRUE, 'Medium', FALSE, '6', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://rspca-suffolkcentral.org.uk/wp-content/uploads/2024/06/20240414_154436-scaled.jpg', 'IP12 4PD'),
('Eddie', 'Male', 'Black and White', 3, 'Medium', 'Siberian Husky', TRUE, FALSE, 'High', 'Medium', TRUE, 'High', TRUE, '6', FALSE, TRUE, TRUE, FALSE, FALSE, 'https://rspca-suffolkcentral.org.uk/wp-content/uploads/2024/08/16092.jpg', 'IP12 4PD'),
('Hazel', 'Male', 'Brown', 1, 'Small', 'Yorkshire Terrier', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Low', TRUE, '3', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008XWMHMA4.webp', 'SW8 4AA'),
('Hera', 'Female', 'Black', 8, 'Medium', 'Belgian Shepherd', TRUE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', TRUE, '3', FALSE, TRUE, FALSE, FALSE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008ZQr4MAG.webp', 'SW8 4AA'),
('Dee Dee', 'Female', 'Brown', 1, 'Small', 'Mongrel', TRUE, TRUE, 'High', 'Small', FALSE, 'Low', TRUE, '3', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008bshZMAQ.webp', 'SW8 4AA'),
('Vadar', 'Male', 'Grey', 2, 'Medium', 'Pug', TRUE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', TRUE, '3', FALSE, TRUE, TRUE, FALSE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008aptpMAA.webp', 'SW8 4AA'),
('Joe', 'Male', 'Black', 4, 'Large', 'Greyhound', TRUE, TRUE, 'Medium', 'Medium', FALSE, 'Low', TRUE, '3', TRUE, FALSE, FALSE, FALSE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008A4luMAC.webp', 'SL4 2JN'),
('Marvin', 'Male', 'White', 3, 'Large', 'Lurcher', FALSE, FALSE, 'High', 'Large', TRUE, 'Low', TRUE, '3', TRUE, FALSE, TRUE, FALSE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000001OhFAMA0.webp', 'SL4 2JN'),
('Ace', 'Male', 'Black', 3, 'Medium', 'German Pointer', FALSE, FALSE, 'High', 'Medium', FALSE, 'Medium', FALSE, '6', TRUE, FALSE, FALSE, TRUE, FALSE, 'https://www.battersea.org.uk/sites/default/files/animal_images/00PTl000008Pmb8MAC.webp', 'SL4 2JN'),
('Alfonso', 'Male', 'Tan', 5, 'Small', 'Chihuahua', TRUE, TRUE, 'Low', 'Small', FALSE, 'Low', TRUE, '3', TRUE, FALSE, TRUE, TRUE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3471297/068Sh000009xRTlIAM.jpg.webp', 'UB9 6JW'),
('Omelette', 'Male', 'Brown', 2, 'Medium', 'Beagle', TRUE, TRUE, 'Medium', 'Medium', FALSE, 'Medium', TRUE, '3', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/1248544/068Sh000002ZQctIAG.jpg.webp', 'UB9 6JW'),
('Zork', 'Male', 'Brown', 1, 'Medium', 'Shar Pei', FALSE, FALSE, 'High', 'Medium', FALSE, 'Low', TRUE, '3', TRUE, TRUE, FALSE, FALSE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3449667/068Sh000005NiLeIAK.jpg.webp', 'UB9 6JW'),
('Rocko', 'Male', 'Brown', 1, 'Small', 'French Bulldog', TRUE, TRUE, 'Low', 'Medium', TRUE, 'Medium', TRUE, '3', TRUE, FALSE, FALSE, FALSE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3438049/068Sh00000B1FnBIAV.jpg.webp', 'UB9 6JW'),
('Ruby', 'Female', 'Brown', 5, 'Medium', 'Cavalier King Charles Spaniel', TRUE, TRUE, 'Low', 'Low', FALSE, 'Medium', TRUE, '3', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3454543/068Sh000005X0Q0IAK.jpg.webp', 'UB9 6JW'),
('Cindy', 'Female', 'Black and Tan', 6, 'Large', 'German Shepherd', TRUE, TRUE, 'Medium', 'Medium', FALSE, 'High', TRUE, '3', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3472777/068Sh00000BAN1vIAH.jpg.webp', 'SS12 0FH'),
('Rocko', 'Male', 'Black and Tan', 3, 'Large', 'German Shepherd', TRUE, FALSE, 'High', 'Medium', FALSE, 'High', FALSE, '3', TRUE, TRUE, TRUE, FALSE, TRUE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3447485/068Sh00000BAXirIAH.jpg.webp', 'SS12 0FH'),
('Queenie', 'Female', 'White', 4, 'Small', 'French Bulldog', FALSE, FALSE, 'High', 'Small', FALSE, 'Low', FALSE, '3', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3457525/068Sh000009XdYUIA0.jpg.webp', 'SS12 0FH'),
('Phoebe', 'Female', 'Brown and White', 6, 'Medium', 'English Springer Spaniel', TRUE, FALSE, 'Medium', 'Medium', FALSE, 'Low', TRUE, '3', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3067345/068Sh00000AaayXIAR.jpg.webp', 'SS12 0FH'),
('Solomon', 'Male', 'Black and White', 4, 'Medium', 'Border Collie', TRUE, TRUE, 'Medium', 'Medium', FALSE, 'Low', TRUE, '3', FALSE, FALSE, FALSE, TRUE, FALSE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3474124/068Sh00000AUqf0IAD.jpg.webp', 'SS12 0FH'),
('Lady', 'Female', 'Tan', 4, 'Medium', 'Cocker Spaniel', FALSE, FALSE, 'Medium', 'Low', FALSE, 'Low', FALSE, '3', FALSE, FALSE, TRUE, TRUE, FALSE, 'https://assets.themayhew.org/app/uploads/2024/05/22192719/a7a3e592-b7c8-49a1-abc1-7eac85d4bb9f.jpeg', 'NW10 6BJ'),
('Lyla', 'Female', 'Black', 2, 'Small', 'French Bulldog', TRUE, TRUE, 'Medium', 'Small', TRUE, 'Low', TRUE, '3', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://assets.themayhew.org/app/uploads/2024/06/07201450/a960227b-0003-4779-a071-e97a62fef85b.jpeg', 'NW10 6BJ'),
('Acie', 'Male', 'Black', 1, 'Medium', 'Staffordshire Bull Terrier', TRUE, TRUE, 'High', 'Small', TRUE, 'Low', TRUE, '3', TRUE, TRUE, FALSE, FALSE, TRUE, 'https://assets.themayhew.org/app/uploads/2024/08/29131818/IMG-20240828-WA0022.jpg', 'NW10 6BJ'),
('Roland', 'Male', 'White', 1, 'Small', 'Bichon', TRUE, TRUE, 'Low', 'Small', TRUE, 'Medium', TRUE, '3', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://assets.themayhew.org/app/uploads/2024/07/02133345/Roland-6.jpg', 'NW10 6BJ'),
('River', 'Female', 'White', 8, 'Large', 'Siberian Husky', FALSE, FALSE, 'High', 'Medium', TRUE, 'High', TRUE, '6', TRUE, TRUE, TRUE, FALSE, TRUE, 'https://assets.themayhew.org/app/uploads/2023/07/15144906/Mayhew-doggies-11-scaled.jpg', 'NW10 6BJ'),
('Bailey', 'Male', 'Tan', 1, 'Small', 'Cockapoo', FALSE, FALSE, 'High', 'Low', TRUE, 'High', TRUE, '3', FALSE, FALSE, FALSE, FALSE, FALSE, 'https://alldogsmatter.co.uk/wp-content/uploads/Bailey-Copy.jpg.webp', 'N2 0PE'),
('Mateo', 'Male', 'Grey', 1, 'Medium', 'Staffordshire Bull Terrier', TRUE, FALSE, 'High', 'Medium', TRUE, 'Low', TRUE, '3', FALSE, FALSE, FALSE, FALSE, FALSE, 'https://alldogsmatter.co.uk/wp-content/uploads/7-33-e1724930249455.jpg.webp', 'N2 0PE'),
('Nisse', 'Male', 'Brown', 4, 'Large', 'Rhodesian Ridgeback', TRUE, FALSE, 'Medium', 'Medium', FALSE, 'Medium', TRUE, '3', TRUE, FALSE, TRUE, FALSE, TRUE, 'https://alldogsmatter.co.uk/wp-content/uploads/P1128515-1.jpg.webp', 'N2 0PE'),
('Grady', 'Male', 'Brown', 3, 'Medium', 'Bulldog', FALSE, TRUE, 'Low', 'Small', FALSE, 'Medium', FALSE, '3', FALSE, FALSE, FALSE, TRUE, FALSE, 'https://alldogsmatter.co.uk/wp-content/uploads/grady-1-e1724943826522.jpg.webp', 'N2 0PE'),
('Jack', 'Male', 'Beige', 3, 'Small', 'Terrier', TRUE, TRUE, 'Low', 'Small', FALSE, 'Low', TRUE, '3', TRUE, FALSE, TRUE, TRUE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=416430', 'UB10 0LG'),
('Frappuccino', 'Female', 'White and Brown', 1, 'Medium', 'Jack Russell Terrier', FALSE, FALSE, 'High', 'Medium', TRUE, 'Low', FALSE, '3', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=A244485', 'UB10 0LG'),
('Shelly', 'Female', 'Black and Brown', 1, 'Medium', 'Crossbreed', FALSE, FALSE, 'High', 'Medium', FALSE, 'Low', FALSE, '3', FALSE, TRUE, FALSE, FALSE, FALSE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=A247860_1', 'UB10 0LG'),
('Yoshi', 'Male', 'Black and White', 4, 'Medium', 'Border Collie', FALSE, FALSE, 'Medium', 'Medium', FALSE, 'Low', TRUE, '3', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3427842/068Sh000004UEXtIAO.jpg.webp', 'UB10 0LG'),
('Minnie', 'Female', 'Brown and Tan', 4, 'Large', 'Doberman', FALSE, FALSE, 'Medium', 'Medium', FALSE, 'Low', FALSE, '3', TRUE, TRUE, FALSE, TRUE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=A255903', 'UB10 0LG'),
('Piper', 'Female', 'Black & Tan', 1, 'Large', 'Belgian Shepherd', FALSE, FALSE, 'High', 'High', FALSE, 'Low', FALSE, '3', FALSE, TRUE, TRUE, FALSE, FALSE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=A256971', 'ME19 5HW'),
('Maggie', 'Female', 'White', 6, 'Small', 'Shih Tzu', TRUE, TRUE, 'Medium', 'High', FALSE, 'Medium', TRUE, '3', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=417286', 'ME19 5HW'),
('Winston', 'Male', 'Tan', 3, 'Large', 'British Bulldog', FALSE, FALSE, 'Medium', 'Medium', TRUE, 'Low', FALSE, '3', TRUE, FALSE, TRUE, FALSE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=A248793', 'ME19 5HW'),
('Nipper', 'Female', 'Beige', 6, 'Large', 'Lurcher', TRUE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', FALSE, '3', TRUE, FALSE, FALSE, TRUE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=415545', 'ME19 5HW'),
('Molly', 'Female', 'Beige', 7, 'Small', 'French Bulldog', FALSE, TRUE, 'Low', 'Short', FALSE, 'Low', TRUE, '3', TRUE, FALSE, TRUE, TRUE, TRUE, 'https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&imageId=416552', 'ME19 5HW'),
('Bella', 'Female', 'Black', 2, 'Large', 'Spaniel', TRUE, FALSE, 'High', 'Medium', TRUE, 'High', FALSE, '2', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://images.prismic.io/southeast-dog-rescue/ZtQyOUaF0TcGJpQC_Bella8.jpg?auto=format%2Ccompress&rect=0%2C10%2C853%2C640&w=1440&h=1080&fit=max&fm=webp', 'DA9 9BB'),
('Bandit', 'Male', 'Brown', 5, 'Large', 'Mastiff', TRUE, FALSE, 'High', 'Low', TRUE, 'High', FALSE, '2', FALSE, TRUE, FALSE, FALSE, FALSE, 'https://images.prismic.io/southeast-dog-rescue/c894a03c-7a4d-44e5-9185-122eb8185966_Bandit+5.jpg?auto=compress%2Cformat&rect=0%2C74%2C1536%2C1536&w=725&h=725&fit=max&max-height=725&max-width=725&fm=webp', 'DA9 9BB'),
('Willow', 'Female', 'Beige', 3, 'Large', 'Cockerpoo', FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', TRUE, '3', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://images.prismic.io/southeast-dog-rescue/ZtQyPkaF0TcGJpQH_Willow4.jpg?auto=format%2Ccompress&rect=0%2C310%2C934%2C934&w=725&h=725&fit=max&max-height=725&max-width=725&fm=webp', 'DA9 9BB'),
('Rubix', 'Female', 'Black', 5, 'Large', 'Weimaraner', FALSE, FALSE, 'High', 'Large', TRUE, 'Medium', FALSE, '3', FALSE, TRUE, TRUE, FALSE, FALSE, 'https://images.prismic.io/southeast-dog-rescue/ZriezEaF0TcGI2Ba_Rubix12.jpg?auto=format%2Ccompress&rect=0%2C66%2C480%2C480&w=725&h=725&fit=max&max-height=725&max-width=725&fm=webp', 'DA9 9BB'),
('Dolly', 'Female', 'Brown', 1, 'Medium', 'Dachshund', FALSE, FALSE, 'Low', 'Medium', FALSE, 'Low', FALSE, '3', TRUE, FALSE, FALSE, FALSE, TRUE, 'https://images.prismic.io/southeast-dog-rescue/ZsiCPEaF0TcGJW1Q_Dolly1.jpg?auto=format%2Ccompress&rect=0%2C108%2C960%2C720&w=1440&h=1080&fit=max&fm=webp', 'DA9 9BB'),
('Violet', 'Female', 'Black', 2, 'Large', 'Cane Corso', TRUE, FALSE, 'High', 'Large', FALSE, 'Medium', TRUE, '3', TRUE, FALSE, TRUE, FALSE, TRUE, 'https://www.bluecross.org.uk/sites/default/files/d8/styles/embed_medium/public/873299.jpg.webp?itok=qyObP2D_', 'SG4 8EU'),
('Rocky', 'Male', 'Black and White', 1, 'Medium', 'Border Collie', TRUE, FALSE, 'High', 'Medium', FALSE, 'Medium', TRUE, '3', FALSE, FALSE, FALSE, TRUE, TRUE, 'https://www.dogstrust.org.uk/images/800x600/dogs/3467299/068Sh00000B3t4rIAB.jpg.webp', 'SG4 8EU'),
('Wilma', 'Female', 'Beige', 1, 'Small', 'Bracco Italiano', TRUE, TRUE, 'High', 'Medium', TRUE, 'Medium', TRUE, '3', FALSE, FALSE, TRUE, TRUE, FALSE, 'https://cloud.ukpets.com/oc-content/uploads/2737/bracco-italiano-puppies-for-sale-1326973.jpg', 'SG4 8EU'),
('Ted', 'Male', 'Black and Tan', 2, 'Large', 'Rottweiler', TRUE, FALSE, 'High', 'Large', FALSE, 'Medium', FALSE, '3', FALSE, TRUE, TRUE, TRUE, FALSE, 'https://www.bluecross.org.uk/sites/default/files/d8/styles/embed_medium/public/874270.jpg.webp?itok=BM3G0ciw', 'SG4 8EU'),
('Barney', 'Male', 'Black and Tan', 12, 'Small', 'Yorkshire Terrier', FALSE, FALSE, 'Low', 'Small', TRUE, 'Low', FALSE, '5', TRUE, TRUE, FALSE, FALSE, TRUE, 'https://www.bluecross.org.uk/sites/default/files/d8/styles/embed_medium/public/860015.jpg.webp?itok=68-FBXKh', 'SG4 8EU');

-- ('Max', 'Male', 'Brown', 4, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', FALSE, TRUE, TRUE, FALSE, TRUE, 'https://images.unsplash.com/photo-1537204696486-967f1b7198c8', 'E1 7QX'),
-- ('Bella', 'Female', 'Black', 3, 'Small', 'Pomeranian', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Medium', TRUE, '4', TRUE, FALSE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1719177518277-9bf8126b277d', 'M1 2EH'),
-- ('Charlie', 'Male', 'White', 5, 'Large', 'German Shepherd', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '8', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://images.unsplash.com/photo-1649923625148-1e13d9431053', 'BS1 2LZ'),
-- ('Luna', 'Female', 'Gray', 2, 'Medium', 'Siberian Husky', FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', FALSE, '5', TRUE, TRUE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1668208363137-7ebc4ce6b7b7', 'B5 4HQ'),
-- ('Rocky', 'Male', 'Brindle', 6, 'Large', 'Boxer', TRUE, FALSE, 'High', 'Large', TRUE, 'Medium', TRUE, '6', TRUE, FALSE, TRUE, FALSE, TRUE, 'https://images.unsplash.com/photo-1619876451741-407e8350442e', 'SW1A 1AA');
-- 
-- 
-- Insert data into initial_adoption_cost table
-- INSERT INTO initial_adoption_cost (calculated_initial_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id)
-- VALUES 
-- (110, 7, 0, 2, 15, 65, 1),
-- (416, 4, 0, 1, 0, 65, 2),
-- (45.90, 7, 10.90, 3, 0, 0, 3),
-- (95, 7, 0, 2, 0, 65, 4);


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
-- INSERT INTO user_dog (user_id, dog_id, adoption_date)
-- VALUES 
-- (1, 2, '2024-02-20'),
-- (2, 4, '2024-04-05');
-- (3, 3, '2024-08-31');

-- INSERT INTO bed_size (bed_size_id, size, bed_price, dog_id)
-- values
-- (1, 'Small', 25),
-- (2, 'Medium', 30),
-- (3, 'Large', 35);

-- INSERT INTO monthly_adoption_cost (calculated_monthly_cost, amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id)
-- VALUES
-- (117.50, 2, 2, 2, 1),
-- (100, 1, 1, 1, 2),
-- (157.50, 3, 3, 3, 3),
-- (117.50, 2, 2, 2, 4);

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

-- INSERT INTO long_term_adoption_cost (calculated_long_term_cost, end_of_life_id, average_medical_cost, dog_id)
-- VALUES
-- (1157, 2, 822, 1),
-- (1087, 1, 822, 2),
-- (1232, 3, 822, 3),
-- (1157, 2, 822, 4);

-- INSERT INTO end_of_life (end_of_life_id, size, end_of_life_price)
-- VALUES
-- (1, 'Small', 265),
-- (2, 'Medium', 335),
-- (3, 'Large', 410);
