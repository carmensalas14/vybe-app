// Access Token 
const params = new URLSearchParams(window.location.hash);
// const accessToken = params.get("#access_token");
const accessToken = "BQBOavkVeYFaaaV9NH9Gh3ysmeiOOb9Axvp0AacA6ggTBbsrJyrapbHtA6dvMtjWSc_HDhOGt7td7sQBXisMP9HfvQiW6M_L4ww_aiJZoS_dQVf6EwIsHXK4yn5xNCURLg6Bfbqse-sGxtKl2TWiN4gLv48HpeR9g35Ki73TvwEhozgWlcvL8d_nTvPAQBuOJFWrXXkEZ40Vgq_bCI_edyQG5RDalA"
async function getUserId() {
    const response = await fetch('https://api.spotify.com/v1/me', 
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    const json = await response.json()
    const id = await json.id
    return id
}
console.log(getUserId().then(user => user), 'userId')

// getting user's first 50 saved tracks
const getUserSavedTracks = async function () {
    const response = await fetch('https://api.spotify.com/v1/me/tracks?offset=0&limit=50', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json()
    return json
};
console.log(getUserSavedTracks(), 'saved playlist');
getUserSavedTracks()

//create new playlist from filtered saved tracks
const createPlaylist = async function(name) {
    const user_id = await getUserId();
    const savedTracks = await getUserSavedTracks()
    const playlist = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST', 
        body: JSON.stringify({
            name: name,
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    return playlist
};
console.log(createPlaylist('new playlist'), 'create playlist')

//function addTracks(), make the addTracks function outside if it doesnt work

// const getPlaylist = async function() {
//     const playlist = await createPlaylist();
//     const items = await playlist
// }
const getTrackItems = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items
};
console.log(getTrackItems(), 'track items')

// get track ids 
const getUserTrackID = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.id)

};
console.log(getUserTrackID(), 'track id');

// get track audio features
const trackAudioFeat = async function () {
    const data = await getUserTrackID()
    const dataArray = []
    for (let i = 0; i < data.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/audio-features/${data[i]}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        const json = await response.json();
        dataArray.push(json.energy);

    }
    return dataArray

}
console.log(trackAudioFeat(), 'audio features')

//display 50 tracks in saved plalist
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

// const createPlaylist = async function() {
//     const 
//     const data = await getTrackItems();
    
// }


