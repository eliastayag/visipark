<?php
require_once('./database.php');
header("Content-type:application/json");
$_POST = json_decode(file_get_contents("php://input"), true);

// ----- reports columns

        // id INT NOT NULL AUTO_INCREMENT,
        // unit_num INT(3),
        // created TIMESTAMP DEFAULT NOW(),
        // subject VARCHAR(255),
        // message TEXT,
        // deleted BOOLEAN DEFAULT 0,
        // PRIMARY KEY (id)

// data sent over
        // {
        //     id: 3
        // }


// get all reports that aren't deleted
$id = $_POST['id'];

function deleteReport($id){
    $sql = "
    UPDATE reports
    SET deleted = 1
    WHERE id = $id
    ";
    runQuery($sql);
}


deleteReport($id);
        
$json = json_encode(["id"=>$id]);
echo $json;