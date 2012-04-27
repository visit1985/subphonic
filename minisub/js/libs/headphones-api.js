var usernameHead = 'admin';
var passwordHead = 'insa!head++';
var urlHead = 'https://headphones.darkserver.fr';
var apikeyHead = '701d533cd6f494f63a25fd8b473b7706';
var baseURLHead = urlHead+'/api?apikey='+apikeyHead;
;
function getIndexHead(refresh) {
    if (refresh) {
        $('#HeadphonesArtistContainer').empty();
    }
    var content = $('#HeadphonesArtistContainer').html();
    if (content === "") {
        $.ajax({
            url: '/apps/minisub/templates/req.php',
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
            }
        });
    }
}

function getArtistHead(id) {
    showLoad();
    $.ajax({
        url: '/apps/minisub/templates/req.php',
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
                albumhtml = generateAlbumHTMLHead(album.Status, album.AlbumID, album.ArtistID, album.AlbumTitle, album.ArtistName,album.AlbumASIN,album.Type);
                $('#AlbumRowsHead').append(albumhtml);
            });
            
            updateCssContainerHead();
        }
    });
}

function getAlbumHead(id) {
    showLoad();
    $.ajax({
        url: '/apps/minisub/templates/req.php',
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


function wantAlbum(id,id_parent){
    showLoad();
    $.ajax({
        url: '/apps/minisub/templates/req.php',
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
                getArtistHead(id_parent);
            }else{
                alert(data);
            }
        }
    });
}