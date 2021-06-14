<?php
    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $message = $_POST['message'];

    $email_from = "favouradekogbe@gmail.com";
    $email_subject = "New Form Submission";
    $email_body = "You have received a new message from the user $name. \n";

    $to = "favouradekogbe@gmail.com";
    $headers = "From: $email_from \r\n";
    
    mail($to, $email_subject, $email_body);
?>