<?php
require_once('./database.php');
header("Content-type:application/json");
$_POST = json_decode(file_get_contents("php://input"), true);

// units columns

    // num INT(3),
    // plate VARCHAR(7),
    // activated BOOLEAN,
    // PRIMARY KEY (num) 

// data from client 

        // {
        //     num: 101
        // }

    $num = $_POST['num'];

    function deactivateTenant($num){
        $sql=
        "UPDATE units 
        SET activated = 0, plate = NULL
        WHERE num = $num
        ";
        runQuery($sql);
    }

    deactivateTenant($num);
    
    $json = json_encode($_POST);
    echo $json;