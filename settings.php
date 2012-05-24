<?php
OC_Util::checkAdminUser();
OC_Util::addScript( "subphonic", "admin" );

$tmpl = new OC_Template('subphonic', 'settings');
$tmpl->assign('addr_subsonic', OC_Appconfig::getValue("subphonic", "addr_subsonic", ''));
$tmpl->assign('user_subsonic', OC_Appconfig::getValue("subphonic", "user_subsonic", ''));
$tmpl->assign('pass_subsonic', OC_Appconfig::getValue("subphonic", "pass_subsonic", ''));
$tmpl->assign('addr_headphones', OC_Appconfig::getValue("subphonic", "addr_headphones", ''));
$tmpl->assign('user_headphones', OC_Appconfig::getValue("subphonic", "user_headphones", ''));
$tmpl->assign('pass_headphones', OC_Appconfig::getValue("subphonic", "pass_headphones", ''));
$tmpl->assign('apikey_headphones', OC_Appconfig::getValue("subphonic", "apikey_headphones", ''));
return $tmpl->fetchPage();

?>