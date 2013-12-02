<form id="Subphonic">
    <fieldset class="personalblock">
        <strong style="font-size: 1.2em;">Subphonic settings</strong>
        <?php echo $l->t('URL'); ?> <input type="text" name="addr_subsonic"  id="addr_subsonic"  value="<?php echo $_['addr_subsonic']; ?>"  placeholder="<?php echo $l->t('URL'); ?>"  style="width: 300px;"/><br />
        <?php echo $l->t('Username'); ?> <input type="text" name="user_subsonic"  id="user_subsonic"  value="<?php echo $_['user_subsonic']; ?>"  placeholder="<?php echo $l->t('Username'); ?>" /><br />
        <?php echo $l->t('Password'); ?> <input type="password" name="pass_subsonic"  id="pass_subsonic"  value="<?php echo $_['pass_subsonic']; ?>"  placeholder="<?php echo $l->t('Password'); ?>" />
    </fieldset>
</form>
