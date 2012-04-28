function authentification(){
    $('#Username').val($.cookie('username'));
    $('#Password').val($.cookie('password'));
    $('#AutoAlbumSize').val($.cookie('AutoAlbumSize'));
    $('#AutoPlaylistSize').val($.cookie('AutoPlaylistSize'));
    $('#Server').val($.cookie('Server'));
    $('#CacheSize').val($.cookie('CacheSize'));
    $('#ApplicationName').val($.cookie('ApplicationName'));
    $('#Maxbit option[value='+$.cookie('Maxbit')+']').attr("selected", "selected");
    $('#language option[value='+$.cookie('language')+']').attr("selected", "selected");
    
    $('#UsernameHeadphones').val($.cookie('username_headphones'));
    $('#PasswordHeadphones').val($.cookie('password_headphones'));
    $('#ServerHeadphones').val($.cookie('server_headphones'));
    $('#ApikeyHeadphones').val($.cookie('apikey_headphones'));

    if ($.cookie('HideAZ')) {
        $('#HideAZ').attr('checked', true);
    } else {
        $('#HideAZ').attr('checked', false);
    }
    if ($.cookie('EnableNotifications')) {
        $('#EnableNotifications').attr('checked', true);
    } else {
        $('#EnableNotifications').attr('checked', false);
    }
    if ($.cookie('ScrollTitle')) {
        $('#ScrollTitle').attr('checked', true);
    } else {
        $('#ScrollTitle').attr('checked', false);
    }
}