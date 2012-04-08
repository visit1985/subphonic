<?php
OC_Util::checkAdminUser();
OC_Util::addScript( "minisub", "admin" );

$tmpl = new OC_Template('minisub', 'settings');
$tmpl->assign('addr_subsonic', OC_Appconfig::getValue("minisub", "addr_subsonic", ''));
$tmpl->assign('user_subsonic', OC_Appconfig::getValue("minisub", "user_subsonic", ''));
$tmpl->assign('pass_subsonic', OC_Appconfig::getValue("minisub", "pass_subsonic", ''));
return $tmpl->fetchPage();

?>