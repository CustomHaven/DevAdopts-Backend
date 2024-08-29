TRUNCATE user_dog, initial_adoption_cost, monthly_adoption_cost, long_term_adoption_cost, preferences, dogs, users RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, email, username, post_code, admin, password) VALUES
('John', 'Doe', 'john@email.com', 'johndoe', '123', FALSE, 'password123'),
('Jane', 'Smith', 'jane@email.com', 'janesmith', '543', TRUE, 'adminpass');

INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, other_animals, fencing, previous_experience_years, annual_income, user_id) VALUES
(TRUE, TRUE, 'medium', 'small', FALSE, 'low', TRUE, '5', 2, 50000, 1),
(FALSE, TRUE, 'high', 'medium', TRUE, 'medium', FALSE, '6', 5, 70000, 2);

-- Insert data into dogs table
INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, fencing, experience_required, shelter_location_postcode, photo)
VALUES 
('Max', 'Male', 'Brown', 4, 'Medium', 'Labrador Retriever', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', FALSE, 'E1 7QX', 'https://images.unsplash.com/photo-1537204696486-967f1b7198c8'),
('Bella', 'Female', 'Black', 3, 'Small', 'Pomeranian', TRUE, FALSE, 'Medium', 'Small', TRUE, 'Medium', TRUE, '4', TRUE, 'M1 2EH', 'https://plus.unsplash.com/premium_photo-1719177518277-9bf8126b277d'),
('Charlie', 'Male', 'White', 5, 'Large', 'German Shepherd', TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '8', FALSE, 'BS1 2LZ', 'https://images.unsplash.com/photo-1649923625148-1e13d9431053');


INSERT INTO initial_adoption_cost (initial_price, neutered, microchipped, bed_size_price, collar_leash, obedience_classes_needed, dog_id) VALUES
(100, TRUE, TRUE, 30, TRUE, FALSE, 1),
(80, FALSE, TRUE, 25, TRUE, TRUE, 2),
(120, TRUE, FALSE, 35, TRUE, TRUE, 3);

INSERT INTO monthly_adoption_cost (monthly_price, amount_of_food, pet_insurance, veterinary_care, dog_id) VALUES
(30, 50, 15, 25, 1),
(25, 40, 10, 20, 2),
(20, 30, 12, 18, 3);

INSERT INTO long_term_adoption_cost (major_medical_expenses, end_of_life, dog_id) VALUES
(2000, 500, 1),
(1500, 400, 2),
(1200, 300, 3);

INSERT INTO user_dog (user_id, dog_id, adoption_date) VALUES
(1, 1, '2024-01-15'),
(2, 2, '2024-02-20');
