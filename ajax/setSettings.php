<?php

\OCP\User::checkAdminUser();
\OCP\App::checkAppEnabled('subphonic');

if(isset($_POST['addr_subsonic'])) \OCP\Config::setAppValue( 'subphonic','addr_subsonic', $_POST['addr_subsonic'] );
if(isset($_POST['user_subsonic'])) \OCP\Config::setAppValue( 'subphonic','user_subsonic', $_POST['user_subsonic'] );
if(isset($_POST['pass_subsonic'])) \OCP\Config::setAppValue( 'subphonic','pass_subsonic', $_POST['pass_subsonic'] );

echo 'true';
?>

