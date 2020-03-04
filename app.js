const client_id = `325321fbe95244a79af7e14e52867182`
const clientSecret = `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`
const redirectUri = `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F`
const token = `BQBbQPhNvzhaWLz3fV_Gh6W9Ur3GxxC8PCrX4xi0iMVvkqPggUMI6PeE6XSozPhqahh_vaIJ9FVlqRN0JYXzKDc4h_fiPUlGIw0Buf4O9PFstyNCXPb5haXg_8xRPc4OSgTwbqghaA5LVl3OV7hU-SCMHBMQ6eLpeG8`
const implicitAuthorization = `https://accounts.spotify.com/authorize?client_id=325321fbe95244a79af7e14e52867182&redirect_uri=https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2F&response_type=token&&scope=user-read-private%20user-library-read`
const user_id = `laishaa`

// const spotifyApi = new SpotifyWebApi({
//     clientId: client_id,
//     clientSecret: clientSecret,
//     redirectUri: redirectUri
// });

const getUserSavedTracks = async function() {
    const response = await fetch('https://api.spotify.com/v1/me/tracks?offset=0&limit=50', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const json = await response.json();
    return json
};

const getTrackItems = async function() {
    const data = await getUserSavedTracks();
    const items = await data.items
    // console.log(items)
    return items
}

console.log(getTrackItems())

async function createTrackList() {
    const tracksArr = await getTrackItems();
    const trackList = document.createElement('ul')
    const results = document.getElementById("results")

    function createTrackItem(trackInfo) {
        const li = document.createElement('li')
        const artist = trackInfo.track.artists.map(artist => artist.name)
        li.innerText = `${trackInfo.track.name}, ${artist}`
        return li
    }

    for (let i = 0; i < tracksArr.length; i++) {
        const trackItem = createTrackItem(tracksArr[i])
        trackList.append(trackItem)
    }
    results.appendChild(trackList)
}

createTrackList();
