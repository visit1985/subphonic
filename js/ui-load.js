$(window).load(function () {
    if ($.cookie('defaultsmwidth')) {
        var width = $.cookie('defaultsmwidth');
        resizeSMSection(width);
    }
    if ($.cookie('sidebar') && $.cookie('username') && $.cookie('password')) {
        $('#SideBar').show();
        updateNowPlaying();
    }
    if ($.cookie('HideAZ')) {
        $('#BottomContainer').hide();
    }
    $('ul#ChangeLog li.log').each(function (i, el) {
        if (i > 3) {
            $(el).hide();
        }
    });
    resizeContent();

    $(document).bind('contextmenu',function(e){
        return false;
    });
    
    if($.cookie('username_headphones') == null){
        $('#liTabHeadphones').hide();
    }

});

window.onbeforeunload = function () {
    closeAllNotifications();
};

$(window).resize(function () {
    resizeContent();
});

function resizeContent() {
    $('.tabcontent').css({
        'height': (($(window).height() - 109)) + 'px'
    });
    $('.smsection').css({
        'height': (($(window).height() - 152)) + 'px'
    });
    var smheight = $('.smsection').height();
    var smwidth = $('.smsection').width();
    $('#BottomContainer').css({
        'top': smheight + 35 + 'px'
    });
    if ($.cookie('sidebar')) {
        var tabwidth = $(window).width() - 264;
        if (tabwidth >= 700) {
            $('.tabcontent').css({
                'width': tabwidth + 'px'
            });
        }
        var sbheight = $(window).height() - 152;
        $('#SideBar').css({
            'height': (sbheight + 108) + 'px'
        });
        $('#ChatMsgs').css({
            'height': (sbheight - 166) + 'px'
        });
    } else {
        tabwidth = $(window).width() - 58;
        if (tabwidth >= 700) {
            $('.tabcontent').css({
                'width': tabwidth + 'px'
            });
        }
    }
    tabwidth = $('.tabcontent').width();
    $('#AlbumContainer, #TrackContainer, #CurrentPlaylistContainer, #ArtistContainer, #SongContainer, #ArtistSearchHead, #AlbumContainerHead, #SongContainerHead, #HistoryContainerHead, #WantUpContainerHead').css({
        'width': (tabwidth - smwidth - 30) + 'px'
    });
    $('#CurrentPlaylistContainer').css({
        'width': (tabwidth - 30) + 'px'
    });
    $('#player').css({
        'width': tabwidth + 'px'
    });
}
function resizeSMSection(x) {
    var defwidth = 200;
    var smwidth = $('.smsection').width();
    var newsmwidth = smwidth + parseInt(x);
    var newwidth = newsmwidth - defwidth;
    if (smwidth != newsmwidth && newsmwidth > 200 && newsmwidth < 500) {
        $('.smsection').css({
            'width': (newsmwidth) + 'px'
        });
     
        $('#BottomContainer').css({
            'width': (newsmwidth - 16) + 'px'
        });
        $.cookie('defaultsmwidth', newwidth, {
            expires: 365, 
            path: '/'
        });
        var ulwidth = newsmwidth + 6;
        $('#AlbumContainer').css({
            'margin-left': ulwidth + 'px'
        });
        $('#ArtistContainer').css({
            'margin-left': ulwidth + 'px'
        });
        $('#SongContainer').css({
            'margin-left': ulwidth + 'px'
        });
        $('#TrackContainer').css({
            'margin-left': ulwidth + 'px'
        });
        $('#ArtistSearchHead').css({
            'margin-left': ulwidth + 'px'
        });
        $('#AlbumContainerHead').css({
            'margin-left': ulwidth + 'px'
        });
        $('#SongContainerHead').css({
            'margin-left': ulwidth + 'px'
        });
        $('#SongContainerHead').css({
            'margin-left': ulwidth + 'px'
        });
        $('#HistoryContainerHead').css({
            'margin-left': ulwidth + 'px'
        });
        $('#WantUpContainerHead').css({
            'margin-left': ulwidth + 'px'
        });
        
        $('#addArtistForHead').css({
            'margin-left': ulwidth + 'px'
        });
    }
}

function showLoad(){
    $('#loading').show();
}

function hideLoad(){
    $('#loading').hide();
}
