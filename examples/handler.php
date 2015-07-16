<?php
$response = serialize($_POST['RotMatrix']);

$file = 'data.txt';

// Open the file to get existing content
$current = file_get_contents($file);

// Append new response to the file
$current .= "\r\n ".$response;

// Write the contents back to the file
file_put_contents($file, $current);

?>
