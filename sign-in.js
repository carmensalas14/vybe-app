const signUpAuthorization = function () {
    const creds = {
        client_id: `325321fbe95244a79af7e14e52867182`,
        clientSecret: `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`,
        redirectUri: `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2Fapp.html`,
        scope: `user-read-private%20user-library-read%20user-read-email%20playlist-modify-public`
    }
    let authorizationReq = `https://accounts.spotify.com/authorize?client_id=${creds.client_id}&redirect_uri=${creds.redirectUri}&response_type=token&&scope=${creds.scope}`
    window.location = authorizationReq;
}
