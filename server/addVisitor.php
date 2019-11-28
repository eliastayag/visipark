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
        //         name: "Visitor Name",
        //         plate: "vis plt",
        //         duration: "3:00:00"
        //     }
        // }

// front end shouldn't allow tenant to put in same plate number with different names for current visitors
        


$unit_num = $_POST['unit_num'];
$name = $_POST['name'];
$plate = $_POST['plate'];
$duration = $_POST['duration'];



// function addVisitor($unit_num, $name, $plate, $duration){
//     $sql=
//     "INSERT INTO visitors 
//     (unit_num, name, plate, start_time, end_time,removed, pin) 
//     VALUES 
//     ($unit_num,'$name','$plate', now(), addtime(now(),'$duration'),0,0)
//     ";
//     runQuery($sql);
// }

function addVisitor($unit_num, $name, $plate, $duration){
    $sql=
    "INSERT INTO visitors 
    (unit_num, name, plate, start_time, end_time,removed, pin) 
    VALUES 
    ($unit_num,'$name','$plate', now(), TIMESTAMPADD(HOUR, $duration,now()),0,0)
    ";
    runQuery($sql);
}

addVisitor($unit_num, $name, $plate, $duration);

$json = json_encode($visitor);
echo $json;
