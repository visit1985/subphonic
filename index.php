<?php
/**
 * ownCloud - Subphonic app
 *
 * @author zoic21
 * @copyright 2012 zoic21
 * @copyright 2013 visit1985 <somebody.here@gmx.de>
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
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 * 
 */

\OCP\User::checkLoggedIn();
\OCP\App::checkAppEnabled('subphonic');
\OCP\App::setActiveNavigationEntry('subphonic');

$tmpl = new \OCP\Template('subphonic', 'frame', 'user');

$addr = \OCP\Util::linkToAbsolute('subphonic', 'minisub/index.html');
$tmpl->assign('addr', $addr);

$url = \OCP\Config::getAppValue('subphonic', 'addr_subsonic');
$url = str_replace('localhost', $_SERVER['REMOTE_ADDR'], $url);
$url = str_replace('127.0.0.1', $_SERVER['REMOTE_ADDR'], $url);
$tmpl->assign('url', $url);

$user = \OCP\Config::getAppValue('subphonic', 'user_subsonic');
$tmpl->assign('user', $user);

$pass = \OCP\Config::getAppValue('subphonic', 'pass_subsonic');
$tmpl->assign('pass', $pass);

$lang = \OCP\Config::getUserValue($_SESSION['user_id'], 'core', 'lang');
$tmpl->assign('lang', $lang);

$tmpl->printPage();
?>

