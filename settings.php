<?php
OC_Util::checkAdminUser();
OC_Util::addScript( "minisub", "admin" );

$tmpl = new OC_Template('minisub', 'settings');
$tmpl->assign('addr_subsonic', OC_Appconfig::getValue("minisub", "addr_subsonic", ''));
$tmpl->assign('user_subsonic', OC_Appconfig::getValue("minisub", "user_subsonic", ''));
$tmpl->assign('pass_subsonic', OC_Appconfig::getValue("minisub", "pass_subsonic", ''));
$tmpl->assign('addr_headphones', OC_Appconfig::getValue("minisub", "addr_headphones", ''));
$tmpl->assign('user_headphones', OC_Appconfig::getValue("minisub", "user_headphones", ''));
$tmpl->assign('pass_headphones', OC_Appconfig::getValue("minisub", "pass_headphones", ''));
$tmpl->assign('apikey_headphones', OC_Appconfig::getValue("minisub", "apikey_headphones", ''));
return $tmpl->fetchPage();

?>