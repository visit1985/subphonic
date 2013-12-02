<?php
\OCP\User::checkAdminUser();
\OCP\App::checkAppEnabled('subphonic');

\OCP\Util::addScript( "subphonic", "admin" );

$tmpl = new \OCP\Template('subphonic', 'settings');

$tmpl->assign('addr_subsonic', \OCP\Config::getAppValue("subphonic", "addr_subsonic"));
$tmpl->assign('user_subsonic', \OCP\Config::getAppValue("subphonic", "user_subsonic"));
$tmpl->assign('pass_subsonic', \OCP\Config::getAppValue("subphonic", "pass_subsonic"));

return $tmpl->fetchPage();
?>

