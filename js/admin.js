$(document).ready(function(){

	$('#addr_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#addr_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){ OC.msg.finishedSaving('#addr_subsonic .msg', data); });
	});
        
        $('#user_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#user_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){ OC.msg.finishedSaving('#user_subsonic .msg', data);});
	});
        
        $('#pass_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#pass_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){ OC.msg.finishedSaving('#pass_subsonic .msg', data); });
	});
});
