// Echo Nest Spotify
// Key: LIUQP5FBHXKWAHNYT
// enter favorite band. returns a number between 0 and 1 based on their popularity/ hotttness. then... 
// enter band/musical artist. returns a image/specific # of images
// enter band/musical artist. returns latest news articles on artist.
// enter band/musical artist. returns music video


function getMusicData (maxYear, minYear) {
var popTrackURL = "http://musicovery.com/api/V4/playlist.php?" 
		 + "fct=" + "tagseed" 
		 + "&apikey=" + "ik8t34al"
		 + "&tag=" + "pop"
		 + "&popularitymax=100&popularitymin=75&listenercountry=us&tracksnumber=1"
		 + "&yearmax=" + maxYear
		 + "&yearmin=" + minYear
		 + "&format=json";
		 console.log(popTrackURL);

	 $.ajax({
	 	url: popTrackURL,
	 	type: "GET",
	 	dataType: "json",
	 	error: function(data){
	 		console.log("Uh ohhhhh!");
		 	},
	 	success: function(data){
	 		var artistName = data.root.tracks.track.artist.name;
	 		var trackName = data.root.tracks.track.title;
			getGeniusData(artistName, trackName);
			// getVideoData(artistGenre);
		 	}
	 });
	}

//change to youtube video set to autoplay
// https://developers.google.com/youtube/v3/docs/
// key: AIzaSyATvFV5RUTVIwR-tMsSebuqTQd1iPHywCY

function getGeniusData (artistName, trackName) {
	console.log(artistName);
	console.log(trackName);
	var youtubeURL = "https://www.googleapis.com/youtube/v3/search?" 
		+ "part=snippet"
		+ "&q=" + String(artistName) + "%20" + String(trackName) 
		+ "&key=" + "AIzaSyCs4vX-D_GTOr33uBZYiamO5no1GzyFhqw";
	console.log(youtubeURL);

		$.ajax({
	 	url: youtubeURL,
	 	type: "GET",
	 	dataType: "json",
	 	error: function(data){
	 		console.log("Youtube Uh ohhhh");
		 	},
	 	success: function(data){
	 		console.log(data);
	 		var videoID = data.items[0].id.videoId;
	 			console.log(videoID);
	 			$("#replace").replaceWith("<iframe width='560' height='315' src='https://www.youtube-nocookie.com/embed/" + videoID + "?rel=0' frameborder='0' allowfullscreen></iframe>");
		 	}
	 });
}

$( document ).ready(function() {
	$(document).keypress(function(e){
   	if(e.which == 13) {
    	var birthYear = $("#year-input").val();
    	var maxYear =  Number(birthYear) + 18;
    	var minYear = Number(birthYear) + 12;
    	console.log(birthYear);
		getMusicData(maxYear, minYear);
	}
	});
});
