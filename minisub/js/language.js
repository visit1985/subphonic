var language;

$(document).ready(function () {
    if($.cookie('language') == 'fr'){
        language = fr;
    }else{
        language = en;
    }
    
    $('#liTabLibrary').attr('title',language['tliTabLibrary']); 
    $('#liTabCurrent').attr('title',language['tliTabCurrent']);
    $('#liTabPlaylists').attr('title',language['tliTabPlaylists']);
    $('#liPreferences').attr('title',language['tliPreferences']);
    
    $('#action_RefreshArtists').attr('title',language['taction_RefreshArtists']);
    $('#action_DecreaseWidth').attr('title',language['taction_DecreaseWidth']);
    $('#action_IncreaseWidth').attr('title',language['taction_IncreaseWidth']);
    
    $('#action_SelectAll').html(language['action_SelectAll']); 
    $('#action_SelectNone').html(language['action_SelectNone']);
    $('#action_AddToPlaylist').html(language['action_AddToPlaylist']);
    $('#action_AddToCurrent').html(language['action_AddToCurrent']);
    $('#action_AddAllToCurrent').html(language['action_AddAllToCurrent']);
    $('#action_SelectAll').attr('title',language['taction_SelectAll']); 
    $('#action_SelectNone').attr('title',language['taction_SelectNone']);
    $('#action_AddToPlaylist').attr('title',language['taction_AddToPlaylist']);
    $('#action_AddToCurrent').attr('title',language['taction_AddToCurrent']);
    $('#action_AddAllToCurrent').attr('title',language['taction_AddAllToCurrent']); 
    $('#action_PlayAlbum').attr('title',language['taction_PlayAlbum']);
    
    $('#allForlder').html(language['allForlder']);

    $('#auto').html(language['auto']);
    $('#newest').html(language['newest']);
    $('#random').html(language['random']);
    $('#highest').html(language['highest']);
    $('#recent').html(language['recent']);
    $('#frequent').html(language['frequent']);
    
    $('#action_Empty').html(language['action_Empty']);
    $('#action_Empty').attr('title',language['taction_Empty']); 
    $('#action_Shuffle').attr('title',language['taction_Shuffle']);

    $('#action_CurrentSelectAll').html(language['action_CurrentSelectAll']);
    $('#action_CurrentSelectNone').html(language['action_CurrentSelectNone']);
    $('#action_AddCurrentToPlaylist').html(language['action_AddCurrentToPlaylist']);
    $('#action_CurrentSelectAll').attr('title',language['taction_CurrentSelectAll']);
    $('#action_CurrentSelectNone').attr('title',language['taction_CurrentSelectNone']); 
    $('#action_AddCurrentToPlaylist').attr('title',language['taction_AddCurrentToPlaylist']);

    $('#action_NewPlaylist').html(language['action_NewPlaylist']);
    $('#action_DeletePlaylist').html(language['action_DeletePlaylist']);
    $('#action_SavePlaylist').html(language['action_SavePlaylist']);
    $('#action_NewPlaylist').attr('title',language['taction_NewPlaylist']);
    $('#action_DeletePlaylist').attr('title',language['taction_DeletePlaylist']); 
    $('#action_SavePlaylist').attr('title',language['taction_SavePlaylist']);

    $('#action_RemoveSongs').html(language['action_RemoveSongs']);
    $('#action_ShufflePlaylist').attr('title',language['taction_ShufflePlaylist']); 
    $('#action_RemoveSongs').attr('title',language['taction_RemoveSongs']);

    $('#autoplaylist').html(language['autoplaylist']);
    $('#spanRandomPlaylist').html(language['randomPlaylist']);
    $('#aRandomPlay').attr('title',language['taRandomPlay']); 
    $('#aRandomAdd').attr('title',language['taRandomAdd']);
    
    $('#savePlaylist').html(language['savePlaylist']);
    

    $('#ResetPreferences').html(language['ResetPreferences']);
    $('#SavePreferences').html(language['SavePreferences']);
    $('#ResetPreferences').attr('title',language['tResetPreferences']); 
    $('#SavePreferences').attr('title',language['tSavePreferences']);
    
    $('#h3Login').html(language['h3Login']);
    $('#labelUsername').html(language['labelUsername']);
    $('#labelPassword').html(language['labelPassword']);
    $('#labelServer').html(language['labelServer']);
    $('#labelServer').attr('title',language['tlabelServer']);
    
    $('#h3LoginHeadphones').html(language['h3LoginHeadphones']);
    $('#labelUsernameHeadphones').html(language['labelUsername']);
    $('#labelPasswordHeadphones').html(language['labelPassword']);
    $('#labelServerHeadphones').html(language['labelServer']);
    $('#labelServerHeadphones').attr('title',language['tlabelServer']);
    $('#labelApikeyHeadphones').html(language['apikey']);
    
    
    $('#keyboardShortcuts').html(language['keyboardShortcuts']);
    $('#shortcutsAz').html(language['shortcutsAz']);
    $('#shortcutsHome').html(language['shortcutsHome']);
    $('#shortcutsSpacebar').html(language['shortcutsSpacebar']);
    $('#shortcutsNextTrack').html(language['shortcutsNextTrack']);
    $('#shortcutsPreviousTrack').html(language['shortcutsPreviousTrack']);
    
    $('#options').html(language['options']);
    $('#labelAutoAlbumSize').html(language['labelAutoAlbumSize']);
    $('#labelAutoPlaylistSize').html(language['labelAutoPlaylistSize']);
    $('#labelCacheSize').html(language['labelCacheSize']);
    $('#labelApplicationName').html(language['labelApplicationName']);
    $('#AutoAlbumSize').attr('title',language['tAutoAlbumSize']);
    $('#AutoPlaylistSize').attr('title',language['tAutoPlaylistSize']);
    $('#ApplicationName').attr('title',language['tApplicationName']);
    
    $('#labelHideAZ').html(language['labelHideAZ']);
    $('#labelEnableNotifications').html(language['labelEnableNotifications']);
    $('#labelScrollTitle').html(language['labelScrollTitle']);
    $('#labelMaxbit').html(language['labelMaxbit']);
    $('#unlimitedDebit').html(language['unlimitedDebit']);
    $('#HideAZ').attr('title',language['tHideAZ']);
    $('#EnableNotifications').attr('title',language['tEnableNotifications']);
    $('#ScrollTitle').attr('title',language['tScrollTitle']);
    
    $('#labellanguage').html(language['labellanguage']);
    
    $('#changeLog').html(language['changeLog']);
    
    $('#thanks').html(language['thanks']);
    $('#minisubBase').html(language['minisubBase']);
    $('#icons').html(language['icons']);
    $('#audioLibrary').html(language['audioLibrary']);
    
    $('#ChatMsg').attr('title',language['tChatMsg']);
    
    $('#divNowPlaying').html(language['divNowPlaying']);
    $('#NowPlayingList').html(language['NowPlayingList']);
    $('#divChat').html(language['divChat']);
    
    $('#PreviousTrack').attr('title',language['tPreviousTrack']);
    $('#PlayTrack').attr('title',language['tPlayTrack']);
    $('#NextTrack').attr('title',language['tNextTrack']);
    
    $('#action_ToggleSideBar').attr('title',language['taction_ToggleSideBar']);
    
    
    $('#paramHead').html(language['paramHead']);
    $('#getHistory').html(language['getHistory']);
    $('#getLogs').html(language['getLogs']);
    $('#getWanted').html(language['getWanted']);
    $('#getUpcoming').html(language['getUpcoming']);
    
    $('#liArtist').html(language['artist']);
    

});


