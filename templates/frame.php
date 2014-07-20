<iframe src="<?php
    echo $_['addr'] .
        '?s=' . urlencode($_['url']) .
        '&u=' . $_['user'] .
        '&p=' . $_['pass'] .
        '&l=' . $_['lang'];
?>" width="100%" id="ifm"></iframe>
<?php
OCP\Util::addscript('subphonic', 'subphonic');
?>
