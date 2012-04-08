<form id="minisub">
    <fieldset class="personalblock">
        <strong>MiniSub settings : </strong><br />
        Server Adress : <input type="text" name="addr_subsonic"  id="addr_subsonic"  value="<?php echo $_['addr_subsonic']; ?>"  placeholder="<?php echo $l->t('URL'); ?>"  style="width: 300px;"/>
        Username : <input type="text" name="user_subsonic"  id="user_subsonic"  value="<?php echo $_['user_subsonic']; ?>"  placeholder="<?php echo $l->t('Username'); ?>" />
        Password : <input type="password" name="pass_subsonic"  id="pass_subsonic"  value="<?php echo $_['pass_subsonic']; ?>"  placeholder="<?php echo $l->t('Password'); ?>" />
        <br />
        <span class="msg"></span>
    </fieldset>
</form>
