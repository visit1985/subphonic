// Global Variables
var debug = false;
var audio;
var hostURL = location.href;
var baseURL;
var rootdirectoryid = -1;
var cache = new Array();

// Set auth cookies if specified in URL on launch
var u = getParameterByName('u'); 
var p = getParameterByName('p');
var s = getParameterByName('s');
var l = getParameterByName('l');
var uh = getParameterByName('uh'); 
var ph = getParameterByName('ph');
var sh = getParameterByName('sh');
var ah = getParameterByName('ah');

reload = false;
if (u && p && s) {
    $.cookie('username', null);
    $.cookie('password', null);
    $.cookie('Server', null);
    
    if (!$.cookie('username')) {
        $.cookie('username', u, {
            expires: 1
        });
    }
    if (!$.cookie('password')) {
        $.cookie('password', p, {
            expires: 1
        });
    }
    if (!$.cookie('Server')) {
        $.cookie('Server', s, {
            expires: 1
        });
    }
    reload = true;
}

if(l){
    $.cookie('language', null);
    
    if (!$.cookie('language')) {
        $.cookie('language', l, {
            expires: 1
        });
    }
    reload = true;
}

if(uh && ph && sh && ah){
    $.cookie('username_headphones', null);
    $.cookie('password_headphones', null);
    $.cookie('server_headphones', null);
    $.cookie('apikey_headphones', null);
    
    if (!$.cookie('username_headphones')) {
        $.cookie('username_headphones', uh, {
            expires: 1
        });
    }
    if (!$.cookie('password_headphones')) {
        $.cookie('password_headphones', ph, {
            expires: 1
        });
    }
    if (!$.cookie('server_headphones')) {
        $.cookie('server_headphones', sh, {
            expires: 1
        });
    }
    if (!$.cookie('apikey_headphones')) {
        $.cookie('apikey_headphones', ah, {
            expires: 1
        });
    }
    reload = true;
}
    
    
    
    
    
    
if(reload){
    window.location.href = getPathFromUrl(window.location);
}


if ($.cookie('Server')) {
    baseURL = $.cookie('Server') + '/rest';
}
var cacheSize;
if ($.cookie('CacheSize')) {
    cacheSize = $.cookie('CacheSize');
} else {
    cacheSize = 3;
}
var maxbit;
if ($.cookie('Maxbit')) {
    maxbit = $.cookie('Maxbit');
} else {
    maxbit = 0;
}

var applicationName;
if ($.cookie('ApplicationName')) {
    applicationName = $.cookie('ApplicationName');
} else {
    applicationName = 'MiniSub';
}


function loadTabContent(tab) {
    switch (tab) {
        case '#tabLibrary':
            if ($.cookie('MusicFolders')) {
                loadArtists($.cookie('MusicFolders'), false);
            } else {
                loadArtists();
            }
            getMusicFolders();
            break;
        case '#tabCurrent':
            var header = generateSongHeaderHTML();
            $("#CurrentPlaylistContainer thead").html(header);
            break;
        case '#tabPlaylists':
            loadPlaylists();
            break;
        case '#tabPreferences':
            break;
        case '#tabHeadphones':
            getIndexHead();
            break;
        default:
            break;
    }
}
