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
        //         id: 1
        //     }
        // }
        

$id = $_POST['id'];

function removeVisitor($id){
    $sql=
    "UPDATE visitors 
    SET end_time = now(), removed = 1
    WHERE id=$id
    ";
    runQuery($sql);
}

removeVisitor($id);

$json = json_encode($visitor);

echo $json;
