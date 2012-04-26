var langue;

$(document).ready(function () {
    if($.cookie('langue') == 'fr'){
        langue = fr;
    }else{
        langue = en;
    }
    
    $('#liTabLibrary').attr('title',langue['tliTabLibrary']); 
    $('#liTabCurrent').attr('title',langue['tliTabCurrent']);
    $('#liTabPlaylists').attr('title',langue['tliTabPlaylists']);
    $('#liPreferences').attr('title',langue['tliPreferences']);
    
    $('#action_RefreshArtists').attr('title',langue['taction_RefreshArtists']);
    $('#action_DecreaseWidth').attr('title',langue['taction_DecreaseWidth']);
    $('#action_IncreaseWidth').attr('title',langue['taction_IncreaseWidth']);
    
    $('#action_SelectAll').html(langue['action_SelectAll']); 
    $('#action_SelectNone').html(langue['action_SelectNone']);
    $('#action_AddToPlaylist').html(langue['action_AddToPlaylist']);
    $('#action_AddToCurrent').html(langue['action_AddToCurrent']);
    $('#action_AddAllToCurrent').html(langue['action_AddAllToCurrent']);
    $('#action_SelectAll').attr('title',langue['taction_SelectAll']); 
    $('#action_SelectNone').attr('title',langue['taction_SelectNone']);
    $('#action_AddToPlaylist').attr('title',langue['taction_AddToPlaylist']);
    $('#action_AddToCurrent').attr('title',langue['taction_AddToCurrent']);
    $('#action_AddAllToCurrent').attr('title',langue['taction_AddAllToCurrent']); 
    $('#action_PlayAlbum').attr('title',langue['taction_PlayAlbum']);
    
    $('#allForlder').html(langue['allForlder']);

    $('#auto').html(langue['auto']);
    $('#newest').html(langue['newest']);
    $('#random').html(langue['random']);
    $('#highest').html(langue['highest']);
    $('#recent').html(langue['recent']);
    $('#frequent').html(langue['frequent']);
    
    $('#action_Empty').html(langue['action_Empty']);
    $('#action_Empty').attr('title',langue['taction_Empty']); 
    $('#action_Shuffle').attr('title',langue['taction_Shuffle']);

    $('#action_CurrentSelectAll').html(langue['action_CurrentSelectAll']);
    $('#action_CurrentSelectNone').html(langue['action_CurrentSelectNone']);
    $('#action_AddCurrentToPlaylist').html(langue['action_AddCurrentToPlaylist']);
    $('#action_CurrentSelectAll').attr('title',langue['taction_CurrentSelectAll']);
    $('#action_CurrentSelectNone').attr('title',langue['taction_CurrentSelectNone']); 
    $('#action_AddCurrentToPlaylist').attr('title',langue['taction_AddCurrentToPlaylist']);

    $('#action_NewPlaylist').html(langue['action_NewPlaylist']);
    $('#action_DeletePlaylist').html(langue['action_DeletePlaylist']);
    $('#action_SavePlaylist').html(langue['action_SavePlaylist']);
    $('#action_NewPlaylist').attr('title',langue['taction_NewPlaylist']);
    $('#action_DeletePlaylist').attr('title',langue['taction_DeletePlaylist']); 
    $('#action_SavePlaylist').attr('title',langue['taction_SavePlaylist']);

    $('#action_RemoveSongs').html(langue['action_RemoveSongs']);
    $('#action_ShufflePlaylist').attr('title',langue['taction_ShufflePlaylist']); 
    $('#action_RemoveSongs').attr('title',langue['taction_RemoveSongs']);

    $('#autoplaylist').html(langue['autoplaylist']);
    $('#spanRandomPlaylist').html(langue['randomPlaylist']);
    $('#aRandomPlay').attr('title',langue['taRandomPlay']); 
    $('#aRandomAdd').attr('title',langue['taRandomAdd']);
    
    $('#savePlaylist').html(langue['savePlaylist']);
    

    $('#ResetPreferences').html(langue['ResetPreferences']);
    $('#SavePreferences').html(langue['SavePreferences']);
    $('#ResetPreferences').attr('title',langue['tResetPreferences']); 
    $('#SavePreferences').attr('title',langue['tSavePreferences']);
    
    $('#h3Login').html(langue['h3Login']);
    $('#labelUsername').html(langue['labelUsername']);
    $('#labelPassword').html(langue['labelPassword']);
    $('#labelServer').html(langue['labelServer']);
    $('#labelServer').attr('title',langue['tlabelServer']);
    
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
    $('#AutoAlbumSize').attr('title',langue['tAutoAlbumSize']);
    $('#AutoPlaylistSize').attr('title',langue['tAutoPlaylistSize']);
    $('#ApplicationName').attr('title',langue['tApplicationName']);
    
    $('#labelHideAZ').html(langue['labelHideAZ']);
    $('#labelEnableNotifications').html(langue['labelEnableNotifications']);
    $('#labelScrollTitle').html(langue['labelScrollTitle']);
    $('#labelMaxbit').html(langue['labelMaxbit']);
    $('#unlimitedDebit').html(langue['unlimitedDebit']);
    $('#HideAZ').attr('title',langue['tHideAZ']);
    $('#EnableNotifications').attr('title',langue['tEnableNotifications']);
    $('#ScrollTitle').attr('title',langue['tScrollTitle']);
    
    $('#labelLangue').html(langue['labelLangue']);
    
    $('#changeLog').html(langue['changeLog']);
    
    $('#thanks').html(langue['thanks']);
    $('#minisubBase').html(langue['minisubBase']);
    $('#icons').html(langue['icons']);
    $('#audioLibrary').html(langue['audioLibrary']);
    
    $('#ChatMsg').attr('title',langue['tChatMsg']);
    
    $('#divNowPlaying').html(langue['divNowPlaying']);
    $('#NowPlayingList').html(langue['NowPlayingList']);
    $('#divChat').html(langue['divChat']);
    
    $('#PreviousTrack').attr('title',langue['tPreviousTrack']);
    $('#PlayTrack').attr('title',langue['tPlayTrack']);
    $('#NextTrack').attr('title',langue['tNextTrack']);
    
    $('#action_ToggleSideBar').attr('title',langue['taction_ToggleSideBar']);

});


