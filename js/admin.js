$(document).ready(function(){
	$('#addr_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#addr_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
        $('#user_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#user_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
        $('#pass_subsonic').blur(function(event){
		event.preventDefault();
		var post = $( "#pass_subsonic" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
         $('#addr_headphones').blur(function(event){
		event.preventDefault();
		var post = $( "#addr_headphones" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
         $('#user_headphones').blur(function(event){
		event.preventDefault();
		var post = $( "#user_headphones" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
         $('#pass_headphones').blur(function(event){
		event.preventDefault();
		var post = $( "#pass_headphones" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
        
         $('#apikey_headphones').blur(function(event){
		event.preventDefault();
		var post = $( "#apikey_headphones" ).serialize();
		$.post( OC.filePath('minisub','ajax','setSettings.php') , post, function(data){});
	});
});
