<form id="Subphonic">
<div class="section">
    <h2>Subphonic settings</h2>
        <label for="addr_subsonic" style="display: inline-block; width: 6em;"><?php echo $l->t('URL'); ?></label>
        <input type="text" name="addr_subsonic"  id="addr_subsonic"  value="<?php echo $_['addr_subsonic']; ?>" placeholder="<?php echo $l->t('URL'); ?>" style="width: 300px;" />
    <br />
        <label for="user_subsonic" style="display: inline-block; width: 6em;"><?php echo $l->t('Username'); ?></label>
        <input type="text" name="user_subsonic"  id="user_subsonic"  value="<?php echo $_['user_subsonic']; ?>" placeholder="<?php echo $l->t('Username'); ?>" autocomplete="off" />
    <br />
        <label for="pass_subsonic" style="display: inline-block; width: 6em;"><?php echo $l->t('Password'); ?></label>
        <input type="password" name="pass_subsonic"  id="pass_subsonic"  value="<?php echo $_['pass_subsonic']; ?>" placeholder="<?php echo $l->t('Password'); ?>" autocomplete="off" />
</div>
</form>
