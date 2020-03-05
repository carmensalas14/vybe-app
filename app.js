const params = new URLSearchParams(window.location.hash);
const accessToken = params.get("#access_token");

// temporary token 
const token = `BQBb4MmDv_XgVL_M4n64O328_RZwKcATzXaLXVEKX1MgRlFlE-Zcuqo6cbry9UqSKbXAjzHI2YquIuVLI_YORfY3EzjpLLjMYv2LatWLxewMSbZsxTMSCEf0h-3j7v8teQC5xHZgaEWRWL7sMoVrY4lSBkT3hjN4vJi0RSK4cZVcXi60HsSaCbY`

console.log('hi');
// credentials are optional

const getTrackItems = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items
};
console.log(getTrackItems())

// getting user's first 50 saved tracks
const getUserSavedTracks = async function () {
    const response = await fetch('https://api.spotify.com/v1/me/tracks?offset=0&limit=50', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const json = await response.json()
    return json
};
console.log(getUserSavedTracks());

// get track ids 
const getUserTrackID = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.id)

};
console.log(getUserTrackID());


// get track audio features
const trackAudioFeat = async function () {
    const data = await getUserTrackID()
    const dataArray = []
    for (let i = 0; i < data.length; i++) {
        const response = await fetch(`https://api.spotify.com/v1/audio-features/${data[i]}`, {
            headers: {
                'Authorization': 'Bearer ' + token
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
