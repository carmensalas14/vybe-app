// Access Token 
const params = new URLSearchParams(window.location.hash);
const accessToken = params.get("#access_token");

const playButtonDiv = document.getElementById("playButtonDiv")

// Getting user's Spotify ID
const getUserId = async function () {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json()
    const id = await json.id
    return id
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

// getting user library response array
const getTrackItems = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items
};

// get track ID
const getUserTrackId = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.id)
};

// get track URI 
const getUserTrackURI = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.uri)
};

//create new playlist for filtered saved tracks
const createPlaylist = async function (name) {
    const user_id = await getUserId();
    const playlist = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    });
    const emptyPlaylist = await playlist.json()
    const playlistID = await emptyPlaylist.id
    return playlistID
};

// Generate Playlist with added tracks function  
const generatePlaylist = async function (name, trackItems) {

    const playlist_id = await createPlaylist(name);

    playButtonDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${playlist_id}" width="500" height="1000" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`

    // ADD TRACKS TO PLAYLIST 
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'POST',
        body: JSON.stringify({
            uris: trackItems
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    });
}

// GET TRACK ENEGRY LEVELS 
const trackAudioFeat = async function () {
    const data = await getUserTrackId()
    const dataArray = []
    for (let i = 0; i < data.length; i++) {
        dataArray.push(data[i])
    }
    const dataString = dataArray.join(',')

    const response = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${dataString}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json();
    return json.audio_features.map(track => track.energy)
}

// function that creates object for main data
const getMainData = async function () {
    const track_items = await getTrackItems();
    const track_uri = await getUserTrackURI();
    const track_energy = await trackAudioFeat();

    return {
        'items': track_items,
        'track_uri': track_uri,
        'track_energy': track_energy,
    }

}

// PLAY BUTTON EMBEDED
window.onload = async(e) => {
    const userTrackURIS = await getMainData();
    generatePlaylist('Liked Songs♡VYBE♡', userTrackURIS.track_uri)
};

// BUTTONS TO SORT SAVED SONGS BY ENERGY
const lowEnergyButton = document.getElementById('lowEnergy');
const midEnergyButton = document.getElementById('midEnergy');
const highEnergyButton = document.getElementById('highEnergy');

// Event listeners for ENERGY BUTTONS
lowEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    playButtonDiv.innerHTML = ''

    const data = await getMainData();
    let lowEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) <= .33) {
            lowEnergyData.push(data.track_uri[i])
        }
    }
    console.log(lowEnergyData)
    generatePlaylist('LOW♡VYBES', lowEnergyData);

});

midEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    playButtonDiv.innerHTML = ''

    const data = await getMainData();
    let midEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .34 && data.track_energy[i].toPrecision(2) <= .66) {
            midEnergyData.push(data.track_uri[i])
        }
    }
    generatePlaylist('MID♡VYBES', midEnergyData);

});

highEnergyButton.addEventListener('click', async(e) => {
    e.preventDefault();
    playButtonDiv.innerHTML = ''

    const data = await getMainData();
    let highEnergyData = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .67 && data.track_energy[i].toPrecision(2) <= 1.0) {
            highEnergyData.push(data.track_uri[i])
        }
    }
    generatePlaylist("HIGH♡VYBES", highEnergyData);

});
