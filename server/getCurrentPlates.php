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

// ----- units columns -----
        // num INT(3),
        // plate VARCHAR(7),
        // activated BOOLEAN,
        // PRIMARY KEY (num) 


// current visitor plates
function getCurrentPlates(){
    $sql = "
    SELECT unit_num, plate, TIME_FORMAT(TIMEDIFF(end_time,NOW()),'%H:%i') as time_left
    FROM visitors 
    WHERE removed = 0
    ORDER BY id
    ";
    return runQuery($sql);
}

// tenant plates
function getTenantPlates(){
    $sql = "
    SELECT num, plate
    FROM units 
    WHERE plate IS NOT NULL
    ";
    return runQuery($sql);
}


$currentPlates=getCurrentPlates();
$tenantPlates=getTenantPlates();


// returns all current visitors' plates in the building and all tenants' plate
$json = json_encode(["visitors"=>$currentPlates,"tenants"=>$tenantPlates]);
echo $json;