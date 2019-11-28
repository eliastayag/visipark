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
        //         unit_num: 101,
        //     }
        // }



//---- Function to get pinned and unpinned past visitors for an apartment unit ----

// select distinct plate, name, pin, id, date(end_time) as date,pin_time from visitors where unit_num = 101 and pin = 1 order by pin_time desc;
// select plate, name, pin, id from visitors where removed=1 and pin<>1 and (plate not in (select plate from visitors where pin=1) or name not in (select name from visitors where pin=1))

$unit_num = $_POST['unit_num'];

function getPinned($unit_num){
    $sql = "
    SELECT DISTINCT plate, name, pin, id, DATE(end_time) as date, pin_time 
    FROM visitors 
    WHERE unit_num = $unit_num and pin = 1
    ORDER BY pin_time DESC
    ";
    return runQuery($sql);
}

function getNotPinned($unit_num){
    $sql = "
    SELECT plate, name, pin, id, DATE(end_time) as date 
    FROM visitors 
    WHERE unit_num = $unit_num AND removed=1 AND pin<>1 AND 
    (plate not in (select plate from visitors where pin=1) OR name not in (select name from visitors where pin=1))
    ORDER BY id DESC
    ";
    return runQuery($sql);
}


// Get the and put them in variables
//put the variables together into an array and send it back 
$Pinned = getPinned($unit_num);
$notPinned = getNotPinned($unit_num);


        
// $json = json_encode(["data"=>$data]);
$json = json_encode(["pinned"=> $Pinned,"notpinned"=> $notPinned]);
echo $json;