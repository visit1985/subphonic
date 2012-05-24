<?php
OC_Util::checkAdminUser();

if(isset($_POST['addr_subsonic'])) OC_Appconfig::setValue( 'subphonic','addr_subsonic', $_POST['addr_subsonic'] );
if(isset($_POST['user_subsonic'])) OC_Appconfig::setValue( 'subphonic','user_subsonic', $_POST['user_subsonic'] );
if(isset($_POST['pass_subsonic'])) OC_Appconfig::setValue( 'subphonic','pass_subsonic', $_POST['pass_subsonic'] );
if(isset($_POST['addr_headphones'])) OC_Appconfig::setValue( 'subphonic','addr_headphones', $_POST['addr_headphones'] );
if(isset($_POST['user_headphones'])) OC_Appconfig::setValue( 'subphonic','user_headphones', $_POST['user_headphones'] );
if(isset($_POST['pass_headphones'])) OC_Appconfig::setValue( 'subphonic','pass_headphones', $_POST['pass_headphones'] );
if(isset($_POST['apikey_headphones'])) OC_Appconfig::setValue( 'subphonic','apikey_headphones', $_POST['apikey_headphones'] );
echo 'true';
?>
