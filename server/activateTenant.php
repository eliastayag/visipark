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

    function activateTenant($num){
        $sql=
        "UPDATE units 
        SET activated = 1
        WHERE num = $num
        ";
        runQuery($sql);
    }

    activateTenant($num);
    
    $json = json_encode($_POST);
    echo $json;