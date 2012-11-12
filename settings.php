<?php
OCP\User::checkAdminUser();
OCp\Util::addScript( "subphonic", "admin" );

$tmpl = new OCP\Template('subphonic', 'settings');

$tmpl->assign('addr_subsonic',     OCP\Config::getAppValue("subphonic", "addr_subsonic"));
$tmpl->assign('user_subsonic',     OCP\Config::getAppValue("subphonic", "user_subsonic"));
$tmpl->assign('pass_subsonic',     OCP\Config::getAppValue("subphonic", "pass_subsonic"));
$tmpl->assign('addr_headphones',   OCP\Config::getAppValue("subphonic", "addr_headphones"));
$tmpl->assign('user_headphones',   OCP\Config::getAppValue("subphonic", "user_headphones"));
$tmpl->assign('pass_headphones',   OCP\Config::getAppValue("subphonic", "pass_headphones"));
$tmpl->assign('apikey_headphones', OCP\Config::getAppValue("subphonic", "apikey_headphones"));

return $tmpl->fetchPage();
?>
