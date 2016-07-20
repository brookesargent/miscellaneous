var request = require('request');
var fs = require('fs');
var filename = 'youtubeResults1.txt'; 
var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCXAvXYm_JO_gcdhZZIPtVtw&maxResults=50&order=date';
var apiKey; //set this variable to what your own API key is
fs.writeFile(filename, ''); 

getVideos = function(apiKey, nextPageToken) {
  var videoOptions = {
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=[insert channelId here]&maxResults=50&order=date' + apiKey,//update the url with your channel ID
    method: 'GET'
  };

  if (nextPageToken) {
    videoOptions.url = videoOptions.url + '&pageToken=' + nextPageToken
  }

  request.get(videoOptions, function(err, header, body) {
    if (err) throw err;
    var result = JSON.parse(body);
    for (var i = 0; i < result.items.length; i++) {
      var itemNumber = result.items[i].snippet.description.split('-', 1);
      var line = itemNumber + '\t' + result.items[i].id.videoId + '\t' + result.items[i].snippet.title + '\r\n';
      fs.writeFile(filename, line, {flag: 'a'});
    }
    if (result.nextPageToken) {
      getVideos(apiKey, result.nextPageToken);
    }
  });
  console.log("The file has been saved!");
}

getVideos(apiKey);