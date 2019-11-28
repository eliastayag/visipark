<?php
require_once('./database.php');
header("Content-type:application/json");
$_POST = json_decode(file_get_contents("php://input"), true);

// report columns

        // id INT NOT NULL AUTO_INCREMENT,
        // unit_num INT(3),
        // created TIMESTAMP DEFAULT NOW(),
        // subject VARCHAR(255),
        // message TEXT,
        // deleted BOOLEAN,
        // PRIMARY KEY (id)

// data from client 

        // {
        //     unit_num: 101,
        //     subject: 'subject',
        //     message: 'msg'
        // }

    $unit_num = $_POST['unit_num'];
    $subject = $_POST['subject'];
    $msg = $_POST['message'];

    function createReport($unit_num, $subject,$msg){
        $sql=
        "INSERT INTO reports 
        (unit_num, subject, message) 
        VALUES 
        ($unit_num, '$subject','$msg')
        ";
        runQuery($sql);
    }

    createReport($unit_num, $subject,$msg);

    $json = json_encode($_POST);
    echo $json;