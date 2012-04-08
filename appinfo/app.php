<?php
/**
* Copyright (c) 2011 Marvin Thomas Rabe <m.rabe@echtzeitraum.de>
* Copyright (c) 2011 Arthur Schiwon <blizzz@arthur-schiwon.de>
* This file is licensed under the Affero General Public License version 3 or
* later.
* See the COPYING-README file.
*/
OC_APP::registerAdmin('minisub','settings');


OC_App::register( array( 'order' => 70, 'id' => 'minisub', 'name' => 'MiniSub' ));

OC_App::addNavigationEntry( array( 'id' => 'minisub_index', 'order' => 70, 'href' => OC_Helper::linkTo( 'minisub', 'index.php' ), 'icon' => OC_Helper::imagePath( 'minisub', 'subsonic.png' ), 'name' => 'MiniSub' ));

