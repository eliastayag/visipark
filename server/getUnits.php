<?php
require_once('./database.php');
header("Content-type:application/json");

// Functions to get Units, Visitors and Reports
function getUnits(){
    $sql = "SELECT * FROM units";
    return runQuery($sql);
}



// Get all data and put them in variables
//put the variables together into an array and send it back 
$units = getUnits();
       
$json = json_encode(["units"=>$units]);
echo $json;