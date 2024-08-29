TRUNCATE user_dog, initial_adoption_cost, monthly_adoption_cost, long_term_adoption_cost, preferences, dogs, users RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, email, username, post_code, admin, password) VALUES
('John', 'Doe', 'john@email.com', 'johndoe', '123', FALSE, 'password123'),
('Jane', 'Smith', 'jane@email.com', 'janesmith', '543', TRUE, 'adminpass');

INSERT INTO preferences (small_animals, young_children, activity, living_space_size, garden, allergy_information, other_animals, fencing, previous_experience_years, annual_income, user_id) VALUES
(TRUE, TRUE, 'medium', 'small', FALSE, 'low', TRUE, '5', 2, 50000, 1),
(FALSE, TRUE, 'high', 'medium', TRUE, 'medium', FALSE, '6', 5, 70000, 2);

INSERT INTO dogs (dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, other_animals, fencing, experience_required, adopted) VALUES
('rex', 'male', 'brown', 3, 'large', 'Labrador', TRUE, TRUE, 'medium', 'large', TRUE, 'medium', TRUE, '6', FALSE, FALSE),
('bella', 'female', 'black', 2, 'medium', 'Beagle', TRUE, FALSE, 'high', 'medium', TRUE, 'low', TRUE, '4', FALSE, FALSE),
('charlie', 'male', 'white', 1, 'small', 'Poodle', FALSE, TRUE, 'low', 'small', FALSE, 'high', FALSE, '3', FALSE, FALSE);


INSERT INTO initial_adoption_cost (initial_price, neutered, microchipped, size_of_bed, collar_leash, obedience_classes_needed, dog_id) VALUES
(100, TRUE, TRUE, TRUE, TRUE, FALSE, 1),
(80, FALSE, TRUE, TRUE, TRUE, TRUE, 2),
(120, TRUE, FALSE, FALSE, TRUE, TRUE, 3);

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
