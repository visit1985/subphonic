var usernameHead = $.cookie('username_headphones');
var passwordHead = $.cookie('password_headphones');
var urlHead = $.cookie('server_headphones');
var apikeyHead = $.cookie('apikey_headphones');
var baseURLHead = urlHead+'/api?apikey='+apikeyHead;


function getIndexHead(refresh) {
    if (refresh) {
        $('#HeadphonesArtistContainer').empty();
    }
    
    var content = $('#HeadphonesArtistContainer').html();
    if (content === "") {
        $.ajax({
            url: '/apps/subphonic/templates/req.php',
            type: 'POST',
            dataType: 'json',
            data: { 
                u: usernameHead, 
                p: passwordHead,
                r : baseURLHead+'&cmd=getIndex'
            },
            success: function (data) {     
                var artists = [];
                artists = data;
                
                $.each(artists, function (i, artist) {
                    if (artist.ArtistName !== undefined) {
                        var html = "";
                        html += '<li id=\"' + artist.ArtistID + '\" class=\"item\">';
                        html += '<span>' + artist.ArtistName + '</span>';
                        html += '</li>';
                        $(html).appendTo("#HeadphonesArtistContainer");
                    }
                });
                
                $('#artist_filter_head').liveFilter({
                    defaultText: language['search']
                });
            }
        });
    }
}

function getArtistHead(id) {
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getArtist&id='+id
        },
        success: function (data) {
            hideLoad();
            emptyAllHead();
            var albumhtml;
            var header = generateAlbumHeaderHTMLHead();
            $('#AlbumHeaderHead').html(header);
            
            $.each(data.albums, function (i, album) {
                albumhtml = generateAlbumHTMLHead(album.Status, album.AlbumID, album.ArtistID, album.AlbumTitle, album.ArtistName,album.AlbumASIN,album.Type,album.ReleaseDate);
                $('#AlbumRowsHead').append(albumhtml);
            });
            
            updateCssContainerHead();
        }
    });
}

function getAlbumHead(id) {
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getAlbum&id='+id
        },
        success: function (data) {
            hideLoad();
            emptyAllHead();
            var albumhtml;
            var header = generateSongHeaderHTML();
            $('#SongHeaderHead').html(header);
            
            $.each(data.tracks, function (i, track) {
                m = Math.floor((track.TrackDuration/1000) / 60),
                s = Math.floor((track.TrackDuration/1000) % 60);
                m = (m < 10 ? '0' : '') + m; 
                s = (s < 10 ? '0' : '') + s;
                songhtml = generateSongHTMLHead(track.Location, track.ArtistID, track.TrackNumber, track.TrackTitle, track.ArtistName, track.AlbumTitle, track.AlbumASIN, m, s);
                $('#SongRowsHead').append(songhtml);
            });
            
            updateCssContainerHead();
        }
    });
}


function wantAlbum(id){
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'text',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=queueAlbum&id='+id
        },
        success: function (data) {
            hideLoad();
            if(data == 'OK'){
                 if($('#headphonesSystem li.selected').html() != null){
                    $('#headphonesSystem li.selected').click();
                }
                if($('#HeadphonesArtistContainer li.selected').html() != null){
                    $('#HeadphonesArtistContainer li.selected').click();
                }
            }else{
                alert(data);
            }
        }
    });
}

function searchHead(name) {
    showLoad();
    emptyAllHead();
    /*$.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=findAlbum&name='+name
        },
        success: function (data) {
            hideLoad();
 
            var albumhtml;
            var header = generateSearchHeaderHTMLHead();
            $('#AlbumHeaderHead').html(header);
            
            $.each(data, function (i, album) {
                if (i % 2 === 0) {
                    rowcolor = 'even';
                } else {
                    rowcolor = 'odd';
                }
                albumhtml = generateSearchHTMLHead(rowcolor, album.albumid,album.id,album.title, album.uniquename,album.score,album.albumurl)
                $('#AlbumRowsHead').append(albumhtml);
            });
            
            updateCssContainerHead();
        }
    });*/
    
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=findArtist&name='+name
        },
        success: function (data) {
            hideLoad();
            var artisthtml;
            var header = generateArtistHeaderHTMLHead();
            $('#ArtistHeaderHead').html(header);
            
            $.each(data, function (i, artist) {
                if (i % 2 === 0) {
                    rowcolor = 'even';
                } else {
                    rowcolor = 'odd';
                }
                artisthtml = generateArtistHTMLHead(rowcolor, artist.id, artist.uniquename,artist.score,artist.url)
                $('#ArtistRowsHead').append(artisthtml);
            });
            
            $('a[rel="external"]').click(function() {
                window.open($(this).attr('href'));
                return false;
            });
            
            updateCssContainerHead();
        }
    });
}


function addArtist(id,albumid){
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'text',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=addArtist&id='+id
        },
        success: function (data) {
            hideLoad();
            if(albumid){
            //wantAlbum(albumid,id);  
            }else{
                getArtistHead(id);
            }
        }
    });
}


function getHistory(){
    showLoad();
    emptyAllHead();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getHistory'
        },
        success: function (data) {
            hideLoad();
            var albumhtml;
            var header = generateHistoryHeaderHTMLHead();
            $('#HistoryHeaderHead').html(header);
            
            $.each(data, function (i, album) {
                if (i % 2 === 0) {
                    rowcolor = 'even';
                } else {
                    rowcolor = 'odd';
                }
                albumhtml = generateHistoryHTMLHead(rowcolor,album.Title, album.FolderName,album.DateAdded,album.Status);
                $('#HistoryRowsHead').append(albumhtml);
            });
            updateCssContainerHead();
        }
    });
}

function getLogs(){
    showLoad();
    emptyAllHead();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'text',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getLogs'
        },
        success: function (data) {
            hideLoad();
            $('#ArtistRowsHead').append('Not implemented in the API headphones');
        }
    });
}

function getWanted(){
    showLoad();
    emptyAllHead();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getWanted'
        },
        success: function (data) {
            hideLoad();
            var albumhtml;
            var header = generateWantUpHeaderHTMLHead();
            $('#WantUpHeaderHead').html(header);
            
            $.each(data, function (i, album) {
                if (i % 2 === 0) {
                    rowcolor = 'even';
                } else {
                    rowcolor = 'odd';
                }
                albumhtml = generateWantUpHTMLHead(rowcolor,album.AlbumID,album.AlbumTitle, album.ArtistName,album.DateAdded,album.ReleaseDate,album.Type,album.Status)
                $('#WantUpRowsHead').append(albumhtml);
            });
            updateCssContainerHead();
            
        }
    });
}

function getUpcoming(){
    showLoad();
    emptyAllHead();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'json',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=getUpcoming'
        },
        success: function (data) {
            hideLoad();
            var albumhtml;
            var header = generateWantUpHeaderHTMLHead();
            $('#WantUpHeaderHead').html(header);
            
            $.each(data, function (i, album) {
                if (i % 2 === 0) {
                    rowcolor = 'even';
                } else {
                    rowcolor = 'odd';
                }
                albumhtml = generateWantUpHTMLHead(rowcolor,album.AlbumID,album.AlbumTitle, album.ArtistName,album.DateAdded,album.ReleaseDate,album.Type,album.Status)
                $('#WantUpRowsHead').append(albumhtml);
            });
            updateCssContainerHead();
            
        }
    });
}


function removeWant(id){
    showLoad();
    $.ajax({
        url: '/apps/subphonic/templates/req.php',
        type: 'POST',
        dataType: 'text',
        data: { 
            u: usernameHead, 
            p: passwordHead,
            r : baseURLHead+'&cmd=unqueueAlbum&id='+id
        },
        success: function (data) {
            hideLoad();
            if(data == 'OK'){
                if($('#headphonesSystem li.selected').html() != null){
                    $('#headphonesSystem li.selected').click();
                }
                if($('#HeadphonesArtistContainer li.selected').html() != null){
                    $('#HeadphonesArtistContainer li.selected').click();
                }
            }else{
                alert(data);
            }
        }
    });
    
    
}