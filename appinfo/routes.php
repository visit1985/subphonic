<?php

$this->create('subphonic_index', '/')->action(
    function($params){
            require __DIR__ . '/../index.php';
        }
);

