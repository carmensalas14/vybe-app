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

//create new playlist for filtered saved tracks
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
    const emptyPlaylist = await playlist.json()
    const playlistID = await emptyPlaylist.id
    return playlistID
};
console.log(createPlaylist('new playlist'), 'create playlist')

// const addTracks = async function() {
//     const playlist = await createPlaylist();
    
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
console.log(trackAudioFeat())

const getTrackNames = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.name)
};
console.log(getTrackNames())

const getAlbumName = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.album.images[1])

};
console.log(getAlbumName())

const getTrackArtists = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.artists)
};
console.log(getTrackArtists())

//display 50 tracks in saved playlist

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

const getMainData = async function () {
    const track_items = await getTrackItems();
    const track_id = await getUserTrackID();
    const track_energy = await trackAudioFeat();
    const track_artist = await getTrackArtists()
    const track_name = await getTrackNames();
    const track_album = await getAlbumName();

    return {
        'items': track_items,
        'track_id': track_id,
        'track_name': track_name,
        'track_artist': track_artist,
        'track_album': track_album,
        'track_energy': track_energy,
    }

}
console.log(getMainData())

// BUTTONS TO SORT SAVED SONGS BY ENERGY
const lowEnergyButton = document.getElementById('lowEnergy');
const midEnergyButton = document.getElementById('midEnergy');
const highEnergyButton = document.getElementById('highEnergy');

// Event listeners for buttons 
lowEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    const data = await getMainData();
    let lowEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) <= .33) {
            lowEnergyData.push(data.track_name[i])
        }
    }
    console.log(lowEnergyData)


});


midEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    const data = await getMainData();
    let midEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .34 && data.track_energy[i].toPrecision(2) <= .66) {
            midEnergyData.push(data.track_name[i])
        }
    }
    console.log(midEnergyData)

});


highEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    const data = await getMainData();
    let highEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .67 && data.track_energy[i].toPrecision(2) <= 1.0) {
            highEnergyData.push(data.track_name[i])
        }
    }
    console.log(highEnergyData)

});
