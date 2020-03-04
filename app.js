const unique = require('uniq');
const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: clientSecret,
    redirectUri: redirectUri
});


spotifyApi.setAccessToken(token);
spotifyApi.getUserPlaylists('user_id')
    .then(function (data) {
        console.log('User playlists', data);
    }, function (err) {
        console.error(err);
    });

spotifyApi.getTrack(trackID);
    .then(function(data) {
        console.log()
    })