import { LASTFM } from '../config.js';

export async function getArtistInfoFromLastFM(artist) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${LASTFM.API_KEY}&artist=${artist}&username=${LASTFM.USERNAME}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.artist) {
            const playcount = data.artist.stats.userplaycount;
            return { playcount };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
