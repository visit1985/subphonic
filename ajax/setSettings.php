<?php
OCP\User::checkAdminUser();

if(isset($_POST['addr_subsonic'])) OCP\Config::setAppValue( 'subphonic','addr_subsonic', $_POST['addr_subsonic'] );
if(isset($_POST['user_subsonic'])) OCP\Config::setAppValue( 'subphonic','user_subsonic', $_POST['user_subsonic'] );
if(isset($_POST['pass_subsonic'])) OCP\Config::setAppValue( 'subphonic','pass_subsonic', $_POST['pass_subsonic'] );
if(isset($_POST['addr_headphones'])) OCP\Config::setAppValue( 'subphonic','addr_headphones', $_POST['addr_headphones'] );
if(isset($_POST['user_headphones'])) OCP\Config::setAppValue( 'subphonic','user_headphones', $_POST['user_headphones'] );
if(isset($_POST['pass_headphones'])) OCP\Config::setAppValue( 'subphonic','pass_headphones', $_POST['pass_headphones'] );
if(isset($_POST['apikey_headphones'])) OCP\Config::setAppValue( 'subphonic','apikey_headphones', $_POST['apikey_headphones'] );

echo 'true';
?>

