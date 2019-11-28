<?php
require_once('./database.php');
header("Content-type:application/json");

function getTenants(){
    $sql = "SELECT * FROM units";
    return runQuery($sql);
}


$tenants = getTenants();
        
$json = json_encode($tenants);
echo $json;