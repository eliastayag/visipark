<?php
require_once('./database.php');
header("Content-type:application/json");
$_POST = json_decode(file_get_contents("php://input"), true);

// ----- visitor table columns ---- 

        // id INT NOT NULL AUTO_INCREMENT,
        // unit_num INT(3),
        //     FOREIGN KEY (unit_num) 
        //     REFERENCES units(num)
        //     ON UPDATE CASCADE ON DELETE RESTRICT,
        // name VARCHAR(255),
        // plate VARCHAR(7),
        // start_time TIMESTAMP,
        // end_time VARCHAR(255),
        // removed BOOLEAN,
        // pin BOOLEAN,
        // PRIMARY KEY (id)

// ---- data receiving from client ----

        //     data: {
        //         unit_num: 101
        //     }
        // }



//---- Function to get current visitors of an apartment unit ----
// front end shouldn't allow tenant to put in same plate numb
// SELECT DISTINCT plate, name, TIME_FORMAT(TIMEDIFF(NOW(),end_time)),"%H:%i") as time_left, TIMESTAMPDIFF(HOUR,start_time,end_time) as regtime, id 
// FROM visitors 
// WHERE unit_num = $unit_num and removed = 0
// ORDER BY id

$visitors = $_POST['data'];
$unit_num = $visitors['unit_num'];

function getCurrentVisitors($unit_num){
    $sql = "
    SELECT DISTINCT plate, name, TIME_FORMAT(TIMEDIFF(end_time,NOW()),'%H:%i') as time_left, TIMESTAMPDIFF(HOUR,start_time,end_time) as regtime, id 
    FROM visitors 
    WHERE unit_num = $unit_num and removed = 0
    ORDER BY id
    ";
    return runQuery($sql);
}
//  SELECT DISTINCT plate, name, TIMESTAMPDIFF(MINUTE,NOW(),end_time) as time_left, id FROM visitors 


$currentVisitors = getCurrentVisitors($unit_num);

$json = json_encode($currentVisitors);
echo $json;