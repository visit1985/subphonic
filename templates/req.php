<?php
$timeout = 10;
$http_auth_ident = $_POST['u'] . ':' . $_POST['p']; // username:password 
$ch = curl_init($_POST['r']);
curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

if (preg_match('`^https://`i', $_POST['r'])) {
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
}
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Définition de la méthode d'authentification du serveur 
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
// Définition des identifiants 
curl_setopt($ch, CURLOPT_USERPWD, $http_auth_ident);
$cache = curl_exec($ch);
curl_close($ch);
echo $cache;
?>
