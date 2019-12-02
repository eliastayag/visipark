INSERT INTO units VALUES
(101, "101 ADC", TRUE),
(102, "102 ABC", true),
(103, NULL, false),
(104, NULL, false), 
(105, NULL, true),
(106, "106 ABC", true),
(107, NULL,false),
(108, "108 ABC", true),
(109, "109 ABC", true),
(201, NULL, false),
(202, "202 ABC", true),
(203, NULL, true),
(204, "204 ABC", true),
(205, "205 ABC", true),
(206, "206 ABC", true),
(207, "207 ABC", true),
(208, "208 ABC", true),
(209, "209 ABC", true),
(301, "301 ABC", true),
(302, "302 ABC", true),
(303, NULL, false),
(304, NULL, false),
(305, "305 ABC", true),
(306, "306 ABC", true),
(307, NULL,false),
(308, "308 ABC", true),
(309, "309 ABC", true),
(401, NULL, false),
(402, "402 ABC", true),
(403, "403 ABC", true),
(404, "404 ABC", true),
(405, "405 ABC", true),
(406, NULL, false),
(407, "407 ABC", true),
(408, "408 ABC", true),
(409, "409 ABC", true);



INSERT INTO visitors 
(unit_num, name, plate, start_time, end_time, removed, pin)
VALUES
(101, "Amanda", "AMD 101", now(), addtime(now(),'3:00:00'), 1, 1);
