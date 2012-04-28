<?php

/**
 * ownCloud - bookmarks plugin
 *
 * @author Arthur Schiwon
 * @copyright 2011 Arthur Schiwon blizzz@arthur-schiwon.de
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either 
 * version 3 of the License, or any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */
require_once('../../lib/base.php');

// Check if we are a user
OC_Util::checkLoggedIn();
OC_Util::checkAppEnabled('subphonic');

OC_App::setActiveNavigationEntry('subphonic_index');


$tmpl = new OC_Template('subphonic', 'frame', 'user');
$url = OC_Appconfig::getValue("subphonic", "addr_subsonic", '');


$url = str_replace('localhost', $_SERVER['REMOTE_ADDR'], $url);
$url = str_replace('127.0.0.1', $_SERVER['REMOTE_ADDR'], $url);
$tmpl->assign('url', $url);
$user = OC_Appconfig::getValue("subphonic", "user_subsonic", '');
$tmpl->assign('user', $user);
$pass = OC_Appconfig::getValue("subphonic", "pass_subsonic", '');
$tmpl->assign('pass', $pass);

$username = $_SESSION['user_id'];

$query = OC_DB::prepare("SELECT configvalue FROM oc_preferences WHERE userid=? AND configkey = 'lang'");
$result = $query->execute(array($username));

$row = $result->fetchRow();
if ($row) {
    $lang = $row['configvalue'];
} else {
    return false;
}
$tmpl->assign('lang', $lang);

$urlH = OC_Appconfig::getValue("subphonic", "addr_headphones", '');
$tmpl->assign('urlH', $urlH);
$userH = OC_Appconfig::getValue("subphonic", "user_headphones", '');
$tmpl->assign('userH', $userH);
$passH = OC_Appconfig::getValue("subphonic", "pass_headphones", '');
$tmpl->assign('passH', $passH);
$apikeyH = OC_Appconfig::getValue("subphonic", "apikey_headphones", '');
$tmpl->assign('apikeyH', $apikeyH);

$tmpl->printPage();
?>