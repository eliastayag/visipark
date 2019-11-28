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
        //     unit_num: 101,
        //     plate: ABCDEF
        // }

    $num = $_POST['unit_num'];
    $plate = $_POST['plate'];

    function addTenantPlate($num, $plate){
        $sql=
        "UPDATE units 
        SET plate = '$plate'
        WHERE num = $num
        ";
        runQuery($sql);
    }

    addTenantPlate($num, $plate);
    
    $json = json_encode($_POST);
    echo $json;