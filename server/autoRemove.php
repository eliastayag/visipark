<?php
require_once('./database.php');
header("Content-type:application/json");

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

//---- Query to remove visitors that expire

function autoremove(){
    $sql = "
    UPDATE visitors SET removed = 1 WHERE TIMESTAMPDIFF(SECOND, NOW(),end_time) < 0 AND removed = 0;
    ";
    runQuery($sql);
}

$ar=autoremove();
$json = json_encode($ar);
echo $json;