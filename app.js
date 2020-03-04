const SpotifyWebApi = require('spotify-web-api-node');

const client_id = `325321fbe95244a79af7e14e52867182`
const clientSecret = `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`
const redirectUri = `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F`
const token = `BQAIhJpiLrmLD8SsR1ywLvfuvPcYZk3Kg1Qq0eYG0XW0P79OZbVE-1ghpCBfP20zOVkZ536qqG4lSsKCpAlCIvME7wQJFn_POP-gXcYTj39c8hsc-sxAEy5sJU37iL1JDVNdxS7PA8-xlHVt-2G0pFxWYR_zLY4itCEvpgZUDFDVE5WHSN0sS6I`
const implicitAuthorization = `https://accounts.spotify.com/authorize?client_id=325321fbe95244a79af7e14e52867182&redirect_uri=https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F&response_type=token&&scope=user-read-private%20user-library-read`
const user_id = `5n770f3k69i7nm3s50m32iu7r`
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
