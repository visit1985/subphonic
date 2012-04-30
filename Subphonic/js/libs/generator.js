
function generateAlbumHeaderHTML() {
    var html;
    html = '<tr><th></th><th></th><th>'+language['album']+'</th><th>'+language['artist']+'</th></tr>';
    return html;
}
function generateAlbumHTML(rowcolor, childid, parentid, coverart, title, artist, rating) {
    var html;
    html = '<tr class=\"album ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\" userrating=\"' + rating + '\">';
    html += '<td class=\"itemactions\"><a class=\"add\" href=\"\" title=\"'+language['tAddToCurrentPlaylist']+'\"></a>';
    html += '<a class=\"play\" href=\"\" title=\"'+language['tPlay']+'\"></a>';
    html += '<a class=\"download\" href=\"\" title=\"'+language['tDownload']+'\"></a>';
    if (rating === 5) {
        html += '<a class=\"favorite\" href=\"\" title=\"'+language['tFavorite']+'\"></a>';
    } else {
        html += '<a class=\"rate\" href=\"\" title=\"'+language['tAddToFavorite']+'\"></a>';
    }
    html += '</td>';
    html += '<td class=\"albumart\"><img src=\"' + baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&size=50&id=' + coverart + '\" /></td>';
    html += '<td class=\"album\">' + title + '</td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    html += '</tr>';
    return html;
}

function generateAlbumHeaderHTMLHead() {
    var html;
    html = '<tr><th></th><th></th><th>'+language['album']+'</th><th>'+language['artist']+'</th><th>'+language['typeAlbum']+'</th><th>'+language['releaseDate']+'</th><th>'+language['status']+'</th></tr>';
    return html;
}
function generateAlbumHTMLHead(status, childid, parentid,title, artist, coverart,type,date) {
    var html;
    var rowcolor = 'odd';
    if(status == 'Downloaded'){
        rowcolor = 'green';
    }
    if(status == 'Skipped'){
        rowcolor = 'blue';
    }
    if(status == 'Wanted'){
        rowcolor = 'red';
    }
    if(status == 'Snatched'){
        rowcolor = 'purple';
    }
    html = '<tr class=\"albumHead ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\">';
    html += '<td class=\"itemactions\">';
    if(status != 'Downloaded' && status != 'Snatched' && status != 'Wanted'){
        html += '<a class=\"want\" href=\"\" title=\"'+language['tDownload']+'\"></a>';
    }
    if(status == 'Wanted' || status == 'Snatched'){
        html += '<a class=\"remove\" href=\"\" title=\"'+language['tRemove']+'\"></a>';
    }
    html += '</td>';
    html += '<td class=\"albumart\"><img src=\"http://ec1.images-amazon.com/images/P/'+coverart+'.01.jpg\" height=60 width=60 /></td>';
    html += '<td class=\"album\">' + title + '</td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    html += '<td class=\"type\">' + type + '</td>';
    html += '<td class=\"type\">' + date + '</td>';
    html += '<td class=\"type\">' + status + '</td>';
    html += '</tr>';
    return html;
}


function generateSearchHeaderHTMLHead() {
    var html;
    html = '<tr><th></th><th></th><th>'+language['album']+'</th><th>'+language['artist']+'</th><th>'+language['score']+'</th><th>'+language['link']+'</th></tr>';
    return html;
}
function generateSearchHTMLHead(rowcolor, childid,parentid,title, artist,score,link) {
    var html;
    html = '<tr class=\"albumHead ' + rowcolor + '\" childid=\"' + childid + '\" parentid=\"' + parentid + '\">';
    html += '<td class=\"itemactions\">';
    html += '<a class=\"wantSearchAlbum\" href=\"\" title=\"'+language['tDownload']+'\"></a>';
    html += '</td>';
    html += '<td class=\"albumart\"></td>';
    html += '<td class=\"album\">' + title + '</td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    html += '<td class=\"type\">' + score + '</td>';
    html += '<td class=\"type\">' + link + '</td>';
    html += '</tr>';
    return html;
}


function generateArtistHeaderHTMLHead() {
    var html;
    html = '<tr><th></th><th>'+language['artist']+'</th><th>'+language['score']+'</th></tr>';
    return html;
}
function generateArtistHTMLHead(rowcolor, childid, artist,score,link) {
    var html;
    html = '<tr class=\"artistHead ' + rowcolor + '\" childid=\"' + childid +'\">';
    html += '<td class=\"itemactions\"><a class=\"add\" href=\"\" "></a></td>';
    html += '<td class=\"artist\"><a href=\"'+link+'\" rel=\"external\">' + artist + '</a></td>';
    html += '<td class=\"artist\">' + score + '</td>';
    html += '</tr>';
    return html;
}


function generateArtistHeaderHTML() {
    var html;
    html = '<tr><th></th><th>'+language['artist']+'</th></tr>';
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
    html = '<tr><th></th><th>'+language['track']+'</th><th>'+language['title']+'</th><th>'+language['artist']+'</th><th>'+language['album']+'</th><th class=\"alignright\">'+language['time']+'</th></tr>';
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
    
    html += '<td class=\"itemactions\"><a class=\"add\" href=\"\" title=\"'+language['tAddToCurrentPlaylist']+'\"></a>';
    html += '<a class=\"remove\" href=\"\" title=\"'+language['tRemove']+'\"></a>';
    html += '<a class=\"play\" href=\"\" title=\"'+language['tPlay']+'\"></a>';
    html += '<a class=\"download\" href=\"\" title=\"'+language['tDownload']+'\"></a>';
    if (rating === 5) {
        html += '<a class=\"favorite\" href=\"\" title=\"'+language['tFavorite']+'"></a>';
    } else {
        html += '<a class=\"rate\" href=\"\" title=\"'+language['tAddToFavorite']+'\"></a>';
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
function generateSongHTMLHead(location, parentid, track, title, artist, album, coverart, m, s) {
    var html;
    if(location != null){
        rowcolor = 'green';
    }else{
        rowcolor = 'red';
    }
    html = '<tr class=\"songHead ' + rowcolor + '\" parentid=\"' + parentid + '\">';
    html += '<td></td>';
    html += '<td class=\"track\">' + track + '</td>';
    html += '<td class=\"title\">' + title + '</td>';
    html += '<td class=\"artist\"><a href="javascript:getArtistHead(\''+parentid+'\',\'\',\'#AlbumRows\')">' + artist + '</a></td>';
    html += '<td class=\"album\">' + album + '<img src=\"http://ec1.images-amazon.com/images/P/'+coverart+'.01.jpg\" height=25 width=25 /></td>';
    if(m != '' || s!=''){
        html += '<td class=\"time\">' + m + ':' + s + '</td>';
    }else{
        html += '<td class=\"time\"></td>';
    }
    html += '</tr>';
    return html;
}

function generateHistoryHeaderHTMLHead() {
    var html;
    html = '<tr><th></th><th>'+language['album']+'</th><th>'+language['folder']+'</th><th>'+language['addDate']+'</th><th>'+language['status']+'</th></tr>';
    return html;
}
function generateHistoryHTMLHead(rowcolor,title, folder,date,status) {
    var html;
    html = '<tr class=\"historyHead ' + rowcolor + '\" >';
    html += '<td class=\"itemactions\"></td>';
    html += '<td >' + title + '</td>';
    html += '<td >' + folder + '</td>';
    html += '<td >' + date + '</td>';
    html += '<td >' + status + '</td>';
    html += '</tr>';
    return html;
}

function generateWantUpHeaderHTMLHead() {
    var html;
    html = '<tr><th></th><th>'+language['album']+'</th><th>'+language['artist']+'</th><th>'+language['addDate']+'</th><th>'+language['releaseDate']+'</th><th>'+language['typeAlbum']+'</th><th>'+language['status']+'</th></tr>';
    return html;
}
function generateWantUpHTMLHead(rowcolor,albumid,title, artist,addDate,releaseDate,type,status) {
    var html;
    html = '<tr class=\"wantUpHead ' + rowcolor + '\" childid=\"' + albumid + '\">';
    html += '<td class=\"itemactions\">';
    if(status == 'Wanted'){
        html += '<a class=\"remove\" href=\"\" title=\"'+language['tRemove']+'\"></a>';
    }
    if(status == 'Skipped'){
        html += '<a class=\"want\" href=\"\" title=\"'+language['tDownload']+'\"></a>';
    }
    
    html += '</td>';
    html += '<td class=\"album\">' + title + '</td>';
    html += '<td class=\"artist\">' + artist + '</td>';
    if(status == 'Skipped'){
        html += '<td class=\"type\"></td>'; 
    }else{
       html += '<td class=\"type\">' + addDate + '</td>'; 
    }
    html += '<td class=\"type\">' + releaseDate + '</td>';
    html += '<td class=\"type\">' + type + '</td>';
    html += '<td class=\"type\">' + status + '</td>';
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

function emptyAllHead(){
    $("#ArtistHeaderHead").empty();
    $("#ArtistRowsHead").empty();
    $("#AlbumRowsHead").empty();
    $("#AlbumHeaderHead").empty();
    $("#SongHeaderHead").empty();
    $("#SongRowsHead").empty();
    $("#HistoryHeaderHead").empty();
    $("#HistoryRowsHead").empty();
    $("#WantUpHeaderHead").empty();
    $("#WantUpRowsHead").empty();
}

function updateCssContainerHead(){
    if ($('#ArtistRowsHead').html()){
        $('#ArtistSearchHead').show();
    }else{
        $('#ArtistSearchHead').hide();
    }
    
    if ($('#AlbumRowsHead').html()){
        $('#AlbumContainerHead').show();
    }else{
        $('#AlbumContainerHead').hide();
    }
    
    if ($('#HistoryRowsHead').html()){
        $('#HistoryContainerHead').show();
    }else{
        $('#HistoryContainerHead').hide();
    }
    
    if ($('#SongRowsHead').html()){
        $('#SongContainerHead').show();
    }else{
        $('#SongContainerHead').hide();
    }
    
    if ($('#HistoryRowsHead').html()){
        $('#HistoryContainerHead').show();
    }else{
        $('#HistoryContainerHead').hide();
    }
    
    if ($('#WantUpRowsHead').html()){
        $('#WantUpContainerHead').show();
    }else{
        $('#WantUpContainerHead').hide();
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