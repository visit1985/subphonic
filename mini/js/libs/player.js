var scrobbled = false;


function playSong(el, songid, albumid) {
    $.ajax({
        url: baseURL + '/getMusicDirectory.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + albumid,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function (data) {
            var title, artist, album;
            if (data["subsonic-response"].directory !== undefined) {
                // There is a bug in the API that doesn't return a JSON array for one artist
                var children = [];
                if (data["subsonic-response"].directory.child.length > 0) {
                    children = data["subsonic-response"].directory.child;
                } else {
                    children[0] = data["subsonic-response"].directory.child;
                }
                $.each(children, function (i, child) {
                    if (child.id === songid) {
                        title = child.title;
                        artist = child.artist;
                        album = child.album;
                        coverart = child.coverArt;
                    }
                });
            }
            $('#songdetails_song').html(title);
            $('#songdetails_song').attr('parentid', albumid);
            $('#songdetails_song').attr('childid', songid);
            $('#songdetails_artist').html(artist + ' - ' + album);
            $('#coverartimage').attr('href', baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + coverart);
            $('#coverartimage img').attr('src', baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&size=50&id=' + coverart);
            $('#playermiddle').css('visibility', 'visible');
            $('#songdetails').css('visibility', 'visible');
            // SoundManager Initialize
            if (audio) {
                soundManager.destroySound('audio');
            }
            
            inCache = false;
            cacheID = -1;
            $.each(cache, function (i) {
                if(cache[i]['songid'] == songid && cache[i]['complete'] == 1){
                    inCache = true;
                    cacheID = i;
                }
            }); 
            
            if(inCache){
                audio = cache[cacheID]['song'];
                var duration = $('#audio_wrapper0').find(".duration");
                duration.html((cache[cacheID]['dm'] < 10 ? '0' : '') + cache[cacheID]['dm'] + ':' + (cache[cacheID]['ds'] < 10 ? '0' : '') + cache[cacheID]['ds']);
                var loaded = $('#audio_wrapper0').find(".loaded");
                loaded.css('width', '100%');
                var scrubber = $('#audio_wrapper0').find(".scrubber");
                scrubber.unbind("click");
                scrubber.click(function(e){
                    var x = (e.pageX - this.offsetLeft)/scrubber.width();
                    var position = Math.round(cache[cacheID]['dp']*1000*x);
                    audio.play({
                        position:position
                    });
                });
                
            }else{
                var salt = Math.floor(Math.random() * 100000);
                audio = soundManager.createSound({
                    id: 'audio',
                    url: baseURL + '/stream.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&id=' + songid + '&maxBitRate='+ maxbit +'&salt=' + salt,
                    stream: true,
                    whileloading: function () {
                        if (debug) {
                            console.log('loaded:' + this.bytesLoaded + ' total:' + this.bytesTotal);
                        }
                        var percent = this.bytesLoaded / this.bytesTotal;
                        var scrubber = $('#audio_wrapper0').find(".scrubber");
                        var loaded = $('#audio_wrapper0').find(".loaded");
                        loaded.css('width', (scrubber.get(0).offsetWidth * percent) + 'px');
                    },
                    whileplaying: function () {
                        //console.log('position:' + this.position + ' duration:' + this.duration);
                        var percent = this.position / this.duration;
                        var scrubber = $('#audio_wrapper0').find(".scrubber");
                        var progress = $('#audio_wrapper0').find(".progress");
                        progress.css('width', (scrubber.get(0).offsetWidth * percent) + 'px');
                        var played = $('#audio_wrapper0').find(".played");
                        var p = (this.duration / 1000) * percent,
                        m = Math.floor(p / 60),
                        s = Math.floor(p % 60);
                        played.html((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);
                        
                        // Scrobble song once percentage is reached
                        if (!scrobbled && p > 30 && (percent > 0.5 || p > 480)) {
                            scrobbleSong(true);
                        }
                    },
                    onload: function () {
                        var duration = $('#audio_wrapper0').find(".duration");
                        var dp = this.duration / 1000,
                        dm = Math.floor(dp / 60),
                        ds = Math.floor(dp % 60);
                        duration.html((dm < 10 ? '0' : '') + dm + ':' + (ds < 10 ? '0' : '') + ds);
                        var scrubber = $('#audio_wrapper0').find(".scrubber");
                        scrubber.unbind("click");
                        scrubber.click(function(e){
                            var x = (e.pageX - this.offsetLeft)/scrubber.width();
                            var position = Math.round(dp*1000*x);
                            audio.play({
                                position:position
                            });
                        }); 

                        updateCache();
                    },
                    onfinish: function () {
                        var next = $('#CurrentPlaylistContainer tr.playing').next();
                        changeTrack(next);
                    }
                });
            }
            soundManager.stopAll()
            audio.play();
            
            $('table.songlist tr.song').removeClass('playing');
            $(el).addClass('playing');
            $('#PlayTrack').find('img').attr('src', 'images/pause_24x32.png');
            $('#PlayTrack').addClass('playing');
            if(inCache){
                updateCache();
            }
            scrobbleSong(false);
            scrobbled = false;

            if ($.cookie('EnableNotifications')) {
                showNotification(baseURL + '/getCoverArt.view?v=' + version + '&c=' + applicationName + '&f=jsonp&size=50&id=' + coverart, toHTML.un(title), toHTML.un(artist + ' - ' + album));
            }
            if ($.cookie('ScrollTitle')) {
                scrollTitle(toHTML.un(artist) + ' - ' + toHTML.un(title));
            } else {
                setTitle(toHTML.un(artist) + ' - ' + toHTML.un(title));
            }
        }
    });
}

function updateCache(){
    var track = $('#CurrentPlaylistContainer tr.playing');
    var temp_cache = new Array();
    var no_found_track = new Array();

    for(i=0;i<cacheSize;i++){
        track = track.next();
        find = false;
        $.each(cache, function (j) {

            if(cache[j]['songid'] == track.attr('childid') && track.attr('childid')!= undefined && cache[j]['complete'] == 1){
                temp_cache.push(cache[j]);
                find = true;
            }
        }); 
        
        if(!find && track.attr('childid')!= undefined){
            no_found_track.push(track);
        }
        
    }
    
    for(i=0;i<temp_cache.length;i++){
        cache[i] = temp_cache[i];
    }
    setCache(no_found_track,temp_cache.length,0);
}


function setCache(list_track,numCache,current){
    track = list_track[current];
    if(track.attr('childid') != undefined){   
        if(!$.isArray(cache[numCache])){
            cache[numCache] = new Array();
        }
        cache[numCache]['songid'] =  track.attr('childid');
        cache[numCache]['complete'] = 0;
        var salt = Math.floor(Math.random() * 100000);
        if (cache[numCache]['song']) {
            soundManager.destroySound(cache[numCache]['songid']);
        }
        cache[numCache]['song'] = soundManager.createSound({
            id: cache[numCache]['songid'],
            url: baseURL + '/stream.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&id=' + cache[numCache]['songid'] + '&maxBitRate='+ maxbit + '&salt=' + salt,
            whileplaying: function () {
                var percent = this.position / this.duration;
                var scrubber = $('#audio_wrapper0').find(".scrubber");
                var progress = $('#audio_wrapper0').find(".progress");
                progress.css('width', (scrubber.get(0).offsetWidth * percent) + 'px');

                var played = $('#audio_wrapper0').find(".played");
                var p = (this.duration / 1000) * percent,
                m = Math.floor(p / 60),
                s = Math.floor(p % 60);
                played.html((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);

                // Scrobble song once percentage is reached
                if (!scrobbled && p > 30 && (percent > 0.5 || p > 480)) {
                    scrobbleSong(true);
                }
            },
            onload: function () {
                var dp = this.duration / 1000,
                dm = Math.floor(dp / 60),
                ds = Math.floor(dp % 60);
                cache[numCache]['dp'] = dp;
                cache[numCache]['ds'] = ds;
                cache[numCache]['dm'] = dm;
                cache[numCache]['complete'] = 1;
                if((numCache+1)<cacheSize && current<list_track.length){
                    setCache(list_track,(numCache+1),current+1);
                }
            },
            onfinish: function () {
                var next = $('#CurrentPlaylistContainer tr.playing').next();
                changeTrack(next);
            }
        });
        cache[numCache]['song'].load();
    }
}

function scrobbleSong(submission) {
    var songid = $('#songdetails_song').attr('childid');
    $.ajax({
        url: baseURL + '/scrobble.view?u=' + username + '&p=' + passwordenc + '&v=' + version + '&c=' + applicationName + '&f=jsonp&id=' + songid + "&submission=" + submission,
        method: 'GET',
        dataType: 'jsonp',
        timeout: 10000,
        beforeSend: function (req) {
            req.setRequestHeader('Authorization', auth);
        },
        success: function () {
            if (submission) {
                scrobbled = true;
            }
        }
    });
}


function playPauseSong() {
    var el = '#PlayTrack';
    if ($(el).hasClass('playing')) {
        $(el).find('img').attr('src', 'images/play_24x32.png');
        $(el).removeClass('playing');
        $(el).addClass('paused');
        audio.pause();
    } else if ($(el).hasClass('paused')) {
        $(el).find('img').attr('src', 'images/pause_24x32.png');
        $(el).removeClass('paused');
        $(el).addClass('playing');
        audio.resume();
    } else {
        // Start playing song
        var play = $('#CurrentPlaylistContainer tr.selected').first();
        if (changeTrack(play)) {
            $(el).find('img').attr('src', 'images/pause_24x32.png');
            $(el).addClass('playing');
        } else {
            var first = $('#CurrentPlaylistContainer tr').first();
            changeTrack(first);
        }
    }
}
function changeTrack(next) {
    var songid = $(next).attr('childid');
    if (songid !== undefined) {
        var albumid = $(next).attr('parentid');
        playSong(next, songid, albumid);
        return true;
    } else {
        return false;
    }
}


function autoPlay() {
    var firstsong = $('#CurrentPlaylistContainer tr.song:first');
    var songid = $(firstsong).attr('childid');
    var albumid = $(firstsong).attr('parentid');
    playSong(firstsong, songid, albumid);
}
