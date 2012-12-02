<form id="Subphonic">
	<fieldset class="personalblock">
		<strong style="font-size: 1.2em;">Subphonic settings</strong>
		<div style="position: relative; left: 10px;">
			<br /><br /><strong>Subsonic settings</strong><br />
			<?php echo $l->t('URL'); ?> <input type="text" name="addr_subsonic"  id="addr_subsonic"  value="<?php echo $_['addr_subsonic']; ?>"  placeholder="<?php echo $l->t('URL'); ?>"  style="width: 300px;"/><br />
			<?php echo $l->t('Username'); ?> <input type="text" name="user_subsonic"  id="user_subsonic"  value="<?php echo $_['user_subsonic']; ?>"  placeholder="<?php echo $l->t('Username'); ?>" /><br />
			<?php echo $l->t('Password'); ?> <input type="password" name="pass_subsonic"  id="pass_subsonic"  value="<?php echo $_['pass_subsonic']; ?>"  placeholder="<?php echo $l->t('Password'); ?>" />
			<br /><br /><strong>Headphones settings</strong><br />
			<?php echo $l->t('URL'); ?> <input type="text" name="addr_headphones"  id="addr_headphones"  value="<?php echo $_['addr_headphones']; ?>"  placeholder="<?php echo $l->t('URL'); ?>"  style="width: 300px;"/><br />
			<?php echo $l->t('Username'); ?> <input type="text" name="user_headphones"  id="user_headphones"  value="<?php echo $_['user_headphones']; ?>"  placeholder="<?php echo $l->t('Username'); ?>" /><br />
			<?php echo $l->t('Password'); ?> <input type="password" name="pass_headphones"  id="pass_headphones"  value="<?php echo $_['pass_headphones']; ?>"  placeholder="<?php echo $l->t('Password'); ?>" /><br />
			API-Key <input type="text" name="apikey_headphones"  id="apikey_headphones"  value="<?php echo $_['apikey_headphones']; ?>"  placeholder="<?php echo $l->t('API-Key'); ?>" style="width: 220px;"/>
		</div>
	</fieldset>
</form>
