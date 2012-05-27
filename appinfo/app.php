<?php
/**
* Copyright (c) 2011 Marvin Thomas Rabe <m.rabe@echtzeitraum.de>
* Copyright (c) 2011 Arthur Schiwon <blizzz@arthur-schiwon.de>
* This file is licensed under the Affero General Public License version 3 or
* later.
* See the COPYING-README file.
*/

OCP\App::register( array( 
  'order' => 10,
  'id' => 'subphonic',
  'name' => 'Subphonic' ));

OC_App::addNavigationEntry( array( 'id' => 'subphonic_index', 'order' => 70, 'href' => OC_Helper::linkTo( 'subphonic', 'index.php' ), 'icon' => OC_Helper::imagePath( 'subphonic', 'subsonic.png' ), 'name' => 'Subphonic' ));

OCP\APP::registerAdmin('subphonic','settings');