INSERT INTO department (name)
VALUES  ("Marketing"),
        ("Finance"),
        ("Operations Management"),
        ("Human Resources"),
        ("IT");

INSERT INTO role (title, salary, department_id)
VALUES  ("Chief Marketing Officer", 1500000, 1),
        ("Director of Marketing", 1200000, 1),
        ("Marketing Analyst", 1000000, 1),
        ("Internet Marketing Specialist", 850000, 1),
        
        ("Payroll Manager", 700000, 2),
        ("Payroll Assistant", 650000, 2),
        ("Finance Clerk", 600000, 2),
        ("Monetary Mizer", 50000, 2),

        ("Operations Manager", 1200000, 3),
        ("Operations Officer", 900000, 3),
        ("Inventory Manager", 870000, 3),
        ("Inventory Planner", 500000, 3),

        ("HR Assistant", 550000, 4),
        ("HR Trainee", 200000, 4),
        ("HR Associate", 250000, 4),
        ("Recruiter", 300000, 4),

        ("Chief Information Officer", 180000, 5),
        ("Chief Technology Officer", 150000, 5),
        ("IT Manager", 200000, 5),
        ("Database Analyst", 175000, 5);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Kyle", "Jordan", 1, null),
        ("Gerard", "Depardieu", 2, 1),
        ("Darius", "Longfellow", 3, 1),
        ("Sarah", "Benton", 4, 1),

        ("Olivia", "Newton", 5, null),
        ("Natondra", "Newhaven", 6, 2),
        ("Michael", "MacDonald", 7, 2),
        ("Yumi", "Renaud", 8, 2),

        ("Felix", "Benedictus", 9, null),
        ("Harold", "Barold", 10, 3),
        ("Reggie", "Newberry", 11, 3),
        ("Chara", "Gia", 12, 3),

        ("Waldo", "DeWitt", 13, null),
        ("Teresa", "Uma", 14, 4),
        ("Brian", "Sanderson", 15, 4),
        ("Spot", "Nawtadawg", 16, 4);