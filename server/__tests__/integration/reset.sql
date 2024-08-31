TRUNCATE user_dog, initial_adoption_cost, monthly_adoption_cost, long_term_adoption_cost, preferences, dogs, users RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, email, username, post_code, admin, password) VALUES
('John', 'Doe', 'john@email.com', 'johndoe', '123', FALSE, 'password123'),
('Jane', 'Smith', 'jane@email.com', 'janesmith', '543', TRUE, 'adminpass');
-- ('Emily', 'Johnson', 'emily.johnson@example.com', 'emilyjohnson', '98765', FALSE, 'password123');

INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, other_animals, fencing, previous_experience_years, annual_income, user_id) VALUES
(TRUE, TRUE, 'medium', 'small', FALSE, 'low', TRUE, '5', 2, 50000, 1),
(FALSE, TRUE, 'high', 'medium', TRUE, 'medium', FALSE, '6', 5, 70000, 2);
-- (TRUE, FALSE, 'Low', 'Medium', TRUE, 'High', TRUE, '5', 2, 50000, 1),

-- Insert data into dogs table
INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, 
small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, 
fencing, experience_required, neutered, microchipped, collar_leash, obedience_classes_needed, photo, shelter_location_postcode)
VALUES 
('Max', 'Male', 'Brown', 4, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', FALSE, TRUE, TRUE, FALSE, TRUE, 'https://images.unsplash.com/photo-1537204696486-967f1b7198c8', 'E1 7QX'),
('Bella', 'Female', 'Black', 3, 'Small', 'Pomeranian', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Medium', TRUE, '4', TRUE, FALSE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1719177518277-9bf8126b277d', 'M1 2EH'),
('Charlie', 'Male', 'White', 5, 'Large', 'German Shepherd', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '8', FALSE, TRUE, FALSE, TRUE, FALSE, 'https://images.unsplash.com/photo-1649923625148-1e13d9431053', 'BS1 2LZ');
-- ('Luna', 'Female', 'Gray', 2, 'Medium', 'Siberian Husky', FALSE, TRUE, 'Medium', 'Medium', TRUE, 'Medium', FALSE, '5', TRUE, TRUE, TRUE, TRUE, TRUE, 'https://plus.unsplash.com/premium_photo-1668208363137-7ebc4ce6b7b7', 'B5 4HU'),

-- Insert data into initial_adoption_cost table
INSERT INTO initial_adoption_cost (calculated_initial_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id)
VALUES 
(110, 7, 0, 2, 15, 65, 1),
(416, 4, 0, 1, 0, 65, 2),
(45.90, 7, 10.90, 3, 0, 0, 3);
-- (95, 7, 0, 2, 0, 65, 4);

INSERT INTO monthly_adoption_cost (calculated_monthly_cost, amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id)
VALUES
(117.50, 2, 2, 2, 1),
(100, 1, 1, 1, 2),
(157.50, 3, 3, 3, 3);
-- (117.50, 2, 2, 2, 4);

INSERT INTO long_term_adoption_cost (calculated_long_term_cost, end_of_life_id, average_medical_cost, dog_id)
VALUES
(1157, 2, 822, 1),
(1087, 1, 822, 2),
(1232, 3, 822, 3);
-- (1157, 2, 822, 4);

INSERT INTO user_dog (user_id, dog_id, adoption_date) VALUES
(1, 1, '2024-01-15'),
(2, 2, '2024-02-20');
-- (3, 3, '2024-08-31');
