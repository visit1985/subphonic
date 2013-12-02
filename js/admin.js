$(document).ready(function(){
    $('#addr_subsonic').blur(function(event){
        event.preventDefault();
        var post = $("#addr_subsonic").serialize();
        $.post(OC.filePath('subphonic', 'ajax', 'setSettings.php'), post, function(data){});
    });

    $('#user_subsonic').blur(function(event){
        event.preventDefault();
        var post = $("#user_subsonic").serialize();
        $.post(OC.filePath('subphonic', 'ajax', 'setSettings.php'), post, function(data){});
    });

    $('#pass_subsonic').blur(function(event){
        event.preventDefault();
        var post = $("#pass_subsonic").serialize();
        $.post(OC.filePath('subphonic', 'ajax', 'setSettings.php'), post, function(data){});
    });
});
