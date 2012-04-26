
function generateAlbumHeaderHTML() {
    var html;
    html = '<tr><th></th><th></th><th>Album</th><th>Artist</th></tr>';
    return html;
}
function generateAlbumHTML(rowcolor, childid, parentid, coverart, title, artist, rating) {
    var html;
    html = '<tr class=\"album ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\" userrating=\"' + rating + '\">';
    html += '<td class=\"itemactions\"><a class=\"add\" href=\"\" title=\"Add To Current Playlist\"></a>';
    html += '<a class=\"play\" href=\"\" title=\"Play\"></a>';
    html += '<a class=\"download\" href=\"\" title=\"Download\"></a>';
    if (rating === 5) {
        html += '<a class=\"favorite\" href=\"\" title=\"Favorite\"></a>';
    } else {
        html += '<a class=\"rate\" href=\"\" title=\"Add To Favorites\"></a>';
    }
    html += '</td>';
    html += '<td class=\"albumart\"><img src=\"' + baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&size=50&id=' + coverart + '\" /></td>';
    html += '<td class=\"album\">' + title + '</td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    html += '</tr>';
    return html;
}
function generateArtistHeaderHTML() {
    var html;
    html = '<tr><th></th><th>Artist</th></tr>';
    return html;
}
function generateArtistHTML(rowcolor, childid, artist) {
    var html;
    html = '<tr class=\"artist ' + rowcolor + '\" childid=\"' + childid +'\">';
    html += '<td></td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    html += '</tr>';
    return html;
}

function generateSongHeaderHTML() {
    var html;
    html = '<tr><th></th><th>Track</th><th>Title</th><th>Artist</th><th>Album</th><th class=\"alignright\">Time</th></tr>';
    return html;
}
function generateSongHTML(rowcolor, childid, parentid, track, title, artist, album, coverart, rating, m, s) {    
    pos = parentid.lastIndexOf('2f');
    if(pos != 1){
        artistid = parentid.substring(0, pos)
    }else{
        artistid = -1;
    }
    
    if(artistid == rootdirectoryid){
        artistid = parentid;
    }
   
    var html;
    if(track == '-'){
        html = '<tr class=\"album ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\" userrating=\"' + rating + '\">';
    }else{
        html = '<tr class=\"song ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\" userrating=\"' + rating + '\">';
    }
    
    
    html += '<td class=\"itemactions\"><a class=\"add\" href=\"\" title=\"Add To Current Playlist\"></a>';
    html += '<a class=\"remove\" href=\"\" title=\"Remove\"></a>';
    html += '<a class=\"play\" href=\"\" title=\"Play\"></a>';
    html += '<a class=\"download\" href=\"\" title=\"Download\"></a>';
    if (rating === 5) {
        html += '<a class=\"favorite\" href=\"\" title=\"Favorite\"></a>';
    } else {
        html += '<a class=\"rate\" href=\"\" title=\"Add To Favorites\"></a>';
    }
    html += '</td>';
    html += '<td class=\"track\">' + track + '</td>';
    html += '<td class=\"title\">' + title + '</td>';
    if(artistid!=-1){
        html += '<td class=\"artist\"><a href="javascript:getAlbums(\''+artistid+'\',\'\',\'#AlbumRows\')">' + artist + '</a></td>';
    }else{
        html += '<td class=\"artist\">' + artist + '</td>';
    }
    html += '<td class=\"album\"><a href="javascript:getAlbums(\''+parentid+'\',\'\',\'#AlbumRows\')">' + album + '<img src=\"' + baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&size=25&id=' + coverart + '\" /></a></td>';
    if(m != '' || s!=''){
        html += '<td class=\"time\">' + m + ':' + s + '</td>';
    }else{
        html += '<td class=\"time\"></td>';
    }
    html += '</tr>';
    return html;
}

function emptyAll(){
    $("#ArtistHeader").empty();
    $("#ArtistRows").empty();
    $("#AlbumRows").empty();
    $("#AlbumHeader").empty();
    $("#SongHeader").empty();
    $("#SongRows").empty();
}

function updateCssContainer(){
    if ($('#ArtistRows').html()){
        $('#ArtistSearchContainer').show();
    }else{
        $('#ArtistSearchContainer').hide();
    }
    
    if ($('#AlbumRows').html()){
        $('#AlbumContainer').show();
    }else{
        $('#AlbumContainer').hide();
    }
}

function refreshRowColor() {
    $.each($('table.songlist tr.song'), function (i) {
        $(this).removeClass('even odd');
        var rowcolor;
        if (i % 2 === 0) {
            rowcolor = 'even';
        } else {
            rowcolor = 'odd';
        }
        $(this).addClass(rowcolor);
    });
}