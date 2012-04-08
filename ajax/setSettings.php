<?php
require_once('../../../lib/base.php');
OC_Util::checkAdminUser();

if(isset($_POST['addr_subsonic'])) OC_Appconfig::setValue( 'minisub','addr_subsonic', $_POST['addr_subsonic'] );
if(isset($_POST['user_subsonic'])) OC_Appconfig::setValue( 'minisub','user_subsonic', $_POST['user_subsonic'] );
if(isset($_POST['pass_subsonic'])) OC_Appconfig::setValue( 'minisub','pass_subsonic', $_POST['pass_subsonic'] );

echo 'true';
?>
