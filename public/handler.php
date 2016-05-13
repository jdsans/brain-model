<?php
$event_data = json_encode($_POST['event_data']);
$event_type = json_encode($_POST['event_type']);

$file = 'data.txt';

// Open the file to get existing content
$current = file_get_contents($file);

// Append new response to the file
$current .= "\r\n".$event_type."|".$event_data."|".date("Y-m-d g:ia",time());

// Write the contents back to the file
file_put_contents($file, $current);

?>
