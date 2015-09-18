<?php
$file = $_POST['file_name'];

// Open the file to get existing content
$contents = file_get_contents("descriptions/".$file.".txt");

echo $contents;

?>
