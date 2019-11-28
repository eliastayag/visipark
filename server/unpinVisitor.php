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
             //    unit_num: 201
        //         id: 4
        //     }
        // }



//---- Function to get unpin a visitor in History ----

// select distinct plate, name, pin, id from visitors where pin=1
// select plate, name, pin, id from visitors where removed=1 and pin<>1 and (plate not in (select plate from visitors where pin=1) or name not in (select name from visitors where pin=1))

$id = $_POST['id'];
$unit = $_POST['unit_num'];

function unpinVisitor($unit,$id){
    $sql = "
    UPDATE visitors  
    SET pin=0, pin_time = NULL
    WHERE unit_num = $unit AND id=$id
    ";
    runQuery($sql);
}

unpinVisitor($unit,$id);


$json = json_encode($visitor);
echo $json;