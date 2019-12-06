INSERT INTO units VALUES
(101, "101ABC", 1),
(102, "102ABC", 1),
(103, NULL, 0),
(104, NULL, 0),
(105, "105ABC", 1),
(106, "106ABC", 1),
(107, NULL,0),
(108, "108ABC", 1),
(109, "109ABC", 1),
(201, NULL, 0),
(202, "202ABC", 1),
(203, "203ABC", 1),
(204, "204ABC", 1),
(205, "205ABC", 1),
(206, "206ABC", 1),
(207, "207ABC", 1),
(208, "208ABC", 1),
(209, "209ABC", 1),
(301, "301ABC", 1),
(302, "302ABC", 1),
(303, NULL, 0),
(304, NULL, 0),
(305, "305ABC", 1),
(306, "306ABC", 1),
(307, NULL,0),
(308, "308ABC", 1),
(309, "309ABC", 1),
(401, NULL, 0),
(402, "402ABC", 1),
(403, NULL, 0),
(404, "404ABC", 1),
(405, "405ABC", 1),
(406, NULL, 0),
(407, "407ABC", 1),
(408, "408ABC", 1),
(409, "409ABC", 1);



INSERT INTO visitors 
(unit_num, name, plate, start_time, end_time, removed, pin)
VALUES
(101, "Amanda", "M2KL1P", now(), addtime(now(),'6:00:00'), 0, 0),
(201, "Joe", "SK2HAL", now(), addtime(now(),'2:00:00'), 0, 0),
(106, "Henry", "S9WDW3", now(), addtime(now(),'3:00:00'), 1, 1),
(205, "Lulu", "S03MS9", now(), addtime(now(),'8:00:00'), 0, 1),
(308, "Angelina", "L2KAJ9", now(), addtime(now(),'9:00:00'), 0, 1);

INSERT INTO reports
(unit_num, subject, message)
VALUES
(201, 'Car parked 3 days', 'A silver car has parked in the lot since 3 days ago. Seems suspicious.'),
(307, 'Tenant parked in visitor lot', 'A tenant seems to have parked the car in visitors lot when it was pretty full'),
(103, 'Barbage left in the lot', 'A bag a garbage was left at the entrance of visitor parking lot');