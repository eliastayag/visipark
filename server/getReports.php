<?php
require_once('./database.php');
header("Content-type:application/json");

// ----- reports columns

        // id INT NOT NULL AUTO_INCREMENT,
        // unit_num INT(3),
        // created TIMESTAMP DEFAULT NOW(),
        // subject VARCHAR(255),
        // message TEXT,
        // deleted BOOLEAN DEFAULT 0,
        // PRIMARY KEY (id)


// get all reports that aren't deleted
function getReports(){
    $sql = "
    SELECT id, unit_num, DATE(created) as date, subject, message 
    FROM reports
    WHERE deleted = 0
    ORDER BY id DESC
    ";
    return runQuery($sql);
}


$reports= getReports();
        
$json = json_encode($reports);
echo $json;