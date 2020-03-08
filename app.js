// Access Token 
const params = new URLSearchParams(window.location.hash);

// const accessToken = params.get("#access_token");
const accessToken = 'BQBDQAargSYwYmq6_Z0IMmIyWouNEbmLeWPiVhrlnkBUwe9MoG1vRrOFkH4Mkt0xrjJXIiZFADznjQK9aoLVHjde_B_VR-THyNwH9DgL_HZU7BkE3JVuyOEbDrz7DPnomT_Z1Ftu3Cw2YIQDA9mXkEMABbxyfXFN4BO76SiHe16PbOKozEAUhiQ'

// PLAY BUTTON EMBEDED
window.onload = (e) => {
    const playButtonDiv = document.getElementById("playButtonDiv")
    playButtonDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/2HIgDjIZliTzuhejOsOJGa" width="800" height="580" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
};

// Getting user's Spotify ID
const getUserID = async function () {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json()
    return json.id
};
console.log(getUserID())

// Creating playlist with user's ID
const addDevice = async function (device) {
    const user_id = await getUserID();
    const settings = {
        'method': 'POST',
        'Content-Type': 'application/json',
    }
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, settings)

};


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
console.log(getUserSavedTracks());

const getTrackItems = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items
};
// console.log(getTrackItems())


// get track ids 
const getUserTrackID = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.id)
};
// console.log(getUserTrackID());


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
// console.log(trackAudioFeat())

const getTrackNames = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.name)
};
// console.log(getTrackNames())

const getAlbumName = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.album.images[1])

};
// console.log(getAlbumName())

const getTrackArtists = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.artists)
};
// console.log(getTrackArtists())

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
    console.log()


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
