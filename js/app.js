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
if (u && p && s) {
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
var username = $.cookie('username');
var password = $.cookie('password');
var auth = makeBaseAuth(username, password);
var passwordenc = 'enc:' + HexEncode($.cookie('password'));
var version = '1.6.0';

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
        default:
            break;
    }
}
