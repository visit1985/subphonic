var username = $.cookie('username');
var password = $.cookie('password');
var auth = makeBaseAuth(username, password);
var passwordenc = 'enc:' + HexEncode($.cookie('password'));
var version = '1.6.0';

var updaterNowPlaying;
var updaterNowPlayingData;

function loadArtists(id, refresh) {
    if (refresh) {
        $('#ArtistList').empty();
    }
    var url;
    if (id == "all") {
        url = baseURL + '/getIndexes.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp';
    } else if (id) {
        url = baseURL + '/getIndexes.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&musicFolderId=' + id;    
    } else {
        url = baseURL + '/getIndexes.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp';
    }
    var content = $('#ArtistList').html();
    if (content === "") {
        // Load Artist List
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'jsonp',
            timeout: 10000,
            success: function (data) {
                if (data["subsonic-response"].status === 'ok') {
                    var indexlist, indexname;

                    // There is a bug in the API that doesn't return a JSON array for one artist
                    var indexes = [];
                    if (data["subsonic-response"].indexes.index.length > 0) {
                        indexes = data["subsonic-response"].indexes.index;
                    } else {
                        indexes[0] = data["subsonic-response"].indexes.index;
                    }
                    
                    //rootdirectoryid =indexes[0].artist[0].id.substring(0,indexes[0].artist[0].id.lastIndexOf('2f'));
                    if (indexes[0].artist.length > 0) {
                        rootdirectoryid =indexes[0].artist[0].id.substring(0,indexes[0].artist[0].id.lastIndexOf('2f'));
                    } else {
                        rootdirectoryid =indexes[0].artist.id.substring(0,indexes[0].artist.id.lastIndexOf('2f'));
                    }


                    $.each(indexes, function (i, index) {
                        if (index.name === '#') {
                            indexname = '0-9';
                        } else {
                            indexname = index.name;
                        }
                        $('<li class=\"index\" id=\"index_' + indexname + '\" title=\"'+language['scrollTop']+'\">' + indexname + '<span class=\"floatright\">&uarr;</span></li>').appendTo("#ArtistList");
                        indexlist += '<li><a href=\"#\">' + indexname + '</a></li>';
                        var artists = [];
                        if (index.artist.length > 0) {
                            artists = index.artist;
                        } else {
                            artists[0] = index.artist;
                        }

                        $.each(artists, function (i, artist) {
                            if (artist.name !== undefined) {
                                var html = "";
                                html += '<li id=\"' + artist.id + '\" class=\"item\">';
                                html += '<span>' + artist.name + '</span>';
                                html += '</li>';
                                $(html).appendTo("#ArtistList");
                            }
                        });
                    });
                    //$(indexlist).appendTo("#IndexList");
                    $("#BottomIndex").empty();
                    $(indexlist).appendTo("#BottomIndex");
                } else {
                    var error = data["subsonic-response"].status;
                    var errorcode = data["subsonic-response"].error.code;
                    var errormsg = data["subsonic-response"].error.message;
                    alert('Status: ' + error + ', Code: ' + errorcode + ', Message: ' + errormsg);
                //var errorhtml = '<li class=\"item\"><span>' + error + '</span></li>';
                //$(errorhtml).appendTo("#IndexList");
                }
            }
        });
    }
}
function getMusicFolders() {
    $.ajax({
        url: baseURL + '/getMusicFolders.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp',
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            if (data["subsonic-response"].musicFolders.musicFolder !== undefined) {
                // There is a bug in the API that doesn't return a JSON array for one artist
                var folders = [];
                if (data["subsonic-response"].musicFolders.musicFolder.length > 0) {
                    folders = data["subsonic-response"].musicFolders.musicFolder;
                } else {
                    folders[0] = data["subsonic-response"].musicFolders.musicFolder;
                }

                var savedMusicFolder = $.cookie('MusicFolders');
                var options = [];
                options.push('<option value="all">All Folders</option>');
                nbFolders = 0;
                $.each(folders, function (i, folder) {
                    nbFolders++;
                    if (savedMusicFolder == folder.id) {
                        options.push('<option value="' + folder.id + '" selected>' + folder.name + '</option>');
                    } else {
                        options.push('<option value="' + folder.id + '">' + folder.name + '</option>');
                    }
                });
                if(nbFolders<2){
                    $('#MusicFolders').hide();
                }
                $('#MusicFolders').html(options.join(''));
            } else {
            }
        }
    });
}
function getAlbums(id, action, appendto) {
    $('.first').trigger('click');
    showLoad();
    $.ajax({
        url: baseURL + '/getMusicDirectory.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + id,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            hideLoad();
            if (action === '') {
                emptyAll();
            }
            if (action === 'autoplay') {
                $('#CurrentPlaylistContainer tbody').empty();
            }
            if (data["subsonic-response"].directory.child !== undefined) {
                // There is a bug in the API that doesn't return a JSON array for one artist
                var children = [];
                if (data["subsonic-response"].directory.child.length > 0) {
                    children = data["subsonic-response"].directory.child;
                } else {
                    children[0] = data["subsonic-response"].directory.child;
                }

                var rowcolor;
                var albumhtml;
                var isDir;
                var header;
                $.each(children, function (i, child) {
                    if(appendto === '#CurrentPlaylistContainer'){    
                        find = false;
                        track = $('#CurrentPlaylistContainer tr.song:first');
                        while($(track).attr('childid') !== undefined){
                            if($(track).attr('childid') == child.id){
                                find = true;
                            }
                            track = track.next();
                        }
                    }
                    if((appendto === '#CurrentPlaylistContainer' && !find) || appendto != '#CurrentPlaylistContainer'){
                        if (i % 2 === 0) {
                            rowcolor = 'even';
                        } else {
                            rowcolor = 'odd';
                        }
                        isDir = child.isDir;
                        if (isDir === true) {
                            if(child.artist == undefined){
                                child.artist = '';
                            }
                            albumhtml = generateAlbumHTML(rowcolor, child.id, child.parent, child.coverArt, child.title, data["subsonic-response"].directory.name, child.userRating);
                            if (appendto == '#AlbumRows') {
                                header = generateAlbumHeaderHTML();
                                $("#AlbumHeader").html(header);
                                $(albumhtml).appendTo(appendto);
                            }else{
                                $(albumhtml).appendTo(appendto);
                            }
                        } else {
                            var track;
                            if (child.track === undefined) {
                                track = "&nbsp;";
                            } else {
                                track = child.track;
                            }
                            var time = secondsToTime(child.duration);
                            songhtml = generateSongHTML(rowcolor, child.id, child.parent, track, child.title, child.artist, child.album, child.coverArt, child.userRating, time['m'], time['s']);
                            if (appendto == '#AlbumRows' || appendto == '#SongRows') {
                                header = generateSongHeaderHTML();
                                $("#SongHeader").html(header);
                                $(songhtml).appendTo('#SongRows');
                            }else{
                                $(songhtml).appendTo(appendto);
                            }
                        }
                        
                    }
                    updateCssContainer();
                });
                if (appendto === '#CurrentPlaylistContainer') {
                    updateMessage(children.length + ' Song(s) Added');
                }                
                if (action === 'autoplay') {
                    autoPlay();
                }else if(action === 'add' && appendto === '#CurrentPlaylistContainer'){
                    if(audio == undefined || audio.playState == 0){
                        autoPlay();
                    }
                }
            }
        }
    });
}
function getAlbumListBy(id) {
    showLoad()
    var size;
    if ($.cookie('AutoAlbumSize') === null) {
        size = 15;
    } else {
        size = $.cookie('AutoAlbumSize');
    }
    $.ajax({
        url: baseURL + '/getAlbumList.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&size=' + size + '&type=' + id,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            hideLoad();
            if (data["subsonic-response"].albumList.album !== undefined) {
                emptyAll();
                var header = generateAlbumHeaderHTML();
                $("#AlbumRows").html(header);
                // There is a bug in the API that doesn't return a JSON array for one artist
                var albums = [];
                if (data["subsonic-response"].albumList.album.length > 0) {
                    albums = data["subsonic-response"].albumList.album;
                } else {
                    albums[0] = data["subsonic-response"].albumList.album;
                }

                var rowcolor;
                $.each(albums, function (i, album) {
                    if (i % 2 === 0) {
                        rowcolor = 'even';
                    } else {
                        rowcolor = 'odd';
                    }
                    // Only show albums, not songs (Rated songs will also be returned in API call, trying to display them will break Back button, disabled for now)
                    var albumhtml;
                    if (album.isDir === true) {
                        albumhtml = generateAlbumHTML(rowcolor, album.id, album.parent, album.coverArt, album.title, album.artist, album.userRating);
                    }
                    $(albumhtml).appendTo("#AlbumRows");
                });
                updateCssContainer();
            } else {
                emptyAll();
            }
        }
    });
}
function getRandomSongList(action, appendto) {
    showLoad()
    var size;
    if ($.cookie('AutoPlaylistSize') === null) {
        size = 25;
    } else {
        size = $.cookie('AutoPlaylistSize');
    }
    $.ajax({
        url: baseURL + '/getRandomSongs.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&size=' + size,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            hideLoad();
            if (data["subsonic-response"].randomSongs.song !== undefined) {
                if (appendto === '#TrackContainer') {
                    $("#TrackContainer").empty();
                }
                if (action === 'autoplay') {
                    $(appendto).empty();
                }
                // There is a bug in the API that doesn't return a JSON array for one artist
                var items = [];
                if (data["subsonic-response"].randomSongs.song.length > 0) {
                    items = data["subsonic-response"].randomSongs.song;
                } else {
                    items[0] = data["subsonic-response"].randomSongs.song;
                }

                var rowcolor;
                var html;
                $.each(items, function (i, item) {
                    if (i % 2 === 0) {
                        rowcolor = 'even';
                    } else {
                        rowcolor = 'odd';
                    }
                    var track;
                    if (item.track === undefined) {
                        track = "&nbsp;";
                    } else {
                        track = item.track;
                    }
                    var time = secondsToTime(item.duration);

                    html = generateSongHTML(rowcolor, item.id, item.parent, track, item.title, item.artist, item.album, item.coverArt, item.userRating, time['m'], time['s']);
                    $(html).appendTo(appendto);
                });
                if (appendto === '#CurrentPlaylistContainer') {
                    updateMessage(items.length + ' Song(s) Added');
                }
                if (action === 'autoplay') {
                    autoPlay();
                }
                updateCssContainer();
            } else {
                $(appendto).empty();
            }
        }
    });
}

function search(type, query) {
    showLoad()
    $('#addArtistForHead').append(language['dontFindArtist']);
    $('#addArtistForHead').append(' <a href=javascript:addSearchArtist("'+query+'")>'+query+'</a>');
    $('#addArtistForHead').show();
    $.ajax({
        url: baseURL + '/search2.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&query=' + query,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            hideLoad();
            if (data["subsonic-response"].searchResult2 !== "") {
                emptyAll();
                
                // There is a bug in the API that doesn't return a JSON array for one artist
                var children = [];
                var rowcolor;
                var songhtml;
                var albumhtml;
  
                if (data["subsonic-response"].searchResult2.artist != undefined) {
                    header = generateArtistHeaderHTML();
                    $("#ArtistHeader").html(header);
                    if(data["subsonic-response"].searchResult2.artist.length > 0){
                        children = data["subsonic-response"].searchResult2.artist;
                    }else{
                        children[0] = data["subsonic-response"].searchResult2.artist;
                    }
              
                    $.each(children, function (i, child) {
                        if (rowcolor == 'odd') {
                            rowcolor = 'even';
                        } else {
                            rowcolor = 'odd';
                        }
                        artisthtml = generateArtistHTML(rowcolor, child.id,child.name);
                        $(artisthtml).appendTo("#ArtistRows");
                    }); 
                }

                if (data["subsonic-response"].searchResult2.album != undefined) {          
                    header = generateAlbumHeaderHTML();
                    $(header).appendTo("#AlbumHeader");

                    if(data["subsonic-response"].searchResult2.album.length > 0){
                        children = data["subsonic-response"].searchResult2.album;
                    }else{
                        children[0] = data["subsonic-response"].searchResult2.album;
                    }
                    $.each(children, function (i, child) {
                        if (rowcolor == 'odd') {
                            rowcolor = 'even';
                        } else {
                            rowcolor = 'odd';
                        }
                        albumhtml = generateAlbumHTML(rowcolor, child.id, parent.id, child.coverArt, child.title, child.artist, child.userRating);
                        $(albumhtml).appendTo("#AlbumRows");
                    }); 
                }
                
                
                if (data["subsonic-response"].searchResult2.song != undefined) {
                    
                    header = generateSongHeaderHTML();
                    $(header).appendTo("#SongHeader");
                    
                    if (data["subsonic-response"].searchResult2.song.length >0){
                        children = data["subsonic-response"].searchResult2.song;
                    }else{
                        children[0] = data["subsonic-response"].searchResult2.song;
                        
                    }
                    $.each(children, function (i, child) {
                        if (rowcolor == 'odd') {
                            rowcolor = 'even';
                        } else {
                            rowcolor = 'odd';
                        }

                        var track;
                        if (child.track === undefined) {
                            track = "&nbsp;";
                        } else {
                            track = child.track;
                        }
                        var time = secondsToTime(child.duration);
                        songhtml = generateSongHTML(rowcolor, child.id, child.parent, track, child.title, child.artist, child.album, child.coverArt, child.userRating, time['m'], time['s']);
                        $(songhtml).appendTo("#SongRows");
                    });
                    updateCssContainer();
                }
            }else{
                emptyAll();
                $("#SongRows").append('<center>No result</center>');
            }
        }
    });
}



function loadPlaylists(refresh) {
    if (refresh) {
        $('#PlaylistContainer').empty();
    }
    var content = $('#PlaylistContainer').html();
    if (content === "") {
        // Load Playlists
        $.ajax({
            url: baseURL + '/getPlaylists.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp',
            method: 'GET',
            dataType: 'jsonp',
            timeout: 10000,
            beforeSend: function (req) {
                req.setRequestHeader('Authorization', auth);
            },
            success: function (data) {
                var playlists = [];
                if (data["subsonic-response"].playlists.playlist.length > 0) {
                    playlists = data["subsonic-response"].playlists.playlist;
                } else {
                    playlists[0] = data["subsonic-response"].playlists.playlist;
                }
                $.each(playlists, function (i, playlist) {
                    var html = "";
                    html += '<li id=\"' + playlist.id + '\" class=\"item\">';
                    html += '<span>' + playlist.name + '</span>';
                    html += '<div class=\"floatright\"><a class=\"play\" href=\"\" title=\"'+language['tPlay']+'"></a></div>';
                    html += '<div class=\"floatright\"><a class=\"download\" href=\"\" title=\"'+language['tDownload']+'"></a></div>';
                    html += '<div class=\"floatright\"><a class=\"add\" href=\"\" title=\"'+language['tAddToCurrentPlaylist']+'\"></a></div>';
                    html += '</li>';
                    $(html).appendTo("#PlaylistContainer");
                });
            }
        });
    }
}
function loadPlaylistsForMenu(menu) {
    $('#' + menu).empty();
    $.ajax({
        url: baseURL + '/getPlaylists.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp',
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            var playlists = [];
            if (data["subsonic-response"].playlists.playlist.length > 0) {
                playlists = data["subsonic-response"].playlists.playlist;
            } else {
                playlists[0] = data["subsonic-response"].playlists.playlist;
            }
            $.each(playlists, function (i, playlist) {
                if (menu === 'submenu_AddCurrentToPlaylist') {
                    $("<a href=\"#\" onclick=\"javascript:addToPlaylist('" + playlist.id + "', 'current'); return false;\">" + playlist.name + "</a><br />").appendTo("#" + menu);
                } else {
                    $("<a href=\"#\" onclick=\"javascript:addToPlaylist('" + playlist.id + "', ''); return false;\">" + playlist.name + "</a><br />").appendTo("#" + menu);
                }
            });
            if (menu === 'submenu_AddCurrentToPlaylist') {
                $("<a href=\"#\" onclick=\"javascript:addToPlaylist('new','current'); return false;\">"+language['action_NewPlaylist']+"</a><br />").appendTo("#" + menu);
            } else {
                $("<a href=\"#\" onclick=\"javascript:addToPlaylist('new',''); return false;\">"+language['action_NewPlaylist']+"</a><br />").appendTo("#" + menu);
            }
        
        }
    });
}
function newPlaylist() {
    var reply = prompt("Choose a name for your new playlist.", "");
    if (reply) {
        $.ajax({
            url: baseURL + '/createPlaylist.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&name=' + reply,
            method: 'GET',
            dataType: 'jsonp',
            timeout: 10000,
            beforeSend: function (req) {
                req.setRequestHeader('Authorization', auth);
            },
            success: function (data) {
                loadPlaylists(true);
            }
        });
    }
}
function deletePlaylist(id) {
    $.ajax({
        url: baseURL + '/deletePlaylist.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + id,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            loadPlaylists(true);
            $('#TrackContainer tbody').empty();
        }
    });
}
function addToPlaylist(playlistid, from) {
    var selected = [];
    var el;
    if (from === 'current') {
        el = $('#CurrentPlaylist table.songlist tbody tr.selected');
    } else {
        el = $('#Albums table.songlist tbody tr.selected');
    }
    el.each(function (index) {
        selected.push($(this).attr('childid'));
    });
    
    
    if (selected.length <= 0) {
        if (from === 'current') {
            el = $('#CurrentPlaylist table.songlist tbody tr');
        } else {
            el = $('#Albums table.songlist tbody tr');
        }
        el.each(function (index) {
            selected.push($(this).attr('childid'));
        });
    }
    
    if (selected.length > 0) {
        if (playlistid !== 'new') { // Create new playlist from here, will implement in UI later
            // Get songs from playlist
            var currentsongs = [];
            $.ajax({
                url: baseURL + '/getPlaylist.view',
                type: 'GET',
                data : {
                    u : username,
                    p : passwordenc,
                    v : version,
                    c : applicationName,
                    f : 'jsonp',
                    id : playlistid
                },
                dataType: 'jsonp',
                success: function (data) {
                    // There is a bug in the API that doesn't return a JSON array for one artist
                    var children = [];
                    if (data["subsonic-response"].playlist.entry !== undefined) {
                        if (data["subsonic-response"].playlist.entry.length > 1) {
                            children = data["subsonic-response"].playlist.entry;
                        } else {
                            children[0] = data["subsonic-response"].playlist.entry;
                        }
                        $.each(children, function (i, child) {
                            currentsongs.push(child.id);
                        });
                    }
                    var count = 0;
                    $.each(selected, function (i, songid) {
                        if (jQuery.inArray(songid, currentsongs) === -1) {
                            currentsongs.push(songid);
                            count++;
                        }
                    });
                    if (count > 0) {
                        $.ajax({
                            url: baseURL + '/createPlaylist.view',
                            dataType: 'text',
                            type: 'POST',
                            timeout: 10000,
                            data: {
                                u: username, 
                                p: passwordenc, 
                                v: version, 
                                c: applicationName, 
                                f: "json", 
                                playlistId: playlistid, 
                                songId:  currentsongs
                            },
                            success: function () {
                                $('table.songlist tr.song').each(function () {
                                    $(this).removeClass('selected');
                                });
                                updateMessage('Playlist Updated!');
                            },
                            traditional: true // Fixes POST with an array in JQuery 1.4
                        });
                    }
                }
            });
        } else {
            var reply = prompt("Choose a name for your new playlist.", "");
            $.ajax({
                type: 'POST',
                url: baseURL + '/createPlaylist.view',
                dataType: 'json',
                timeout: 10000,
                data: {
                    u: username, 
                    p: passwordenc, 
                    v: version, 
                    c: applicationName, 
                    f: "json", 
                    name: ""+reply+"", 
                    songId: selected
                },
                success: function () {
                    $('table.songlist tr.song').each(function () {
                        $(this).removeClass('selected');
                    });
                    updateMessage('Playlist Created!');
                    loadPlaylists(true);
                },
                traditional: true // Fixes POST with an array in JQuery 1.4
            });
        }
        setTimeout(function () {
            $('div.submenu').fadeOut();
        }, 100);
    }
}

function savePlaylist(playlistid) {
    var songs = [];
    $('#TrackContainer tr.song').each(function (index) {
        songs.push($(this).attr('childid'));
    });
    if (songs.length > 0) {
        $.ajax({
            type: 'POST',
            url: baseURL + '/createPlaylist.view',
            dataType: 'json',
            timeout: 10000,
            data: {
                u: username, 
                p: passwordenc, 
                v: version, 
                c: applicationName, 
                f: "jsonp", 
                playlistId: playlistid, 
                songId: songs
            },
            success: function () {
                getPlaylist(playlistid);
                updateMessage('Playlist Updated!');
            },
            traditional: true // Fixes POST with an array in JQuery 1.4
        });
    }
}


function addToCurrent(addAll) {
    var count;
    if (addAll) {
        count = $('#AlbumContainer tr.song').length;
        count += $('#AlbumContainer tr.album').length;
    } else {
        count = $('#AlbumContainer tr.selected').length;
    }
    if (count > 0) {
        if (addAll) {
            $('#SongContainer tr.song').each(function (index) {
                $(this).clone().appendTo('#CurrentPlaylistContainer tbody');
                updateMessage(count + ' Song(s) Added');
            });
            $('#AlbumContainer tr.album').each(function (index) {
                var albumid = $(this).attr('childid');
                getAlbums(albumid, 'add', '#CurrentPlaylistContainer');
            });
        } else {
            $('#AlbumContainer tr.selected').each(function (index) {
                $(this).clone().appendTo('#CurrentPlaylistContainer tbody');
                updateMessage(count + ' Song(s) Added');
            });
        }
    }
}
function downloadItem(id,type) {
    var url;
    if(type=='item' && id){
        reqDownload = 'id=' + id;
    }
    if(type=='playlist' && id){
        reqDownload = 'playlistUtf8Hex=' + id;
    }
    if (reqDownload) {
        url = baseURL + '/download.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&' + reqDownload;
        window.location = url;
    }
}


function getPlaylist(id, action, appendto) {
    showLoad();
    $.ajax({
        url: baseURL + '/getPlaylist.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + id,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            hideLoad();
            if (data["subsonic-response"].playlist.entry !== undefined) {
                if (appendto === '#TrackContainer tbody') {
                    $(appendto).empty();
                    var header = generateSongHeaderHTML();
                    $("#TrackContainer thead").html(header);
                }
                if (action === 'autoplay') {
                    $(appendto).empty();
                }
                // There is a bug in the API that doesn't return a JSON array for one artist
                var children = [];
                if (data["subsonic-response"].playlist.entry.length > 0) {
                    children = data["subsonic-response"].playlist.entry;
                } else {
                    children[0] = data["subsonic-response"].playlist.entry;
                }

                var rowcolor;
                var html;
                $.each(children, function (i, child) {
                    if (i % 2 === 0) {
                        rowcolor = 'even';
                    } else {
                        rowcolor = 'odd';
                    }
                    var track;
                    if (child.track === undefined) {
                        track = "&nbsp;";
                    } else {
                        track = child.track;
                    }
                    var time = secondsToTime(child.duration);
                    html = generateSongHTML(rowcolor, child.id, child.parent, track, child.title, child.artist, child.album, child.coverArt, child.userRating, time['m'], time['s']);
                    $(html).appendTo(appendto);
                });
                if (appendto === '#CurrentPlaylistContainer tbody') {
                    updateMessage(children.length + ' Song(s) Added');
                }
                if (action === 'autoplay') {
                    autoPlay();
                }
                
            } else {
                if (appendto === '#TrackContainer tbody') {
                    $(appendto).empty();
                }
            }
        }
    });
}


function rateSong(songid, rating) {
    $.ajax({
        url: baseURL + '/setRating.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + songid + "&rating=" + rating,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function () {
            updateMessage('Rating Updated!');
        }
    });
}

function updateNowPlaying() {
    updaterNowPlaying = $.periodic({
        period: 4000, 
        decay: 1.5, 
        max_period: 1800000
    }, function () {
        $.ajax({
            periodic: this,
            url: baseURL + '/getNowPlaying.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp',
            method: 'GET',
            dataType: 'jsonp',
            timeout: 10000,
            beforeSend: function (req) {
                req.setRequestHeader('Authorization', auth);
            },
            success: function (data) {
                if (data["subsonic-response"].nowPlaying.entry === undefined) {
                    this.periodic.increment();
                    $("#NowPlayingList").empty();
                    var chathtml = '<div class=\"msg\">';
                    chathtml += '<span class=\"user\">Nothing :(</span></br>';
                    chathtml += '</div>';
                    $(chathtml).appendTo("#NowPlayingList");
                } else if (updaterNowPlayingData === $.param(data)) {
                    this.periodic.increment();
                } else {
                    $("#NowPlayingList").empty();
                    var msgs = [];
                    if (data["subsonic-response"].nowPlaying.entry.length > 0) {
                        msgs = data["subsonic-response"].nowPlaying.entry;
                    } else {
                        msgs[0] = data["subsonic-response"].nowPlaying.entry;
                    }
                    this.periodic.reset();
                    var sorted = msgs.sort(function (a, b) {
                        return a.minutesAgo - b.minutesAgo;
                    });
                    $.each(sorted, function (i, msg) {
                        var chathtml = '<div class=\"msg\">';
                        chathtml += '<span class=\"user\">' + msg.username + '</span></br>';
                        chathtml += '<span class=\"artist\">' + msg.artist + '</span> - ';
                        chathtml += '<span class=\"title\">' + msg.title + '</span>';
                        chathtml += '</div>';
                        $(chathtml).appendTo("#NowPlayingList");
                    });
                    updaterNowPlayingData = $.param(data);
                }
            }
        });
    });
}
function stopUpdateNowPlaying() {
    updaterNowPlaying.cancel();
}