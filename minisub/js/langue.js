$(document).ready(function () {
    if($.cookie('langue') == 'fr'){
        langue = fr;
    }else{
        langue = en;
    }
    $('#action_SelectAll').html(langue['action_SelectAll']); 
    $('#action_SelectNone').html(langue['action_SelectNone']);
    $('#action_AddToPlaylist').html(langue['action_AddToPlaylist']);
    $('#action_AddToCurrent').html(langue['action_AddToCurrent']);
    $('#action_AddAllToCurrent').html(langue['action_AddAllToCurrent']);
    $('#action_PlayAlbum').html(langue['action_PlayAlbum']);
    
    $('#allForlder').html(langue['allForlder']);

    $('#auto').html(langue['auto']);
    $('#newest').html(langue['newest']);
    $('#random').html(langue['random']);
    $('#highest').html(langue['highest']);
    $('#recent').html(langue['recent']);
    $('#frequent').html(langue['frequent']);
    
    $('#action_Empty').html(langue['action_Empty']);

    $('#action_CurrentSelectAll').html(langue['action_CurrentSelectAll']);
    $('#action_CurrentSelectNone').html(langue['action_CurrentSelectNone']);
    $('#action_AddCurrentToPlaylist').html(langue['action_AddCurrentToPlaylist']);

    $('#action_NewPlaylist').html(langue['action_NewPlaylist']);
    $('#action_DeletePlaylist').html(langue['action_DeletePlaylist']);
    $('#action_SavePlaylist').html(langue['action_SavePlaylist']);

    $('#action_RemoveSongs').html(langue['action_RemoveSongs']);

    $('#autoplaylist').html(langue['autoplaylist']);
    $('#randomPlaylist').html(langue['randomPlaylist']);
    
    $('#savePlaylist').html(langue['savePlaylist']);
    
    $('#h3Login').html(langue['h3Login']);
    $('#ResetPreferences').html(langue['ResetPreferences']);
    $('#SavePreferences').html(langue['SavePreferences']);
    
    $('#labelUsername').html(langue['labelUsername']);
    $('#labelPassword').html(langue['labelPassword']);
    $('#labelServer').html(langue['labelServer']);

    $('#keyboardShortcuts').html(langue['keyboardShortcuts']);
    $('#shortcutsAz').html(langue['shortcutsAz']);
    $('#shortcutsHome').html(langue['shortcutsHome']);
    $('#shortcutsSpacebar').html(langue['shortcutsSpacebar']);
    $('#shortcutsNextTrack').html(langue['shortcutsNextTrack']);
    $('#shortcutsPreviousTrack').html(langue['shortcutsPreviousTrack']);
    
    $('#options').html(langue['options']);
    $('#labelAutoAlbumSize').html(langue['labelAutoAlbumSize']);
    $('#labelAutoPlaylistSize').html(langue['labelAutoPlaylistSize']);
    $('#labelCacheSize').html(langue['labelCacheSize']);
    $('#labelApplicationName').html(langue['labelApplicationName']);
    
    $('#labelHideAZ').html(langue['labelHideAZ']);
    $('#labelEnableNotifications').html(langue['labelEnableNotifications']);
    $('#labelScrollTitle').html(langue['labelScrollTitle']);
    $('#labelMaxbit').html(langue['labelMaxbit']);
    $('#unlimitedDebit').html(langue['unlimitedDebit']);
    
    $('#labelLangue').html(langue['labelLangue']);
    
    $('#thanks').html(langue['thanks']);
    $('#minisubBase').html(langue['minisubBase']);
    $('#icons').html(langue['icons']);
    $('#audioLibrary').html(langue['audioLibrary']);
    
    $('#divNowPlaying').html(langue['divNowPlaying']);
    $('#NowPlayingList').html(langue['NowPlayingList']);
    $('#divChat').html(langue['divChat']);

});


