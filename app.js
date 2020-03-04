const SpotifyWebApi = require('spotify-web-api-node');

const client_id = `325321fbe95244a79af7e14e52867182`
const clientSecret = `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`
const redirectUri = `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F`
const token = `"BQCKOjASc7lqut1UQd5bq8qbHZA9yZQlYFJN64HgqG3fdzMTpJ_45oS9MpMY70JQdJSuSjtThJQNxD9HTsUgv4PVwT1o1NzgLO5n9vbgQkvFF81JglGo5DPhrtDoh1Do6-1uvpb58JV5n18KRpK6XWTYupk`
const implicitAuthorization = `https://accounts.spotify.com/authorize?client_id=325321fbe95244a79af7e14e52867182&redirect_uri=https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F&scope=user-read-private%20user-read-email&response_type=token&state=123`
// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: clientSecret,
    redirectUri: redirectUri
});

const params = new URLSearchParams(window.location.hash);
const accessToken = params.get("#access_token");
console.log(accessToken)

spotifyApi.setAccessToken(token);
spotifyApi.getUserPlaylists('user_id')
    .then(function (data) {
        console.log('User playlists', data);
    }, function (err) {
        console.error(err);
    });
    
