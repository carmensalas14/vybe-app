const SpotifyWebApi = require('spotify-web-api-node');

const client_id = `325321fbe95244a79af7e14e52867182`
const clientSecret = `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`
const redirectUri = `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F`
const token = `BQAfakt6iGy39JoJ6BNpwc1YUbNhn9UKJxeZWLWHcuySy2XxXS01RoD5eVviixWlZiyZgh0DNoC7JCjTXmqRlglx8YK8UVq6SRFTH_XXZhRLZfYsy2NmTHxbpeTP3oirwqynbmL71nHu3aTB3KgL7wSoaxU`
const implicitAuthorization = `https://accounts.spotify.com/authorize?client_id=325321fbe95244a79af7e14e52867182&redirect_uri=https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F&scope=user-read-private%20user-read-email&response_type=token&state=123`
const user_id = `laishaa`
// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: clientSecret,
    redirectUri: redirectUri
});

// const params = new URLSearchParams(window.location.hash);
// const accessToken = params.get("#access_token");
// console.log(accessToken)

spotifyApi.setAccessToken(token);
spotifyApi.getUserPlaylists(user_id)
    .then(function (data) {
        console.log('User playlists', data);
    }, function (err) {
        console.error(err);
    });
    
